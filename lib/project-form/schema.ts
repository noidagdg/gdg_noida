import { z } from "zod";
import { trackValues, type ProjectFormValues, type TrackValue } from "./types";

const requiredText = (label: string) => z.string().trim().min(1, `${label} is required.`);
const optionalUrl = z.string().trim().refine((value) => !value || z.url().safeParse(value).success, "Enter a valid URL.");
const requirements = z.array(z.string()).min(1, "Select at least one option.");

export const basicDetailsSchema = z.object({
  name: requiredText("Name"),
  email: z.string().trim().email("Enter a valid email address."),
  phoneNumber: requiredText("Phone number").min(7, "Enter a valid phone number."),
  applicantType: z.enum(["STUDENT", "WORKING_PROFESSIONAL", "ENTREPRENEUR_FOUNDER", "OTHER"]),
  organizationName: requiredText("College / Organization / Company Name"),
  city: requiredText("City"),
  teamName: z.string(),
  numberOfTeamMembers: z.number().int().min(0, "Enter a valid number.").nullable(),
  teamMembers: z.array(z.object({ name: requiredText("Team member name"), emailOrContact: requiredText("Email or contact") })),
}).superRefine((value, ctx) => {
  if (value.numberOfTeamMembers && value.numberOfTeamMembers !== value.teamMembers.length) {
    ctx.addIssue({ code: "custom", path: ["teamMembers"], message: "Add details for every team member." });
  }
});

export const businessSchema = z.object({
  businessName: requiredText("Business / Brand Name"), founderName: requiredText("Founder / Owner Name"), businessCategory: requiredText("Business Category"),
  businessDescription: requiredText("Tell us about your business"), showcaseDescription: requiredText("Products / services"), socialMediaUrl: z.url("Enter a valid URL."),
  stallRequirements: requirements, specialRequirements: requiredText("Special requirements or requests"), additionalInformation: requiredText("Additional information"),
});
export const startupSchema = z.object({
  showcaseType: z.enum(["Startup", "Personal/Student Project", "Open Source Project"]), projectName: requiredText("Project / Startup Name"), oneLineDescription: requiredText("One-line description"),
  problemStatement: requiredText("Problem Statement"), solutionDescription: requiredText("Solution / Project Description"), techStack: requiredText("Tech Stack"),
  currentStage: z.enum(["Idea", "Prototype", "MVP", "Working Product", "Deployed / Live"]), githubUrl: optionalUrl, liveDemoUrl: optionalUrl,
  showcaseRequirements: requirements, additionalInformation: requiredText("Additional requirements or information"),
});
export const hardwareSchema = z.object({
  projectName: requiredText("Project Name"), oneLineDescription: requiredText("One-line Project Description"), problemStatement: requiredText("Problem statement"),
  projectDescription: requiredText("Project Description / How does it work?"), hardwareComponents: requiredText("Hardware Components Used"), techStack: requiredText("Software / Tech Stack Used"),
  currentStage: z.enum(["Prototype", "Working Model", "Product / Deployment-ready"]), demoUrl: optionalUrl, setupRequirements: requirements,
  specialRequirements: requiredText("Special setup, equipment or safety requirements"), additionalInformation: requiredText("Additional information"),
});
export const roboSchema = z.object({
  teamName: requiredText("Team Name"), organizationName: requiredText("College / Organization"), competitionCategory: z.enum(["Robo Race", "Robo War"]),
  robotName: requiredText("Robot Name"), robotSpecifications: requiredText("Robot Specifications"), powerSourceDetails: requiredText("Power Source / Battery Details"),
  controllerDetails: requiredText("Controller / Communication Details"), robotDescription: requiredText("Robot description"), demoUrl: optionalUrl,
  equipmentRequirements: requirements, specialRequirements: requiredText("Special requirements or additional information"),
});

export function validateTrackDetails(values: ProjectFormValues): z.ZodSafeParseResult<unknown> {
  switch (values.selectedTrack) {
    case "BUSINESS_FAIR": return businessSchema.safeParse(values.business);
    case "STARTUPS_PROJECTS_OSS": return startupSchema.safeParse(values.startup);
    case "HARDWARE_PROJECTS": return hardwareSchema.safeParse(values.hardware);
    case "ROBO_RACE_WAR": return roboSchema.safeParse(values.robo);
    default: return z.enum(trackValues).safeParse(values.selectedTrack);
  }
}

export const completeApplicationSchema = z.object({
  basic: basicDetailsSchema,
  selectedTrack: z.enum(trackValues),
  business: businessSchema.partial(), startup: startupSchema.partial(), hardware: hardwareSchema.partial(), robo: roboSchema.partial(),
}).superRefine((value, ctx) => {
  const parsed = value.selectedTrack === "BUSINESS_FAIR" ? businessSchema.safeParse(value.business) : value.selectedTrack === "STARTUPS_PROJECTS_OSS" ? startupSchema.safeParse(value.startup) : value.selectedTrack === "HARDWARE_PROJECTS" ? hardwareSchema.safeParse(value.hardware) : roboSchema.safeParse(value.robo);
  if (!parsed.success) parsed.error.issues.forEach((issue) => ctx.addIssue({ ...issue, path: [value.selectedTrack, ...issue.path] }));
});

export const selectedTrackSchema = z.enum(trackValues);
const draftText = z.string().max(10000);
const draftDetails = <T extends z.ZodRawShape>(shape: T) => z.object(shape);
export const draftRequestSchema = z.object({
  currentStep: z.number().int().min(1).max(4),
  values: z.object({
    name: draftText, email: draftText, phoneNumber: draftText,
    applicantType: z.enum(["STUDENT", "WORKING_PROFESSIONAL", "ENTREPRENEUR_FOUNDER", "OTHER", ""]),
    organizationName: draftText, city: draftText, teamName: draftText, numberOfTeamMembers: z.union([z.number().int().min(0).max(100), z.literal("")]),
    teamMembers: z.array(z.object({ name: draftText, emailOrContact: draftText })).max(100), selectedTrack: z.union([z.enum(trackValues), z.literal("")]),
    business: draftDetails({ businessName: draftText, founderName: draftText, businessCategory: draftText, businessDescription: draftText, showcaseDescription: draftText, socialMediaUrl: draftText, stallRequirements: z.array(draftText), specialRequirements: draftText, additionalInformation: draftText }),
    startup: draftDetails({ showcaseType: draftText, projectName: draftText, oneLineDescription: draftText, problemStatement: draftText, solutionDescription: draftText, techStack: draftText, currentStage: draftText, githubUrl: draftText, liveDemoUrl: draftText, showcaseRequirements: z.array(draftText), additionalInformation: draftText }),
    hardware: draftDetails({ projectName: draftText, oneLineDescription: draftText, problemStatement: draftText, projectDescription: draftText, hardwareComponents: draftText, techStack: draftText, currentStage: draftText, demoUrl: draftText, setupRequirements: z.array(draftText), specialRequirements: draftText, additionalInformation: draftText }),
    robo: draftDetails({ teamName: draftText, organizationName: draftText, competitionCategory: draftText, robotName: draftText, robotSpecifications: draftText, powerSourceDetails: draftText, controllerDetails: draftText, robotDescription: draftText, demoUrl: draftText, equipmentRequirements: z.array(draftText), specialRequirements: draftText }),
  }),
});
export function trackLabel(track: TrackValue): string {
  return { BUSINESS_FAIR: "Business Fair", STARTUPS_PROJECTS_OSS: "Startups / Projects / Open Source", HARDWARE_PROJECTS: "Hardware Projects", ROBO_RACE_WAR: "Robo Race / Robo War" }[track];
}
