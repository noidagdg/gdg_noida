export const trackValues = [
  "BUSINESS_FAIR",
  "STARTUPS_PROJECTS_OSS",
  "HARDWARE_PROJECTS",
  "ROBO_RACE_WAR",
] as const;

export type TrackValue = (typeof trackValues)[number];

export type TeamMemberValue = {
  name: string;
  emailOrContact: string;
};

export type ProjectFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  applicantType: "STUDENT" | "WORKING_PROFESSIONAL" | "ENTREPRENEUR_FOUNDER" | "OTHER" | "";
  organizationName: string;
  city: string;
  teamName: string;
  numberOfTeamMembers: number | "";
  teamMembers: TeamMemberValue[];
  selectedTrack: TrackValue | "";
  business: {
    businessName: string; founderName: string; businessCategory: string; businessDescription: string;
    showcaseDescription: string; socialMediaUrl: string; stallRequirements: string[];
    specialRequirements: string; additionalInformation: string;
  };
  startup: {
    showcaseType: string; projectName: string; oneLineDescription: string; problemStatement: string;
    solutionDescription: string; techStack: string; currentStage: string; githubUrl: string;
    liveDemoUrl: string; showcaseRequirements: string[]; additionalInformation: string;
  };
  hardware: {
    projectName: string; oneLineDescription: string; problemStatement: string; projectDescription: string;
    hardwareComponents: string; techStack: string; currentStage: string; demoUrl: string;
    setupRequirements: string[]; specialRequirements: string; additionalInformation: string;
  };
  robo: {
    teamName: string; organizationName: string; competitionCategory: string; robotName: string;
    robotSpecifications: string; powerSourceDetails: string; controllerDetails: string;
    robotDescription: string; demoUrl: string; equipmentRequirements: string[]; specialRequirements: string;
  };
};

export type ProjectImageSummary = { id: string; filename: string; mimeType: string; size: number };

export const emptyProjectFormValues: ProjectFormValues = {
  name: "", email: "", phoneNumber: "", applicantType: "", organizationName: "", city: "", teamName: "", numberOfTeamMembers: "", teamMembers: [], selectedTrack: "",
  business: { businessName: "", founderName: "", businessCategory: "", businessDescription: "", showcaseDescription: "", socialMediaUrl: "", stallRequirements: [], specialRequirements: "", additionalInformation: "" },
  startup: { showcaseType: "", projectName: "", oneLineDescription: "", problemStatement: "", solutionDescription: "", techStack: "", currentStage: "", githubUrl: "", liveDemoUrl: "", showcaseRequirements: [], additionalInformation: "" },
  hardware: { projectName: "", oneLineDescription: "", problemStatement: "", projectDescription: "", hardwareComponents: "", techStack: "", currentStage: "", demoUrl: "", setupRequirements: [], specialRequirements: "", additionalInformation: "" },
  robo: { teamName: "", organizationName: "", competitionCategory: "", robotName: "", robotSpecifications: "", powerSourceDetails: "", controllerDetails: "", robotDescription: "", demoUrl: "", equipmentRequirements: [], specialRequirements: "" },
};
