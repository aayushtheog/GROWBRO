// Selectable business types used to personalize GrowBro's recommendations.
// Each type carries keyword + category affinities so the recommendation engine
// (and the roadmap) can adapt to *what kind* of business the user runs.

import type { BusinessType } from '../types';

export const BUSINESS_TYPES: BusinessType[] = [
  {
    id: 'b2b-saas',
    label: 'B2B SaaS',
    description: 'Software sold to other businesses, usually on subscription.',
    icon: 'Boxes',
    emoji: '💻',
    keywords: ['saas', 'software', 'subscription', 'mr monthly recurring', 'app', 'b2b', 'tech', 'platform'],
    categoryAffinity: { marketing: 3, 'revenue': 2, digital: 2, retention: 1, pricing: 1, strategy: 1, operations: 1 },
  },
  {
    id: 'b2c-business',
    label: 'B2C Business',
    description: 'Products or services sold directly to end consumers.',
    icon: 'ShoppingBag',
    emoji: '🛍️',
    keywords: ['consumer', 'b2c', 'retail', 'direct to consumer', 'product', 'customers'],
    categoryAffinity: { marketing: 3, retention: 2, digital: 2, 'revenue': 1, operations: 1 },
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    description: 'Online store selling physical or digital goods.',
    icon: 'ShoppingCart',
    emoji: '🛒',
    keywords: ['ecommerce', 'e-commerce', 'shopify', 'online store', 'shop', 'cart', 'drop', 'products online'],
    categoryAffinity: { digital: 3, marketing: 3, 'revenue': 2, conversion: 3, retention: 2, operations: 2 },
  },
  {
    id: 'local-physical',
    label: 'Local / Physical',
    description: 'A bricks-and-mortar business with a physical location.',
    icon: 'Store',
    emoji: '🏪',
    keywords: ['local', 'physical', 'store', 'shop', 'walk', 'cafe', 'restaurant', 'coffee', 'bakery', 'salon', 'gym', 'location'],
    categoryAffinity: { retention: 3, operations: 2, marketing: 2, 'revenue': 2, conversion: 1, pricing: 1 },
  },
  {
    id: 'startup',
    label: 'Startup',
    description: 'A young, fast-moving business chasing growth and scale.',
    icon: 'Rocket',
    emoji: '🚀',
    keywords: ['startup', 'launch', 'venture', 'scale', 'early stage', 'mvp', 'seed'],
    categoryAffinity: { acquisition: 3, strategy: 3, marketing: 2, digital: 2, pricing: 2, 'revenue': 2 },
  },
  {
    id: 'agency-service',
    label: 'Agency / Service',
    description: 'Provides services or deliverables to clients for a fee.',
    icon: 'Briefcase',
    emoji: '💼',
    keywords: ['agency', 'service business', 'services', 'consulting', 'client', 'studio', 'deliverables'],
    categoryAffinity: { 'revenue': 3, pricing: 3, operations: 2, marketing: 2, retention: 2, strategy: 1 },
  },
  {
    id: 'freelancer-consultant',
    label: 'Freelancer / Consultant',
    description: 'A solo operator selling their time, skill, or expertise.',
    icon: 'UserCheck',
    emoji: '🧑‍💻',
    keywords: ['freelance', 'freelancer', 'consultant', 'solo', 'independent', 'side hustle', 'one person'],
    categoryAffinity: { pricing: 3, acquisition: 2, 'revenue': 3, marketing: 2, operations: 2, retention: 1 },
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Something else — GrowBro still adapts to your problem.',
    icon: 'Sparkles',
    emoji: '✨',
    keywords: [],
    categoryAffinity: { strategy: 2, marketing: 2, retention: 1, pricing: 1, 'revenue': 1, operations: 1 },
  },
];

export type BusinessTypeId = BusinessType['id'];

export function getBusinessType(id: string | null | undefined): BusinessType | undefined {
  if (!id) return undefined;
  return BUSINESS_TYPES.find((t) => t.id === id);
}

export function getBusinessTypeLabel(id: string | null | undefined): string {
  return getBusinessType(id)?.label ?? 'your business';
}
