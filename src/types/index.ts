export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  metrics: { label: string; value: string }[];
  features: string[];
  techStack: string[];
  architectureSnippet: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  agentName: string;
  challenge: string;
  solution: string;
  outcomes: { label: string; value: string }[];
  compliance: string[];
  telemetrySimulation: {
    status: string;
    latency: string;
    verifiedRate: string;
    eventLog: string[];
  };
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string; detail: string }[];
  quote: {
    text: string;
    author: string;
    title: string;
  };
  stack: string[];
}

export interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  tags: string[];
  responsibilities: string[];
}

export interface OfficeLocation {
  city: string;
  country: string;
  address: string;
  timezone: string;
  phone: string;
  isHQ?: boolean;
}

export type LegalModalType = 'privacy' | 'terms' | 'accessibility' | 'cookies' | 'case_study' | 'capability_detail' | null;
