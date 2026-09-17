"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useForm, type Path, type UseFormReturn } from "react-hook-form";
import { Check, ChevronLeft, ChevronRight, CircleAlert, Cpu, ExternalLink, FileImage, LoaderCircle, MonitorCog, Rocket, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { basicDetailsSchema, selectedTrackSchema, trackLabel, validateTrackDetails } from "@/lib/project-form/schema";
import { emptyProjectFormValues, type ProjectFormValues, type ProjectImageSummary, type TrackValue } from "@/lib/project-form/types";

const steps = ["Basic Details", "Choose Track", "Track Details", "Review & Submit"];
const trackCards: { value: TrackValue; label: string; title: string; icon: typeof ShoppingBag; color: string; ring: string; surface: string }[] = [
  { value: "BUSINESS_FAIR", label: "Track A", title: "Business Fair", icon: ShoppingBag, color: "text-amber-700", ring: "border-amber-400", surface: "bg-amber-50" },
  { value: "STARTUPS_PROJECTS_OSS", label: "Track B", title: "Startups / Projects / Open Source", icon: Rocket, color: "text-blue-700", ring: "border-blue-400", surface: "bg-blue-50" },
  { value: "HARDWARE_PROJECTS", label: "Track C", title: "Hardware Projects", icon: Cpu, color: "text-emerald-700", ring: "border-emerald-400", surface: "bg-emerald-50" },
  { value: "ROBO_RACE_WAR", label: "Track D", title: "Robo Race / Robo War", icon: MonitorCog, color: "text-red-700", ring: "border-red-400", surface: "bg-red-50" },
];

type ServerApplication = { currentStep: number; status: "DRAFT" | "SUBMITTED"; values: ProjectFormValues; images: ProjectImageSummary[] };
type ApiResult = { application?: ServerApplication; error?: string; submitted?: boolean };

function getMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}

export function ProjectForm() {
  const form = useForm<ProjectFormValues>({ defaultValues: emptyProjectFormValues, mode: "onBlur" });
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<ProjectImageSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const values = form.watch();

  useEffect(() => {
    let active = true;
    fetch("/api/project-form")
      .then(async (response) => (await response.json()) as ApiResult)
      .then((data) => {
        if (!active || !data.application) return;
        form.reset(data.application.values);
        setImages(data.application.images);
        setStep(data.application.status === "SUBMITTED" ? 4 : data.application.currentStep);
        setSubmitted(data.application.status === "SUBMITTED");
      })
      .catch(() => active && setError("We could not load a saved application."))
      .finally(() => active && setIsLoading(false));
    return () => { active = false; };
  }, [form]);

  const save = async (nextStep = step): Promise<boolean> => {
    setIsSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/project-form", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentStep: nextStep, values: form.getValues() }) });
      const data = (await response.json()) as ApiResult;
      if (!response.ok) throw new Error(data.error);
      if (data.application) { form.reset(data.application.values); setImages(data.application.images); }
      setNotice("Draft saved.");
      return true;
    } catch (saveError) { setError(getMessage(saveError)); return false; }
    finally { setIsSaving(false); }
  };

  const setZodErrors = (issues: { path: PropertyKey[]; message: string }[], prefix = "") => {
    issues.forEach((issue) => {
      const path = [prefix, ...issue.path.map(String)].filter(Boolean).join(".") as Path<ProjectFormValues>;
      form.setError(path, { type: "validate", message: issue.message });
    });
  };
  const validateCurrentStep = (): boolean => {
    form.clearErrors();
    if (step === 1) {
      const current = form.getValues();
      const result = basicDetailsSchema.safeParse({ ...current, numberOfTeamMembers: current.numberOfTeamMembers === "" ? null : current.numberOfTeamMembers });
      if (!result.success) { setZodErrors(result.error.issues); return false; }
    }
    if (step === 2) {
      const result = selectedTrackSchema.safeParse(form.getValues("selectedTrack"));
      if (!result.success) { form.setError("selectedTrack", { message: "Choose one track to continue." }); return false; }
    }
    if (step === 3) {
      const current = form.getValues(); const result = validateTrackDetails(current);
      if (!result.success) { const prefix = current.selectedTrack === "BUSINESS_FAIR" ? "business" : current.selectedTrack === "STARTUPS_PROJECTS_OSS" ? "startup" : current.selectedTrack === "HARDWARE_PROJECTS" ? "hardware" : "robo"; setZodErrors(result.error.issues, prefix); return false; }
      if (current.selectedTrack === "HARDWARE_PROJECTS" && images.length === 0) { setError("Upload at least one project image before continuing."); return false; }
    }
    return true;
  };
  const continueStep = async () => {
    if (!validateCurrentStep()) return;
    const nextStep = Math.min(step + 1, 4);
    if (await save(nextStep)) { setStep(nextStep); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };
  const chooseTrack = (track: TrackValue) => {
    const previous = form.getValues("selectedTrack");
    if (previous && previous !== track) {
      if (previous === "BUSINESS_FAIR") form.setValue("business", emptyProjectFormValues.business);
      if (previous === "STARTUPS_PROJECTS_OSS") form.setValue("startup", emptyProjectFormValues.startup);
      if (previous === "HARDWARE_PROJECTS") { form.setValue("hardware", emptyProjectFormValues.hardware); setImages([]); }
      if (previous === "ROBO_RACE_WAR") form.setValue("robo", emptyProjectFormValues.robo);
    }
    form.setValue("selectedTrack", track, { shouldDirty: true, shouldValidate: true });
  };
  const submit = async () => {
    if (!validateCurrentStep()) return;
    setIsSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/project-form", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentStep: 4, values: form.getValues() }) });
      const data = (await response.json()) as ApiResult;
      if (!response.ok) throw new Error(data.error);
      setSubmitted(true); setNotice("Your application has been submitted.");
    } catch (submitError) { setError(getMessage(submitError)); }
    finally { setIsSaving(false); }
  };
  const updateTeamCount = (raw: string) => {
    const count = raw === "" ? "" : Math.max(0, Math.min(100, Number(raw)));
    form.setValue("numberOfTeamMembers", count, { shouldDirty: true });
    const current = form.getValues("teamMembers");
    if (typeof count === "number" && current.length > count) form.setValue("teamMembers", current.slice(0, count));
  };
  const uploadImages = async (files: FileList | null) => {
    if (!files?.length) return;
    setIsSaving(true); setError("");
    try {
      const data = new FormData(); Array.from(files).forEach((file) => data.append("images", file));
      const response = await fetch("/api/project-form/images", { method: "POST", body: data });
      const result = (await response.json()) as { images?: ProjectImageSummary[]; error?: string };
      if (!response.ok) throw new Error(result.error);
      setImages((current) => [...current, ...(result.images ?? [])]); setNotice("Project image saved.");
    } catch (uploadError) { setError(getMessage(uploadError)); } finally { setIsSaving(false); }
  };
  const removeImage = async (id: string) => {
    setError("");
    try { const response = await fetch(`/api/project-form/images/${id}`, { method: "DELETE" }); if (!response.ok) throw new Error("We could not remove that image."); setImages((current) => current.filter((image) => image.id !== id)); }
    catch (removeError) { setError(getMessage(removeError)); }
  };

  if (isLoading) return <main className="min-h-screen bg-slate-50 grid place-items-center"><LoaderCircle className="h-7 w-7 animate-spin text-blue-600" aria-label="Loading form" /></main>;
  if (submitted) return <SuccessState />;

  return <main className="min-h-screen bg-[#f7f9fc] text-slate-900"><Header /><div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12"><FormProgress current={step} />
    <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
      <p className="text-sm font-semibold text-blue-600">DevFest GDG Noida 2026</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Project application</h1><p className="mt-3 max-w-2xl text-slate-600">Complete each section to submit your application.</p>
    </section>
    {notice && <Feedback kind="notice" text={notice} />}{error && <Feedback kind="error" text={error} />}
    <form onSubmit={(event) => event.preventDefault()} className="mt-8">
      {step === 1 && <BasicDetails form={form} updateTeamCount={updateTeamCount} />}
      {step === 2 && <TrackSelector form={form} chooseTrack={chooseTrack} />}
      {step === 3 && <TrackDetails form={form} images={images} uploadImages={uploadImages} removeImage={removeImage} />}
      {step === 4 && <Review values={values} images={images} edit={setStep} />}
      <Navigation step={step} isSaving={isSaving} onBack={() => { setStep((value) => Math.max(1, value - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }} onSave={() => void save()} onContinue={() => void continueStep()} onSubmit={() => void submit()} />
    </form>
  </div></main>;
}

function Header() { return <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6"><span className="flex gap-1" aria-hidden="true"><i className="h-2.5 w-2.5 rounded-full bg-blue-500"/><i className="h-2.5 w-2.5 rounded-full bg-red-500"/><i className="h-2.5 w-2.5 rounded-full bg-amber-400"/><i className="h-2.5 w-2.5 rounded-full bg-emerald-500"/></span><div><p className="font-semibold tracking-tight">GDG Noida</p><p className="text-xs text-slate-500">DevFest 2026</p></div></div></header>; }
function FormProgress({ current }: { current: number }) { return <nav aria-label="Application progress"><ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">{steps.map((label, index) => { const number = index + 1; const complete = number < current; const active = number === current; return <li key={label} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${active ? "bg-blue-600 text-white shadow-sm" : complete ? "bg-emerald-50 text-emerald-700" : "text-slate-500"}`}><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs ${active ? "bg-white/20" : complete ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"}`}>{complete ? <Check className="h-4 w-4"/> : number}</span><span>{label}</span></li>; })}</ol></nav>; }
function Card({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) { return <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8"><h2 className="text-xl font-semibold tracking-tight">{title}</h2>{subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}<div className="mt-6">{children}</div></section>; }
function Feedback({ kind, text }: { kind: "notice" | "error"; text: string }) { return <div role={kind === "error" ? "alert" : "status"} className={`mt-5 flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${kind === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>{kind === "error" ? <CircleAlert className="h-4 w-4"/> : <Check className="h-4 w-4"/>}{text}</div>; }

type FormProps = { form: UseFormReturn<ProjectFormValues> };
function Field({ form, name, label, required = true, helper, type = "text", placeholder }: FormProps & { name: Path<ProjectFormValues>; label: string; required?: boolean; helper?: string; type?: string; placeholder?: string }) {
  const error = form.formState.errors;
  const message = name.split(".").reduce<unknown>((value, key) => typeof value === "object" && value ? (value as Record<string, unknown>)[key] : undefined, error) as { message?: string } | undefined;
  return <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">{label}{required && <span className="ml-1 text-red-600" aria-hidden="true">*</span>}</span><input type={type} placeholder={placeholder} aria-invalid={Boolean(message?.message)} {...form.register(name, type === "number" ? { valueAsNumber: true } : undefined)} className={`h-11 w-full rounded-xl border bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${message?.message ? "border-red-400" : "border-slate-200"}`}/>{helper && <span className="mt-1 block text-xs text-slate-500">{helper}</span>}{message?.message && <span role="alert" className="mt-1 block text-xs text-red-600">{message.message}</span>}</label>;
}
function TextArea({ form, name, label, required = true, helper }: FormProps & { name: Path<ProjectFormValues>; label: string; required?: boolean; helper?: string }) { const errors = form.formState.errors; const message = name.split(".").reduce<unknown>((value, key) => typeof value === "object" && value ? (value as Record<string, unknown>)[key] : undefined, errors) as { message?: string } | undefined; return <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">{label}{required && <span className="ml-1 text-red-600" aria-hidden="true">*</span>}</span><textarea rows={5} aria-invalid={Boolean(message?.message)} {...form.register(name)} className={`w-full resize-y rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${message?.message ? "border-red-400" : "border-slate-200"}`}/>{helper && <span className="mt-1 block text-xs text-slate-500">{helper}</span>}{message?.message && <span role="alert" className="mt-1 block text-xs text-red-600">{message.message}</span>}</label>; }
function RadioGroup({ form, name, label, options }: FormProps & { name: Path<ProjectFormValues>; label: string; options: (string | { value: string; label: string })[] }) { const current = form.watch(name); const error = name.split(".").reduce<unknown>((value, key) => typeof value === "object" && value ? (value as Record<string, unknown>)[key] : undefined, form.formState.errors) as { message?: string } | undefined; return <fieldset><legend className="mb-3 text-sm font-medium text-slate-700">{label}<span className="ml-1 text-red-600">*</span></legend><div className="grid gap-2 sm:grid-cols-2">{options.map((item) => { const option = typeof item === "string" ? { value: item, label: item } : item; return <label key={option.value} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-sm transition ${current === option.value ? "border-blue-500 bg-blue-50 text-blue-800" : "border-slate-200 hover:border-slate-300"}`}><input type="radio" value={option.value} {...form.register(name)} className="h-4 w-4 accent-blue-600"/>{option.label}</label>; })}</div>{error?.message && <span role="alert" className="mt-1 block text-xs text-red-600">{error.message}</span>}</fieldset>; }
function CheckboxGroup({ form, name, label, options }: FormProps & { name: Path<ProjectFormValues>; label: string; options: string[] }) { const selected = (form.watch(name) as string[] | undefined) ?? []; const error = name.split(".").reduce<unknown>((value, key) => typeof value === "object" && value ? (value as Record<string, unknown>)[key] : undefined, form.formState.errors) as { message?: string } | undefined; const toggle = (option: string) => form.setValue(name, selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option], { shouldDirty: true, shouldValidate: true }); return <fieldset><legend className="mb-3 text-sm font-medium text-slate-700">{label}<span className="ml-1 text-red-600">*</span></legend><div className="grid gap-2 sm:grid-cols-2">{options.map((option) => <label key={option} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-sm transition ${selected.includes(option) ? "border-blue-500 bg-blue-50 text-blue-800" : "border-slate-200 hover:border-slate-300"}`}><input type="checkbox" checked={selected.includes(option)} onChange={() => toggle(option)} className="h-4 w-4 rounded accent-blue-600"/>{option}</label>)}</div>{error?.message && <span role="alert" className="mt-1 block text-xs text-red-600">{error.message}</span>}</fieldset>; }

function BasicDetails({ form, updateTeamCount }: FormProps & { updateTeamCount: (value: string) => void }) {
  const teamCount = form.watch("numberOfTeamMembers"); const members = form.watch("teamMembers");
  const memberCount = typeof teamCount === "number" ? teamCount : 0;
  return <div className="space-y-6"><Card title="Basic Details" subtitle="Tell us about yourself and your team."><div className="grid gap-5 md:grid-cols-2"><Field form={form} name="name" label="Name"/><Field form={form} name="email" label="Email ID" type="email"/><Field form={form} name="phoneNumber" label="Phone Number" type="tel"/><RadioGroup form={form} name="applicantType" label="You are a:" options={[{ value: "STUDENT", label: "Student" }, { value: "WORKING_PROFESSIONAL", label: "Working Professional" }, { value: "ENTREPRENEUR_FOUNDER", label: "Entrepreneur / Founder" }, { value: "OTHER", label: "Other" }]}/><Field form={form} name="organizationName" label="College / Organization / Company Name"/><Field form={form} name="city" label="City"/><Field form={form} name="teamName" label="Team Name" required={false}/><label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Number of Team Members</span><input type="number" min="0" max="100" value={teamCount} onChange={(event) => updateTeamCount(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"/></label></div></Card>
    {memberCount > 0 && <Card title="Team Member Details" subtitle="Add a name and email or contact for each team member."><div className="space-y-4">{members.map((_, index) => <div key={index} className="grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-2"><Field form={form} name={`teamMembers.${index}.name`} label={`Team Member ${index + 1} Name`}/><Field form={form} name={`teamMembers.${index}.emailOrContact`} label="Email / Contact"/></div>)}{members.length < memberCount && <Button type="button" variant="outline" onClick={() => form.setValue("teamMembers", [...members, { name: "", emailOrContact: "" }])}>Add team member</Button>}</div></Card>}
  </div>;
}

function TrackSelector({ form, chooseTrack }: FormProps & { chooseTrack: (track: TrackValue) => void }) { const selected = form.watch("selectedTrack"); const error = form.formState.errors.selectedTrack?.message; return <Card title="Choose Track" subtitle="Select the DevFest section you are applying for."><div role="radiogroup" aria-label="DevFest section" className="grid gap-5 md:grid-cols-2">{trackCards.map((track) => { const Icon = track.icon; const isSelected = selected === track.value; return <button type="button" role="radio" aria-checked={isSelected} onClick={() => chooseTrack(track.value)} key={track.value} className={`relative min-h-52 rounded-[1.5rem] border-2 p-6 text-left outline-none transition hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-blue-200 ${isSelected ? `${track.ring} ${track.surface} shadow-sm` : "border-slate-200 bg-white hover:border-slate-300"}`}><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${track.surface} ${track.color}`}>{track.label}</span><span className={`mt-5 grid h-11 w-11 place-items-center rounded-2xl ${track.surface} ${track.color}`}><Icon className="h-5 w-5"/></span><h3 className="mt-4 text-xl font-semibold tracking-tight">{track.title}</h3><span className={`absolute right-5 top-5 grid h-6 w-6 place-items-center rounded-full border ${isSelected ? "border-current bg-current text-white" : "border-slate-300 bg-white text-transparent"}`}><Check className="h-4 w-4"/></span></button>; })}</div>{error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}</Card>; }

function TrackDetails({ form, images, uploadImages, removeImage }: FormProps & { images: ProjectImageSummary[]; uploadImages: (files: FileList | null) => void; removeImage: (id: string) => void }) {
  const track = form.watch("selectedTrack");
  if (track === "BUSINESS_FAIR") return <BusinessFairForm form={form}/>;
  if (track === "STARTUPS_PROJECTS_OSS") return <StartupProjectForm form={form}/>;
  if (track === "HARDWARE_PROJECTS") return <HardwareProjectForm form={form} images={images} uploadImages={uploadImages} removeImage={removeImage}/>;
  if (track === "ROBO_RACE_WAR") return <RoboRaceWarForm form={form}/>;
  return <Feedback kind="error" text="Choose a track before completing track details."/>;
}

function BusinessFairForm({ form }: FormProps) { return <div className="space-y-6"><Card title="Business Fair Details"><div className="grid gap-5 md:grid-cols-2"><Field form={form} name="business.businessName" label="Business / Brand Name"/><Field form={form} name="business.founderName" label="Founder / Owner Name"/><Field form={form} name="business.businessCategory" label="Business Category"/></div><div className="mt-5 space-y-5"><TextArea form={form} name="business.businessDescription" label="Tell us about your business" helper="A brief description of your brand and what you offer."/><TextArea form={form} name="business.showcaseDescription" label="What products / services will you showcase at DevFest?"/><Field form={form} name="business.socialMediaUrl" label="Instagram / Website / Social Media" type="url"/><CheckboxGroup form={form} name="business.stallRequirements" label="What are your stall requirements?" options={["Table", "Chairs", "Power Supply", "Internet/Wi-Fi", "Display/Screen", "Other"]}/><TextArea form={form} name="business.specialRequirements" label="Any special requirements or requests for your stall?"/><TextArea form={form} name="business.additionalInformation" label="Anything else you'd like us to know about your brand?"/></div></Card></div>; }
function StartupProjectForm({ form }: FormProps) { return <div className="space-y-6"><Card title="Startups / Projects / Open Source Details"><div className="space-y-5"><RadioGroup form={form} name="startup.showcaseType" label="What are you showcasing?" options={["Startup", "Personal/Student Project", "Open Source Project"]}/><div className="grid gap-5 md:grid-cols-2"><Field form={form} name="startup.projectName" label="Project / Startup Name"/><Field form={form} name="startup.oneLineDescription" label="One-line description" helper="Tell us what your project/startup does in one line."/><Field form={form} name="startup.techStack" label="Tech Stack"/></div><TextArea form={form} name="startup.problemStatement" label="Problem Statement"/><TextArea form={form} name="startup.solutionDescription" label="Solution / Project Description"/><RadioGroup form={form} name="startup.currentStage" label="Current Stage" options={["Idea", "Prototype", "MVP", "Working Product", "Deployed / Live"]}/><div className="grid gap-5 md:grid-cols-2"><Field form={form} name="startup.githubUrl" label="GitHub Repository" type="url" required={false}/><Field form={form} name="startup.liveDemoUrl" label="Live Demo / Website" type="url" required={false}/></div><CheckboxGroup form={form} name="startup.showcaseRequirements" label="What are your requirements for the showcase?" options={["Table / Space", "Power Supply", "Internet/Wi-Fi", "Display/Screen", "Other"]}/><TextArea form={form} name="startup.additionalInformation" label="Any additional requirements or information?"/></div></Card></div>; }
function HardwareProjectForm({ form, images, uploadImages, removeImage }: FormProps & { images: ProjectImageSummary[]; uploadImages: (files: FileList | null) => void; removeImage: (id: string) => void }) { return <div className="space-y-6"><Card title="Hardware Projects Details"><div className="space-y-5"><div className="grid gap-5 md:grid-cols-2"><Field form={form} name="hardware.projectName" label="Project Name"/><Field form={form} name="hardware.oneLineDescription" label="One-line Project Description"/><Field form={form} name="hardware.techStack" label="Software / Tech Stack Used"/></div><TextArea form={form} name="hardware.problemStatement" label="What problem does your project solve?"/><TextArea form={form} name="hardware.projectDescription" label="Project Description / How does it work?"/><TextArea form={form} name="hardware.hardwareComponents" label="Hardware Components Used" helper="e.g., Arduino, Raspberry Pi, sensors, motors, etc."/><RadioGroup form={form} name="hardware.currentStage" label="Current Stage" options={["Prototype", "Working Model", "Product / Deployment-ready"]}/><Field form={form} name="hardware.demoUrl" label="Demo Video / Project Link" type="url" required={false}/><CheckboxGroup form={form} name="hardware.setupRequirements" label="What setup do you require?" options={["Table / Space", "Power Supply", "Internet/Wi-Fi", "Display/Monitor", "Other"]}/><TextArea form={form} name="hardware.specialRequirements" label="Any special setup, equipment or safety requirements?"/><FileUpload images={images} uploadImages={uploadImages} removeImage={removeImage}/><TextArea form={form} name="hardware.additionalInformation" label="Any additional information you'd like to share?"/></div></Card></div>; }
function RoboRaceWarForm({ form }: FormProps) { return <div className="space-y-6"><Card title="Robo Race / Robo War Details"><div className="space-y-5"><div className="grid gap-5 md:grid-cols-2"><Field form={form} name="robo.teamName" label="Team Name"/><Field form={form} name="robo.organizationName" label="College / Organization"/><Field form={form} name="robo.robotName" label="Robot Name"/><Field form={form} name="robo.powerSourceDetails" label="Power Source / Battery Details"/><Field form={form} name="robo.controllerDetails" label="Controller / Communication Details"/></div><RadioGroup form={form} name="robo.competitionCategory" label="Competition Category" options={["Robo Race", "Robo War"]}/><TextArea form={form} name="robo.robotSpecifications" label="Robot Specifications" helper="Dimensions, weight, motor specifications, etc."/><TextArea form={form} name="robo.robotDescription" label="Briefly describe your robot"/><Field form={form} name="robo.demoUrl" label="Demo Video / Previous Competition Video" type="url" required={false}/><CheckboxGroup form={form} name="robo.equipmentRequirements" label="What setup/equipment will you require at the venue?" options={["Power Supply", "Table / Space", "Charging Point", "Other"]}/><TextArea form={form} name="robo.specialRequirements" label="Any special requirements or additional information?"/></div></Card></div>; }
function FileUpload({ images, uploadImages, removeImage }: { images: ProjectImageSummary[]; uploadImages: (files: FileList | null) => void; removeImage: (id: string) => void }) { return <section aria-labelledby="upload-title"><h3 id="upload-title" className="text-sm font-medium text-slate-700">Upload Project Images <span className="text-red-600">*</span></h3><p className="mt-1 text-xs text-slate-500">JPEG, PNG, or WebP. Maximum 5 MB per image.</p><label className="mt-3 flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50"><FileImage className="h-7 w-7 text-blue-600"/><span className="mt-2 text-sm font-medium">Choose project images</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(event) => { uploadImages(event.target.files); event.currentTarget.value = ""; }}/></label>{images.length > 0 && <ul className="mt-3 grid gap-3 sm:grid-cols-2">{images.map((image) => <li key={image.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"><img src={`/api/project-form/images/${image.id}`} alt="Uploaded project" className="h-12 w-12 rounded-lg object-cover"/><span className="min-w-0 flex-1 truncate text-sm">{image.filename}</span><button type="button" onClick={() => removeImage(image.id)} aria-label={`Remove ${image.filename}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4"/></button></li>)}</ul>}</section>; }

function Review({ values, images, edit }: { values: ProjectFormValues; images: ProjectImageSummary[]; edit: (step: number) => void }) { const track = values.selectedTrack as TrackValue; const detail = track === "BUSINESS_FAIR" ? values.business : track === "STARTUPS_PROJECTS_OSS" ? values.startup : track === "HARDWARE_PROJECTS" ? values.hardware : values.robo; const fields = Object.entries(detail).filter(([, value]) => (Array.isArray(value) ? value.length : Boolean(value))); return <div className="space-y-6"><Card title="Review Your Application" subtitle="Verify your information before submitting."><p className="text-sm text-slate-600">All fields marked required have been checked. You can return to a section to make changes.</p></Card><ReviewCard title="Basic Information & Team" onEdit={() => edit(1)} fields={[["Name", values.name], ["Email ID", values.email], ["Phone Number", values.phoneNumber], ["You are a", applicantLabel(values.applicantType)], ["College / Organization / Company Name", values.organizationName], ["City", values.city], ["Team Name", values.teamName], ["Number of Team Members", values.numberOfTeamMembers === "" ? "" : String(values.numberOfTeamMembers)], ...values.teamMembers.flatMap((member, index) => [[`Team Member ${index + 1}`, member.name], ["Email / Contact", member.emailOrContact]] as [string, string][])]}/><ReviewCard title="Registered Track" onEdit={() => edit(2)} fields={[["Track", track ? trackLabel(track) : ""]]}/><ReviewCard title={track ? `${trackLabel(track)} Details` : "Track Details"} onEdit={() => edit(3)} fields={fields.map(([key, value]) => [prettyKey(key), Array.isArray(value) ? value.join(", ") : value] as [string, string])}/>{track === "HARDWARE_PROJECTS" && images.length > 0 && <Card title="Project Images"><div className="flex flex-wrap gap-3">{images.map((image) => <img key={image.id} src={`/api/project-form/images/${image.id}`} alt="Uploaded project" className="h-24 w-24 rounded-xl object-cover"/>)}</div></Card>}</div>; }
function ReviewCard({ title, fields, onEdit }: { title: string; fields: [string, string][]; onEdit: () => void }) { return <Card title={title}><div className="-mt-12 flex justify-end"><Button type="button" variant="ghost" size="sm" onClick={onEdit}>Edit</Button></div><dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">{fields.filter(([, value]) => value).map(([label, value], index) => <div key={`${label}-${index}`} className="border-t border-slate-100 pt-3"><dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{value}</dd></div>)}</dl></Card>; }
function prettyKey(key: string) { return key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()).replace("Url", "URL"); }
function applicantLabel(value: ProjectFormValues["applicantType"]) { return { STUDENT: "Student", WORKING_PROFESSIONAL: "Working Professional", ENTREPRENEUR_FOUNDER: "Entrepreneur / Founder", OTHER: "Other", "": "" }[value]; }
function Navigation({ step, isSaving, onBack, onSave, onContinue, onSubmit }: { step: number; isSaving: boolean; onBack: () => void; onSave: () => void; onContinue: () => void; onSubmit: () => void }) { return <div className="mt-8 flex flex-col-reverse gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"><div>{step > 1 && <Button type="button" variant="ghost" onClick={onBack} disabled={isSaving}><ChevronLeft/>Back</Button>}</div><div className="flex flex-col gap-3 sm:flex-row"><Button type="button" variant="outline" onClick={onSave} disabled={isSaving}>{isSaving && <LoaderCircle className="animate-spin"/>}Save Draft</Button>{step < 4 ? <Button type="button" className="bg-blue-600 hover:bg-blue-700" onClick={onContinue} disabled={isSaving}>Save & Continue<ChevronRight/></Button> : <Button type="button" className="bg-blue-600 hover:bg-blue-700" onClick={onSubmit} disabled={isSaving}>{isSaving && <LoaderCircle className="animate-spin"/>}Submit Application<ChevronRight/></Button>}</div></div>; }
function SuccessState() { return <main className="grid min-h-screen place-items-center bg-[#f7f9fc] px-4"><section className="max-w-lg rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-8 w-8"/></span><h1 className="mt-6 text-3xl font-semibold tracking-tight">Application submitted</h1><p className="mt-3 text-slate-600">Your DevFest GDG Noida 2026 project application has been saved successfully.</p></section></main>; }
