// Core shared types for GrowBro.

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface StoredUser extends User {
  password: string;
}

export interface BusinessProfile {
  businessName: string;
  industry: string;
  goals: string;
  targetCustomers: string;
  currentSituation: string;
  problems: string;
}

export interface MonthlyMetric {
  month: string;
  revenue: number;
  customers: number;
  orders: number;
}

export interface GrowthMetric {
  revenue: number;
  revenueGrowthPct: number;
  customers: number;
  customerGrowthPct: number;
  conversionRate: number;
  avgOrderValue: number;
  churnRate: number;
  netPromoterScore: number;
}

export interface ChannelBreakdown {
  name: string;
  value: number;
}

export interface Milestone {
  id: string;
  title: string;
  done: boolean;
}

export type ProblemSeverity = 'high' | 'medium' | 'low';

export interface BusinessProblem {
  id: string;
  title: string;
  description: string;
  severity: ProblemSeverity;
  evidence: string; // why the engine flagged it
  source: 'profile' | 'stated' | 'inferred';
}

export interface Strategy {
  id: string;
  title: string;
  summary: string; // what this strategy is
  why?: string; // why it could help this user
  category: string;
  effort: 'Low' | 'Medium' | 'High';
  impact: 'High' | 'Medium' | 'Low';
  nextSteps: string[]; // the step-by-step action plan
  caseStudyId?: string; // a relevant case study
  problemId?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  challenge: string; // business/problem
  solution: string; // strategy used
  result: string; // result
  metric: string; // headline metric
  lesson: string; // the takeaway
  apply: string; // how the GrowBro user could apply the lesson
  tags: string[];
}

//
// Growth-coach flow: OBJECTIVE -> STRATEGIES -> ACTION PLAN -> PROGRESS
//

/** The single clear objective the coach derives from the user's problem. */
export interface GrowthObjective {
  problem: string; // the user's own words (the stated problem)
  summary: string; // the simplified understanding
  objective: string; // a clear, one-line objective statement
  createdAt: number;
}

/** One checkable step in the action plan. */
export interface PlanStep {
  id: string;
  text: string;
  done: boolean;
  doneAt?: number; // timestamp when completed (used for daily history)
}

export interface GrowthTip {
  id: string;
  title: string;
  body: string;
  tag: string;
}

export type ChatRole = 'user' | 'assistant';

export interface AiSolution {
  problem: string;
  strategies: Strategy[];
  nextSteps: string[];
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  solution?: AiSolution; // structured payload for assistant problem-solving messages
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info';
}
