import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useBusinessStore } from '../store/businessStore';
import { createPersonalizedPlan } from '../lib/recommendations';
import { BusinessTypeSelect } from '../components/onboarding/BusinessTypeSelect';
import { ProblemDescribe } from '../components/onboarding/ProblemDescribe';
import { StrategyRecommendation } from '../components/onboarding/StrategyRecommendation';

// Staged flow:  Business type → Problem → Top 5 strategies → Select → Roadmap
export function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const store = useBusinessStore();

  const [submitting, setSubmitting] = useState(false);
  const name = currentUser?.name?.split(' ')[0] ?? 'there';

  const businessTypeId = store.businessType;
  const hasPlan = !!store.plan;
  const selected = store.selectedStrategyId;

  const handleBusinessSelect = (id: string) => {
    store.setBusinessType(id);
  };

  const handleProblemSubmit = (text: string) => {
    if (submitting) return;
    setSubmitting(true);
    // Small delay so the loading state feels natural.
    setTimeout(() => {
      const plan = createPersonalizedPlan(text, businessTypeId, store.profile);
      store.startGrowthPlan(plan.objective, plan.strategies);
      setSubmitting(false);
    }, 400);
  };

  const handleStrategySelect = (id: string) => {
    store.selectStrategy(id);
    // The roadmap is generated on selection; jump straight to the plan view.
    navigate('/plan');
  };

  // --- Stage 1: pick a business type ---
  if (!businessTypeId) {
    return (
      <div className="mx-auto max-w-4xl pt-2">
        <GreetingPrefix name={name} />
        <BusinessTypeSelect
          value={null}
          onSelect={handleBusinessSelect}
        />
      </div>
    );
  }

  // --- Stage 2: describe the problem ---
  if (!hasPlan) {
    return (
      <ProblemDescribe
        businessTypeId={businessTypeId}
        onBack={() => store.setBusinessType('')}
        onSubmit={handleProblemSubmit}
        submitting={submitting}
      />
    );
  }

  // --- Stage 3: top 5 strategies + selection ---
  return (
    <StrategyRecommendation
      problemText={store.plan?.problem ?? ''}
      businessTypeId={businessTypeId}
      strategies={store.strategies}
      selectedId={selected}
      onSelect={handleStrategySelect}
      onViewPlan={() => navigate('/plan')}
      onRestart={() => {
        store.resetGrowth();
        store.setBusinessType('');
      }}
    />
  );
}

function GreetingPrefix({ name }: { name: string }) {
  return (
    <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand-600">
      Welcome back, {name} 👋
    </p>
  );
}
