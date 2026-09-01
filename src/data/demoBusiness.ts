// Seeded demo business: a fictional specialty coffee shop chain ("Bean & Bloom")
// with several months of metrics, a populated profile, milestones, and a couple
// of starter chat messages so the app looks alive on first login.

import type {
  BusinessProfile,
  ChannelBreakdown,
  ChatMessage,
  GrowthMetric,
  Milestone,
  MonthlyMetric,
} from '../types';

export const DEMO_BUSINESS_NAME = 'Bean & Bloom Coffee';

export const DEMO_PROFILE: BusinessProfile = {
  businessName: DEMO_BUSINESS_NAME,
  industry: 'Specialty Coffee Shop (Retail & F&B)',
  goals:
    'Grow monthly revenue by 20% this year, open a second location, and build a loyal repeat customer base.',
  targetCustomers:
    'Urban professionals 24–45 who buy coffee 3–5x a week on their commute, plus remote workers who stay for hours.',
  currentSituation:
    'Two locations are busy in the mornings but quiet mid-afternoon. We rely heavily on walk-ins and have almost no repeat-purchase program.',
  problems:
    'low repeat customers, thin margins on food items, no loyalty program, quiet afternoons',
};

export const DEMO_MONTHLY: MonthlyMetric[] = [
  { month: 'Mar', revenue: 41800, customers: 6100, orders: 7200 },
  { month: 'Apr', revenue: 42500, customers: 6320, orders: 7480 },
  { month: 'May', revenue: 43900, customers: 6550, orders: 7790 },
  { month: 'Jun', revenue: 45200, customers: 6810, orders: 8150 },
  { month: 'Jul', revenue: 46100, customers: 7040, orders: 8430 },
  { month: 'Aug', revenue: 48300, customers: 7410, orders: 8940 },
];

export const DEMO_METRICS: GrowthMetric = {
  revenue: 48300,
  revenueGrowthPct: 8.6,
  customers: 7410,
  customerGrowthPct: 5.3,
  conversionRate: 12.4,
  avgOrderValue: 6.4,
  churnRate: 18.2,
  netPromoterScore: 54,
};

export const DEMO_CHANNELS: ChannelBreakdown[] = [
  { name: 'Walk-in', value: 58 },
  { name: 'Referrals', value: 17 },
  { name: 'Social Media', value: 14 },
  { name: 'Online Order', value: 11 },
];

export const DEMO_MILESTONES: Milestone[] = [
  { id: 'm1', title: 'Launch a loyalty program with a punch card', done: false },
  { id: 'm2', title: 'Add an afternoon "remote worker" package', done: false },
  { id: 'm3', title: 'Cut low-margin food SKUs and reprice best-sellers', done: false },
  { id: 'm4', title: 'Collect 50 customer reviews this quarter', done: true },
];

export const DEMO_CHAT: ChatMessage[] = [
  {
    id: 'demo_chat_1',
    role: 'assistant',
    content:
      "Hi Alex! 👋 I'm GrowBro, your business growth advisor. Describe any problem you're facing — like slow growth, few repeat customers, or thin margins — and I'll give you practical strategies and next steps.",
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
  },
];
