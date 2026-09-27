export interface ResumeLink {
  label: string;
  url?: string;
}

export interface PersonalProfile {
  name: string;
  title: string;
  summary: string;
  email?: string;
  phone?: string;
  location?: string;
  links: ResumeLink[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProjectEntry {
  name: string;
  summary: string;
  role?: string;
  period?: string;
  technologies: string[];
  highlights: string[];
  links?: ResumeLink[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
}

export interface CertificationEntry {
  title: string;
  url?: string;
}

export interface ResumeData {
  personal: PersonalProfile;
  experience: ExperienceEntry[];
  skills: SkillGroup[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
}
