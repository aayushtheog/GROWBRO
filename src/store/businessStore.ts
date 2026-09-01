// Business data state: the user's profile, growth metrics, milestones, and
// chat history. Persisted to localStorage so the app survives reloads.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  BusinessProfile,
  ChannelBreakdown,
  ChatMessage,
  DailyMetricLog,
  GrowthMetric,
  GrowthObjective,
  Milestone,
  MonthlyMetric,
  PlanStep,
  RoadmapDay,
  Strategy,
} from '../types';
import { uid } from '../lib/storage';
import { understandProblem } from '../lib/businessLogic';
import { createRoadmap } from '../lib/roadmap';
import {
  DEMO_CHAT,
  DEMO_CHANNELS,
  DEMO_METRICS,
  DEMO_MILESTONES,
  DEMO_MONTHLY,
  DEMO_PROFILE,
} from '../data/demoBusiness';

interface BusinessState {
  profile: BusinessProfile;
  monthly: MonthlyMetric[];
  metrics: GrowthMetric;
  channels: ChannelBreakdown[];
  milestones: Milestone[];
  chat: ChatMessage[];
  isDemoSeeded: boolean;

  // Business-type selection (personalization)
  businessType: string | null;

  // Growth-coach state
  plan: GrowthObjective | null;
  strategies: Strategy[];
  selectedStrategyId: string | null;
  planSteps: PlanStep[];

  // 30-day growth roadmap
  roadmap: RoadmapDay[];
  dailyMetrics: DailyMetricLog[];

  updateProfile: (profile: BusinessProfile) => void;
  refreshMetrics: () => void;
  toggleMilestone: (id: string) => void;
  addMilestone: (title: string) => void;
  removeMilestone: (id: string) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => ChatMessage;
  clearChat: () => void;

  // Growth-coach actions
  setBusinessType: (businessType: string) => void;
  startGrowthPlan: (objective: GrowthObjective, strategies: Strategy[]) => void;
  selectStrategy: (strategyId: string) => void;
  togglePlanStep: (stepId: string) => void;
  addStrategyToPlan: (strategy: Strategy, problemText?: string) => void;
  toggleRoadmapDay: (day: number) => void;
  logDailyMetric: (log: Omit<DailyMetricLog, 'id'>) => void;
  removeDailyMetric: (id: string) => void;
  resetGrowth: () => void;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set, get) => ({
      profile: DEMO_PROFILE,
      monthly: DEMO_MONTHLY,
      metrics: DEMO_METRICS,
      channels: DEMO_CHANNELS,
      milestones: DEMO_MILESTONES,
      chat: DEMO_CHAT,
      isDemoSeeded: false,

      businessType: null,

      plan: null,
      strategies: [],
      selectedStrategyId: null,
      planSteps: [],

      roadmap: [],
      dailyMetrics: [],

      updateProfile: (profile) => set({ profile }),

      setBusinessType: (businessType) => set({ businessType }),

      refreshMetrics: () => {
        // Deterministic demo drift so the app feels "live" without a backend.
        const monthly = get().monthly;
        const last = monthly[monthly.length - 1];
        const month = new Date().toLocaleString('en-US', { month: 'short' });
        const newPoint: MonthlyMetric = {
          month,
          revenue: Math.round(last.revenue * (1 + (Math.random() - 0.35) * 0.06)),
          customers: Math.round(last.customers * (1 + (Math.random() - 0.4) * 0.04)),
          orders: Math.round(last.orders * (1 + (Math.random() - 0.4) * 0.04)),
        };
        const next = [...monthly.slice(-5), newPoint];
        const revenue = next[next.length - 1].revenue;
        const prev = next[next.length - 2].revenue;
        const customers = next[next.length - 1].customers;
        const prevCustomers = next[next.length - 2].customers;
        set({
          monthly: next,
          metrics: {
            revenue,
            revenueGrowthPct: +(((revenue - prev) / prev) * 100).toFixed(1),
            customers,
            customerGrowthPct: +(((customers - prevCustomers) / prevCustomers) * 100).toFixed(1),
            conversionRate: 12.4,
            avgOrderValue: +(revenue / next[next.length - 1].orders).toFixed(2),
            churnRate: 18.2,
            netPromoterScore: 54,
          },
        });
      },

      toggleMilestone: (id) =>
        set((s) => ({
          milestones: s.milestones.map((m) =>
            m.id === id ? { ...m, done: !m.done } : m,
          ),
        })),

      addMilestone: (title) =>
        set((s) => ({
          milestones: [...s.milestones, { id: uid('milestone'), title, done: false }],
        })),

      removeMilestone: (id) =>
        set((s) => ({ milestones: s.milestones.filter((m) => m.id !== id) })),

      addChatMessage: (message) => {
        const created: ChatMessage = { ...message, id: uid('msg'), timestamp: Date.now() };
        set((s) => ({ chat: [...s.chat, created] }));
        return created;
      },

      clearChat: () =>
        set({
          chat: [
            {
              id: uid('msg'),
              role: 'assistant',
              content:
                "I've cleared our history. I'm ready when you are — tell me about a business challenge!",
              timestamp: Date.now(),
            },
          ],
        }),

      // Record a fresh growth plan (objective + suggested strategies).
      startGrowthPlan: (objective, strategies) =>
        set({
          plan: objective,
          strategies,
          selectedStrategyId: null,
          planSteps: [],
          roadmap: [],
        }),

      // Pick a strategy: turn its next steps into plan steps and generate the
      // personalized 30-day roadmap for the selected strategy.
      selectStrategy: (strategyId) =>
        set((s) => {
          const strat = s.strategies.find((x) => x.id === strategyId);
          if (!strat) return {};
          const roadmap = createRoadmap(strat);
          return {
            selectedStrategyId: strategyId,
            planSteps: strat.nextSteps.map((text) => ({
              id: uid('step'),
              text,
              done: false,
            })),
            roadmap,
          };
        }),

      // Toggle a step's completion, recording when it was done (for daily history).
      togglePlanStep: (stepId) =>
        set((s) => ({
          planSteps: s.planSteps.map((st) =>
            st.id === stepId
              ? { ...st, done: !st.done, doneAt: !st.done ? Date.now() : undefined }
              : st,
          ),
        })),

      // Add a strategy (e.g. from the chatbot) to the plan and select it.
      addStrategyToPlan: (strategy, problemText) =>
        set((s) => {
          const problem = (problemText ?? s.plan?.problem ?? '').trim();
          const objective: GrowthObjective =
            s.plan ??
            (problem
              ? (() => {
                  const { summary, objective: obj } = understandProblem(problem);
                  return { problem, summary, objective: obj, createdAt: Date.now() };
                })()
              : {
                  problem: `Follow “${strategy.title}”`,
                  summary: `A strategy suggested by your GrowBro advisor: ${strategy.title}.`,
                  objective: strategy.title,
                  createdAt: Date.now(),
                });

          const existing = s.strategies.some((x) => x.id === strategy.id)
            ? s.strategies
            : [...s.strategies, strategy];
          const roadmap = createRoadmap(strategy);
          return {
            plan: objective,
            strategies: existing,
            selectedStrategyId: strategy.id,
            planSteps: strategy.nextSteps.map((text) => ({
              id: uid('step'),
              text,
              done: false,
            })),
            roadmap,
          };
        }),

      toggleRoadmapDay: (day) =>
        set((s) => ({
          roadmap: s.roadmap.map((d) =>
            d.day === day ? { ...d, done: !d.done, doneAt: !d.done ? Date.now() : undefined } : d,
          ),
        })),

      logDailyMetric: (log) =>
        set((s) => ({
          dailyMetrics: [...s.dailyMetrics, { ...log, id: uid('metric') }],
        })),

      removeDailyMetric: (id) =>
        set((s) => ({ dailyMetrics: s.dailyMetrics.filter((m) => m.id !== id) })),

      // Reset the growth plan but keep the selected business type (so a "new
      // problem" goes straight back to describing the problem).
      resetGrowth: () =>
        set({
          plan: null,
          strategies: [],
          selectedStrategyId: null,
          planSteps: [],
          roadmap: [],
        }),
    }),
    {
      name: 'growbro:business',
      partialize: (state) => ({
        profile: state.profile,
        monthly: state.monthly,
        metrics: state.metrics,
        channels: state.channels,
        milestones: state.milestones,
        chat: state.chat,
        businessType: state.businessType,
        plan: state.plan,
        strategies: state.strategies,
        selectedStrategyId: state.selectedStrategyId,
        planSteps: state.planSteps,
        roadmap: state.roadmap,
        dailyMetrics: state.dailyMetrics,
      }),
    },
  ),
);
