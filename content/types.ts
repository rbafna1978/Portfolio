export type Project = {
  slug: string;
  name: string;
  summary: string;
  tech: string[];
  featured: boolean;
  homeHighlights: string[];
  problem: string[];
  approach: string[];
  architecture: string[];
  decisions: string[];
  improvements: string[];
};

export type Experience = {
  company: string;
  role: string;
  context: string;
  scope: string[];
  tech: string[];
  impact: string[];
};

export type Education = {
  school: string;
  program: string;
  timeframe: string;
  detail?: string;
};
