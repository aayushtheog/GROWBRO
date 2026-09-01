// Static content library: case studies, growth tips, strategy templates, and
// the chatbot's topic-advice engine. Everything the coach needs to give
// practical, explainable advice with no live AI connection.

import type { CaseStudy, GrowthTip, Strategy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs_loyalty',
    title: 'From empty mornings to a full house',
    industry: 'Coffee Shop',
    businessType: 'local-physical',
    challenge:
      'A local coffee shop saw foot traffic collapse between 9am and noon, with revenue flat for six months.',
    solution:
      'They launched a loyalty punch program, a targeted morning "remote worker" package, and weekend brew workshops.',
    result:
      'Within 90 days, weekday morning revenue grew 42% and repeat-customer rate climbed 31%.',
    metric: '+42% weekday revenue',
    lesson: 'Rewarding repeat visits turns casual customers into regulars who plan around you.',
    apply:
      'Create a simple loyalty offer (every 6th coffee free) and give quiet hours a reason to exist — a bundle or a workshop.',
    tags: ['Retention', 'Loyalty'],
  },
  {
    id: 'cs_operations',
    title: 'Turning lost bookings into revenue',
    industry: 'Salon & Spa',
    businessType: 'local-physical',
    challenge:
      'High no-show rates and off-peak idle slots were costing the business roughly 18% of weekly capacity.',
    solution:
      'They introduced prepaid deposits, automated SMS reminders, and a same-day "last-minute slot" push to nearby clients.',
    result:
      "The no-show rate dropped from 22% to 8%, recovering an estimated 14% of lost weekly revenue.",
    metric: '-14pp no-show rate',
    lesson: 'Small operational fixes (reminders + deposits) protect revenue you already have.',
    apply:
      'Reduce no-shows with a simple reminder text and a small deposit, then fill dead time with a last-minute deal.',
    tags: ['Operations', 'Conversion'],
  },
  {
    id: 'cs_acquisition',
    title: 'Scaling a boutique brand online',
    industry: 'E-commerce',
    businessType: 'ecommerce',
    challenge:
      'A 2-person online store depended entirely on organic searches and had no repeat-purchase strategy.',
    solution:
      'They built an email nurture flow, a subscription refill option, and a referral program, and optimised their top product pages.',
    result: 'Repeat-purchase rate tripled and monthly revenue grew 68% in one quarter.',
    metric: '+68% monthly revenue',
    lesson: 'A repeatable funnel (email + referral + refill) beats hoping for search traffic.',
    apply:
      'Capture emails at checkout, send a simple 3-email sequence, and offer a discount to customers who bring a friend.',
    tags: ['Marketing', 'Revenue'],
  },
  {
    id: 'cs_marketing',
    title: 'A local gym doubles memberships',
    industry: 'Fitness Studio',
    businessType: 'local-physical',
    challenge:
      'Membership sign-ups were seasonal and front-desk staff had no upsell playbook.',
    solution:
      'They ran a "first month free" trial funnel, a member-referral incentive, and quarterly challenge events.',
    result: 'New members rose 55% and average membership length increased from 4 to 9 months.',
    metric: '+55% new members',
    lesson: 'A low-risk trial plus a reason to invite friends fills a seasonal pipeline.',
    apply:
      'Offer a short free trial, reward referrals, and run a recurring event that gives people a reason to show up.',
    tags: ['Acquisition', 'Retention'],
  },
  {
    id: 'cs_pricing',
    title: 'Packages that nudge buyers upward',
    industry: 'Marketing Agency',
    businessType: 'agency-service',
    challenge:
      'A solo agency won work but always at the smallest package, so revenue was huge effort for thin reward.',
    solution:
      'They rebuilt their offer into three tiers (Good / Better / Best) and anchored every pitch on the top tier.',
    result: 'The average project value rose 37% within two months, with no new clients needed.',
    metric: '+37% average project value',
    lesson: 'How you package and present an offer is a pricing lever in itself.',
    apply:
      'Turn your service into 3 tiers and present the best one first — most buyers will trade up instead of down.',
    tags: ['Pricing', 'Revenue'],
  },
  {
    id: 'cs_online',
    title: 'A bakery sells out online',
    industry: 'Bakery & Food',
    businessType: 'local-physical',
    challenge:
      'A bakery had plenty of foot traffic but almost no online orders and no way to reach regulars outside the shop.',
    solution:
      'They set up simple online ordering, collected emails at the till, and posted daily videos of fresh items to social media.',
    result: 'Online orders went from zero to 30% of weekly sales in three months.',
    metric: '30% of sales online',
    lesson: 'Meeting customers where they already are (email + social) multiplies your reach.',
    apply:
      'Make ordering easy online and share one short real-life post a day — consistency beats polish.',
    tags: ['Digital', 'Marketing'],
  },
  {
    id: 'cs_saas_first100',
    title: 'A B2B SaaS finds its first 100 customers',
    industry: 'SaaS',
    businessType: 'b2b-saas',
    challenge:
      'A new B2B SaaS had a solid product but no customers — cold outreach went nowhere because it pitched everyone.',
    solution:
      'They picked ONE buyer persona, built a free lead-magnet guide, added a live demo funnel, and used one early success story as their sales anchor.',
    result: 'Within 90 days they signed 112 accounts and lifted trial-to-paid conversion to 12%.',
    metric: '112 first customers',
    lesson: 'A narrow, specific market beats a broad one — clarity converts.',
    apply:
      'Choose one ideal customer, give them a low-cost reason to engage (guide/demo), and lead sales with a real example of success.',
    tags: ['Acquisition', 'SaaS'],
  },
  {
    id: 'cs_saas_churn',
    title: 'A SaaS cuts churn with an onboarding flow',
    industry: 'SaaS',
    businessType: 'b2b-saas',
    challenge:
      'Signups poured in, but most users never reached their “aha” moment and quietly churned after the free trial.',
    solution:
      'They built a 5-email onboarding sequence, added in-app tips, and scheduled a success call for active users in the first week.',
    result: 'Monthly churn dropped 25% and trial-to-paid conversion rose by a third.',
    metric: '-25% churn',
    lesson: 'Don’t just acquire users — guide them to a first win fast.',
    apply:
      'Map the one action a new user must take to see value, then email, prompt, and hand-hold them there in week one.',
    tags: ['Retention', 'SaaS'],
  },
  {
    id: 'cs_saas_pricing',
    title: 'A SaaS doubles revenue with tiered pricing',
    industry: 'SaaS',
    businessType: 'b2b-saas',
    challenge:
      'A growing SaaS charged one flat price, so small users found it too expensive and large ones got a bargain.',
    solution:
      'They split the plan into Starter / Growth / Scale, added usage-based growth to the top tier, and moved free users to a clear trial.',
    result: 'Average revenue per account rose 2.1x within two months.',
    metric: '2.1x revenue/user',
    lesson: 'One price leaves money on the table at both ends of the market.',
    apply:
      'Segment your offer into tiers and let users self-select by size — price for value, not cost.',
    tags: ['Pricing', 'SaaS'],
  },
  {
    id: 'cs_ecom_conversion',
    title: 'A Shopify store doubles its conversion rate',
    industry: 'E-commerce',
    businessType: 'ecommerce',
    challenge:
      'An online store got steady traffic but almost no purchases — product pages had weak photos and no trust signals.',
    solution:
      'They added customer photos and reviews, clearer size/value info, and a simple abandoned-cart email sequence.',
    result: 'Conversion rate climbed from 1.1% to 2.3% in eight weeks.',
    metric: '1.1% → 2.3% conversion',
    lesson: 'Traffic isn’t the problem — persuasion on the page is.',
    apply:
      'Add reviews, real photos, and one recovery email to your product pages before buying more ads.',
    tags: ['Conversion', 'E-commerce'],
  },
  {
    id: 'cs_ecom_vip',
    title: 'An e-commerce brand builds a VIP email list',
    industry: 'E-commerce',
    businessType: 'ecommerce',
    challenge:
      'A D2C brand relied on paid ads for every sale and had no direct relationship with customers.',
    solution:
      'They added a “join the VIP list for 10% off” popup, a welcome sequence, and early-access drops for subscribers.',
    result: 'Email became 40% of sales and advertising cost per sale fell by nearly half.',
    metric: '40% of sales from email',
    lesson: 'Owned audiences (email) are cheaper and more reliable than rented ones (ads).',
    apply:
      'Capture emails at every touchpoint and send a welcome + early-access sequence to turn one-time buyers into fans.',
    tags: ['Marketing', 'E-commerce', 'Retention'],
  },
  {
    id: 'cs_restaurant_weeknights',
    title: 'A restaurant fills empty weeknights',
    industry: 'Restaurant',
    businessType: 'local-physical',
    challenge:
      'Weekend tables were full but Tuesdays and Wednesdays were dead, leaving staff idle and revenue flat.',
    solution:
      'They launched a “Chef’s Tasting Night” on slow evenings, a regulars’ loyalty card, and a local event partnership.',
    result: 'Weekday revenue grew 28% and food waste dropped as kitchens ran consistent specials.',
    metric: '+28% weekday revenue',
    lesson: 'Give off-peak time a reason to exist instead of hoping it fills.',
    apply:
      'Create a special, event, or discount that only applies on your quietest days and promote it locally.',
    tags: ['Retention', 'Local'],
  },
  {
    id: 'cs_salon_membership',
    title: 'A salon turns clients into members',
    industry: 'Salon',
    businessType: 'local-physical',
    challenge:
      'A busy salon had loyal clients but unpredictable cash flow and a quiet stretch between visits.',
    solution:
      'They introduced a monthly membership — discounted color/trim, product perks, and a reserved slot — and promoted it at checkout.',
    result: '40% of regulars joined and two-thirds of bookings became recurring.',
    metric: '40% became members',
    lesson: 'A recurring membership smooths cash flow and locks in retention.',
    apply:
      'Offer a monthly plan that bundles a must-have service with a perk, and ask at the moment of delight.',
    tags: ['Retention', 'Service', 'Revenue'],
  },
  {
    id: 'cs_agency_retainers',
    title: 'A web agency lands monthly retainers',
    industry: 'Agency',
    businessType: 'agency-service',
    challenge:
      'The agency only won one-off projects, so revenue stopped between launches and sales was a treadmill.',
    solution:
      'They created “growth retainer” packages (care, maintenance, monthly improvements) and pitched them at project completion.',
    result: '60% of revenue became recurring within one quarter.',
    metric: '60% recurring revenue',
    lesson: 'Service margins multiply when one project turns into an ongoing relationship.',
    apply:
      'Package an ongoing element (support, retainer) into every project and propose it while the win is fresh.',
    tags: ['Revenue', 'Agency'],
  },
  {
    id: 'cs_local_trades',
    title: 'A local trades business books more jobs',
    industry: 'Local Trades',
    businessType: 'local-physical',
    challenge:
      'A solo plumber landed a few jobs a month but lost most leads to slow quotes and a weak Google presence.',
    solution:
      'They optimised their Google Business profile, collected reviews on every job, and sent quotes the same day with a short follow-up.',
    result: 'Quotes booked at double the rate and they sold out their next two weeks.',
    metric: '2x quote-to-book rate',
    lesson: 'Speed and trust win local work — respond fast and show proof.',
    apply:
      'Reply to enquiries the same day, keep review links handy, and follow up every quote once.',
    tags: ['Local', 'Marketing', 'Conversion'],
  },
  {
    id: 'cs_service_noshows',
    title: 'A cleaning service stops losing revenue to no-shows',
    industry: 'Service Business',
    businessType: 'local-physical',
    challenge:
      'A cleaning company frequently drove to empty homes and busy diaries hid every cancellation until it was too late.',
    solution:
      'They automated booking reminders and a same-day “fill my slot” text to nearby regulars.',
    result: 'No-shows fell from 18% to 6% and idle gaps dropped by a third.',
    metric: '-12pp no-shows',
    lesson: 'Operational automation protects revenue you already earned.',
    apply:
      'Set up automatic reminders and a same-day deal to refill cancelled appointments.',
    tags: ['Operations', 'Service'],
  },
  {
    id: 'cs_startup_launch',
    title: 'A startup validates before it scales',
    industry: 'Startup',
    businessType: 'startup',
    challenge:
      'A startup was about to pour budget into ads before knowing who truly wanted the product.',
    solution:
      'They ran a tiny waitlist campaign, interviewed first users, and built a minimum product for the 100 most excited signups.',
    result: 'They launched with real demand — first-week conversion beat all paid benchmarks.',
    metric: 'Validated before scale',
    lesson: 'Validating demand with a small group is cheaper than guessing at scale.',
    apply:
      'Launch a waitlist or pre-order to test interest and interview the first users before spending on growth.',
    tags: ['Startup', 'Strategy', 'Acquisition'],
  },
  {
    id: 'cs_freelancer_rates',
    title: 'A freelancer raises rates and lands better clients',
    industry: 'Freelance',
    businessType: 'freelancer-consultant',
    challenge:
      'A skilled freelancer was always busy but earned little — they charged hourly and got the price-takers.',
    solution:
      'They switched to project-based pricing, packaged their work into 3 tiers, and published one client-result case study.',
    result: 'Their average project fee rose 55% with fewer, better clients.',
    metric: '+55% project fee',
    lesson: 'Charge for outcomes and packages, not hours.',
    apply:
      'Move off hourly pricing to fixed packages and show a proof point to justify the higher tier.',
    tags: ['Pricing', 'Freelance'],
  },
  {
    id: 'cs_gym_retention',
    title: 'A gym raises retention with a goals program',
    industry: 'Fitness Studio',
    businessType: 'local-physical',
    challenge:
      'Members joined in January, then stopped coming by March — churn was high and new signups couldn’t keep up.',
    solution:
      'They launched an 8-week goals challenge, weekly check-ins, and a complimentary “bring a friend” pass.',
    result: 'Member attendance rose 45% and average membership length doubled.',
    metric: '2x membership length',
    lesson: 'Retention is a habit you build with goals and accountability, not a perk.',
    apply:
      'Give members a short challenge and check in weekly — attendance and loyalty climb together.',
    tags: ['Retention', 'Local'],
  },
  {
    id: 'cs_b2c_referral',
    title: 'A B2C brand grows on referrals',
    industry: 'B2C / Consumer',
    businessType: 'b2c-business',
    challenge:
      'A consumer goods brand had happy customers but no natural way for them to invite friends.',
    solution:
      'They added a “give a friend 15%, get 15%” referral reward and a one-tap share link after purchase.',
    result: 'Referrals produced 22% of new customers within three months.',
    metric: '22% of new customers',
    lesson: 'Happy customers will market for you if you make it effortless and rewarding.',
    apply:
      'Add a simple two-sided discount and ask for the share right after a great purchase moment.',
    tags: ['Marketing', 'B2C', 'Retention'],
  },
  {
    id: 'cs_consultant_funnel',
    title: 'A consultant builds a steady lead pipeline',
    industry: 'Consulting',
    businessType: 'freelancer-consultant',
    challenge:
      'Work came in feast-or-famine from word of mouth, making income unpredictable.',
    solution:
      'They published a short weekly insight on LinkedIn, added a free assessment call, and followed every lead within 24h.',
    result: 'They filled their calendar 2 months ahead and stopped chasing work.',
    metric: '2 months booked ahead',
    lesson: 'Consistent content plus a clear next step fills a pipeline predictably.',
    apply:
      'Post one genuine insight a week, offer a low-pressure discovery call, and follow up fast.',
    tags: ['Marketing', 'Freelance', 'Acquisition'],
  },
];

export const GROWTH_TIPS: GrowthTip[] = [
  {
    id: 'tip1',
    title: 'Fix one number, not ten',
    body: 'Pick the single metric that moves your business most (revenue per customer, churn, or conversion). Improving one numbered outcome beats juggling many vague goals.',
    tag: 'Focus',
  },
  {
    id: 'tip2',
    title: 'Ask your best customers 3 questions',
    body: 'Why did you first buy? What almost stopped you? What would make you leave? Three answers reveal your real positioning and your biggest risks.',
    tag: 'Research',
  },
  {
    id: 'tip3',
    title: 'The 80/20 of your product line',
    body: 'Audit which 20% of your products or services drive 80% of profit. Double down on those and quietly retire the long tail that eats your margins.',
    tag: 'Product',
  },
  {
    id: 'tip4',
    title: 'Recover your abandoned carts',
    body: 'A simple two-email abandoned-cart sequence recovers 5–11% of lost sales overnight. Automate it before you chase any new traffic.',
    tag: 'Conversion',
  },
  {
    id: 'tip5',
    title: 'Turn reviews into a sales asset',
    body: 'Collect reviews at the moment of delight and display them on your highest-traffic pages. Social proof is the cheapest conversion boost you have.',
    tag: 'Trust',
  },
  {
    id: 'tip6',
    title: 'Build a repeat-purchase muscle',
    body: 'A customer who buys twice is worth several times a one-time buyer. Offer a refill, subscription, or membership to move first-time buyers to repeat.',
    tag: 'Retention',
  },
];

// Helper to build strategies with a bit less boilerplate.
const makeStrategy = (
  id: string,
  problemId: string | undefined,
  caseStudyId: string,
  partial: Omit<Strategy, 'id' | 'problemId' | 'caseStudyId'>,
): Strategy => ({ id, problemId, caseStudyId, ...partial });

export const STRATEGY_LIBRARY: Strategy[] = [
  makeStrategy('strat_loyalty_1', 'problem_loyalty', 'cs_loyalty', {
    title: 'Launch a simple loyalty program',
    summary:
      'Reward repeat purchases with a simple punch card, points, or a member perk so regulars become deliberate brand advocates.',
    why:
      'It directly targets your repeat-customer gap — it is far cheaper to keep a customer than to find a new one, and a reward gives people a reason to come back on purpose.',
    category: 'Retention',
    effort: 'Low',
    impact: 'High',
    nextSteps: [
      'Pick one simple reward (e.g. "every 6th purchase free") that fits your business.',
      'Set it up with a punch card, a free app, or even a notebook at the till.',
      'Promote it at checkout and send a "welcome" message to every new member.',
      'Check how many members make a second visit within 30 days.',
    ],
  }),
  makeStrategy('strat_margin_1', 'problem_margin', 'cs_pricing', {
    title: 'Run a margin and pricing audit',
    summary:
      'Identify low-margin products silently draining profit and reprice or reposition your top sellers.',
    why:
      'It tackles thin margins at the source — most small businesses could raise prices 5–10% with little customer resistance once they know their true costs.',
    category: 'Pricing',
    effort: 'Low',
    impact: 'High',
    nextSteps: [
      'List every product or service with its cost, price, and margin.',
      'Flag anything under 30% margin and cut or bundle it.',
      'Test a 5–8% price increase on your 20% most popular items.',
      'Measure the margin change after two weeks and keep what works.',
    ],
  }),
  makeStrategy('strat_acquisition_1', 'problem_acquisition', 'cs_acquisition', {
    title: 'Build one steady customer funnel',
    summary:
      'Replace scattered marketing with one repeatable funnel: a clear offer, a landing page, and a follow-up.',
    why:
      'It fixes inconsistent new-customer flow — instead of waiting for luck, you create a machine that brings in leads predictably each week.',
    category: 'Marketing',
    effort: 'Medium',
    impact: 'High',
    nextSteps: [
      'Define one clear offer for your ideal customer.',
      'Build a simple page or storefront section that explains it.',
      'Add a way to capture emails (or orders) on that page.',
      'Follow up with a 3-touch email sequence after sign-up.',
    ],
  }),
  makeStrategy('strat_upsell_1', 'problem_upsell', 'cs_acquisition', {
    title: 'Add an upsell and cross-sell layer',
    summary:
      'Increase revenue per customer by packaging complementary add-ons and teaching your team to offer them naturally.',
    why:
      'It boosts what every existing customer is worth — small extra purchases add up fast without needing any new customers.',
    category: 'Revenue',
    effort: 'Low',
    impact: 'Medium',
    nextSteps: [
      'Identify your two most-loved add-ons or combos.',
      'Create a simple script or menu for staff to suggest them.',
      'Track your upsell rate weekly and celebrate small wins.',
    ],
  }),
  makeStrategy('strat_operations_1', 'problem_operations', 'cs_operations', {
    title: 'Streamline your recurring operations',
    summary:
      'Automate or simplify the manual steps that eat your time and cause errors, so revenue scales without extra stress.',
    why:
      'It removes the "we are swamped" ceiling — a booking reminder and a deposit saved one business 14% of weekly revenue with almost no effort.',
    category: 'Operations',
    effort: 'Medium',
    impact: 'Medium',
    nextSteps: [
      'List your top 3 repetitive manual tasks this month.',
      'Pick one to automate or template-ize this week.',
      'Measure the hours saved and reinvest them in sales.',
    ],
  }),
  makeStrategy('strat_pricing_1', 'problem_pricing', 'cs_pricing', {
    title: 'Introduce value-based packages',
    summary:
      'Package your offer into clear tiers (Good / Better / Best) so customers self-select upward and you capture more value.',
    why:
      'It is a proven pricing upgrade — one agency grew average project value 37% just by changing how it packaged and presented its offer.',
    category: 'Pricing',
    effort: 'Low',
    impact: 'Medium',
    nextSteps: [
      'Define 3 tiers that ladder up in price and value.',
      'Add optional add-ons to the middle tier to steer buyers up.',
      'Show the "Best" tier by default as the anchor.',
    ],
  }),
  makeStrategy('strat_online_1', 'problem_online', 'cs_online', {
    title: 'Strengthen your online storefront',
    summary:
      'Polish your website and listings to convert the traffic you already have before spending on more.',
    why:
      'It turns the visitors you already get into buyers — one bakery grew online orders to 30% of weekly sales just by making ordering easy and staying visible on social.',
    category: 'Digital',
    effort: 'Medium',
    impact: 'Medium',
    nextSteps: [
      'Speed up your top 3 pages and make ordering obvious.',
      'Add customer reviews and clear photos to key pages.',
      'Post one short real-life update to social media each day.',
      'Set up analytics so you can measure what works.',
    ],
  }),
  makeStrategy('strat_clarity_1', 'problem_clarity', 'cs_acquisition', {
    title: 'Clarify your position and ideal customer',
    summary:
      'Sharpen who you serve and the one result you deliver best, so your messaging and offers land with the right people.',
    why:
      'It stops wasting effort on the wrong audience — when people instantly understand what you do and for whom, marketing and sales get easier everywhere.',
    category: 'Strategy',
    effort: 'Low',
    impact: 'High',
    nextSteps: [
      'Write one sentence: who we serve + the result we deliver.',
      'Update your homepage headline to match it.',
      'Test the message with 5 actual customers.',
    ],
  }),
  makeStrategy('strat_referral_1', 'problem_acquisition', 'cs_marketing', {
    title: 'Start a referral program',
    summary:
      'Reward existing customers for bringing friends, so happy clients become your cheapest sales team.',
    why:
      'Referrals convert better than any ad because trust is already built in — one studio grew memberships 55% partly on member referrals.',
    category: 'Marketing',
    effort: 'Low',
    impact: 'High',
    nextSteps: [
      'Choose a reward that costs little but feels generous (e.g. a discount for both sides).',
      'Make it easy to share: a link, a card, or a simple ask at the till.',
      'Mention it once after a great experience, not at every sale.',
      'Track how many referred customers you get each month.',
    ],
  }),
  makeStrategy('strat_email_1', 'problem_loyalty', 'cs_acquisition', {
    title: 'Turn repeat visits into a habit with email',
    summary:
      'Capture contact info and send a simple, friendly sequence that brings customers back at the right moment.',
    why:
      'Emails are the highest-return channel for small business — a boutiques repeat-purchase rate tripled with a simple nurture + refill sequence.',
    category: 'Marketing',
    effort: 'Medium',
    impact: 'High',
    nextSteps: [
      'Add a way to collect email at checkout or sign-up.',
      'Write a 3-email welcome + comeback sequence.',
      'Offer a small "come back" incentive in message two.',
      'Review open and click rates after a few weeks.',
    ],
  }),
  makeStrategy('strat_automation_1', 'problem_operations', 'cs_operations', {
    title: 'Automate reminders and follow-ups',
    summary:
      'Use simple automation for bookings, reminders, and follow-ups so you stop losing sales to forgotten appointments and dropped carts.',
    why:
      'A couple of automations recovered 14% of weekly revenue for one service business — the biggest wins are often the least flashy.',
    category: 'Operations',
    effort: 'Medium',
    impact: 'Medium',
    nextSteps: [
      'Pick one manual follow-up you do every day.',
      'Find a simple free tool to automate it (reminder texts, cart emails).',
      'Turn it on and watch the no-show / drop-off rate.',
    ],
  }),
  makeStrategy('strat_reviews_1', 'problem_online', 'cs_online', {
    title: 'Turn customer reviews into social proof',
    summary:
      'Collect reviews at the moment of delight and display them prominently so new customers feel safe choosing you.',
    why:
      'Real reviews answer the biggest question a new customer has — can I trust you? It is the cheapest conversion boost you have.',
    category: 'Digital',
    effort: 'Low',
    impact: 'Medium',
    nextSteps: [
      'Ask for a review right after a great experience.',
      'Make it a one-tap link to Google or your site.',
      'Show your best reviews on your homepage and checkout pages.',
    ],
  }),
];

export function strategyForProblem(problemId: string): Strategy | undefined {
  return STRATEGY_LIBRARY.find((s) => s.problemId === problemId);
}

/** Strategies shown when we cannot pin the problem to a specific category yet. */
const PICK = (id: string): Strategy => {
  const s = STRATEGY_LIBRARY.find((x) => x.id === id);
  if (!s) throw new Error(`Missing strategy: ${id}`);
  return s;
};
export const DEFAULT_STRATEGIES: Strategy[] = [
  PICK('strat_acquisition_1'),
  PICK('strat_loyalty_1'),
  PICK('strat_referral_1'),
  PICK('strat_pricing_1'),
];

/**
 * Chatbot topic advice for common "how do I…" questions. Each topic maps to a
 * friendly explanation, practical steps, a linked case study, and an option to
 * turn the advice into a full action plan.
 */
export interface TopicAdvice {
  keywords: string[];
  title: string;
  intro: string;
  steps: string[];
  caseStudyId?: string;
  planType: string; // which strategy to use if the user says "add to my plan"
}

export const TOPIC_ADVICE: TopicAdvice[] = [
  {
    keywords: ['social media', 'instagram', 'facebook', 'tiktok', 'post'],
    title: 'Using social media to grow',
    intro:
      "Good social media for a small business is about consistency and real life, not perfect content. Post what you're actually doing, and ask people to follow and share.",
    steps: [
      'Pick ONE platform where your customers already spend time.',
      'Post one short, real update a day (a photo, a quick video, a tip).',
      'Reply to every comment within a day — engagement feeds the algorithm.',
      'Add a clear call-to-action: "Message us to book" or "Link in bio to order".',
    ],
    caseStudyId: 'cs_online',
    planType: 'strat_online_1',
  },
  {
    keywords: ['price', 'pricing', 'charge', 'how much', 'package', 'tier'],
    title: 'Setting the right prices',
    intro:
      'Most small businesses underprice. Base your price on the value you deliver, not just your costs, and use clear packages so buyers pick the level that fits.',
    steps: [
      'List every product/service with its real cost and current price.',
      'Compare to 3 competitors — are you at, above, or below?',
      'Create 3 tiers (Good / Better / Best) so buyers can trade up.',
      'Raise the price of your most popular item by 5–10% and watch the reaction.',
    ],
    caseStudyId: 'cs_pricing',
    planType: 'strat_pricing_1',
  },
  {
    keywords: ['email', 'newsletter', 'mailing list', 'email marketing'],
    title: 'Email marketing that brings people back',
    intro:
      'Email reaches your customers directly and is the highest-return marketing channel there is. The goal is simple: stay at the front of their mind and make it easy to come back.',
    steps: [
      'Collect emails at checkout, on your site, and at events.',
      'Write a short 3-message welcome + comeback sequence.',
      'Offer a small incentive ("10% off your next order") to join.',
      'Send one useful update a week — value first, sales second.',
    ],
    caseStudyId: 'cs_acquisition',
    planType: 'strat_email_1',
  },
  {
    keywords: ['refer', 'referral', 'referrals', 'word of mouth', 'recommend'],
    title: 'Getting more referrals',
    intro:
      'A happy customer is your best salesperson. Make it easy and worthwhile for them to bring a friend, and you get new customers who already trust you.',
    steps: [
      'Pick a reward that costs little but feels generous (discount for both).',
      'Make sharing easy: a link, a card, or a simple ask at the till.',
      'Ask at the moment of delight, not at every purchase.',
      'Track how many referred customers arrive each month.',
    ],
    caseStudyId: 'cs_marketing',
    planType: 'strat_referral_1',
  },
  {
    keywords: ['review', 'reviews', 'testimonial', 'reputation', 'google'],
    title: 'Getting more reviews and trust',
    intro:
      'New customers often choose the business with more real reviews. Collect them right after a great experience and show them where buyers will see them.',
    steps: [
      'Ask for a review immediately after a great experience.',
      'Send a one-tap link to Google or your best review platform.',
      'Reply to every review — thank yous and good responses build trust.',
      'Show your best reviews on your homepage and checkout pages.',
    ],
    caseStudyId: 'cs_online',
    planType: 'strat_reviews_1',
  },
  {
    keywords: ['retention', 'repeat customer', 'come back', 'loyal', 'regular', 'keep customer'],
    title: 'Keeping customers coming back',
    intro:
      'Keeping an existing customer is far cheaper than finding a new one. A simple repeat-purchase habit — a reward, a reminder, a membership — is the fastest lever you have.',
    steps: [
      'Create one simple reward for repeat purchases (punch card, points, perk).',
      'Collect contact info so you can reach them again.',
      'Send a friendly "we miss you" message after 30 quiet days.',
      'Offer a small "come back" incentive to re-engage lapsed customers.',
    ],
    caseStudyId: 'cs_loyalty',
    planType: 'strat_loyalty_1',
  },
  {
    keywords: ['cost', 'reduce', 'cut costs', 'expenses', 'overhead', 'margin', 'profit'],
    title: 'Improving margins and cutting waste',
    intro:
      'You can grow profit without growing sales — by cutting what drains margin and pricing what you sell with confidence. Start with your true numbers.',
    steps: [
      'List every product/service with cost, price, and margin.',
      'Flag anything under 30% margin and cut, bundle, or reprice it.',
      'Cancel or renegotiate one recurring expense you rarely think about.',
      'Test a small price increase on your best sellers.',
    ],
    caseStudyId: 'cs_pricing',
    planType: 'strat_margin_1',
  },
  {
    keywords: ['website', 'online', 'web', 'seo', 'google', 'shopify', 'landing page'],
    title: 'Getting more from your website',
    intro:
      'Most sites lose the visitors they already have. Make it obvious what you offer and how to buy, speed things up, and keep posting so traffic grows.',
    steps: [
      'Make your headline say who you help and the result you deliver.',
      'Put one clear "buy / book / get in touch" button above the fold.',
      'Add reviews and real photos to your busiest pages.',
      'Set up free analytics so you can see what visitors do.',
    ],
    caseStudyId: 'cs_online',
    planType: 'strat_online_1',
  },
  {
    keywords: ['new customers', 'get customers', 'acquire', 'marketing', 'advertise', 'ads', 'traffic'],
    title: 'Getting more new customers',
    intro:
      'The most reliable growth comes from one repeatable funnel — a clear offer, a place to buy it, and a follow-up — rather than one-off bursts of marketing.',
    steps: [
      'Define one clear offer for your ideal customer.',
      'Create a simple page or storefront section for that offer.',
      'Capture emails or orders on that page.',
      'Follow up with a 3-touch sequence to turn interest into sales.',
    ],
    caseStudyId: 'cs_acquisition',
    planType: 'strat_acquisition_1',
  },
  {
    keywords: ['automate', 'automation', 'manual', 'save time', 'process', 'operations', 'admin'],
    title: 'Saving time with simple automation',
    intro:
      'The fastest way to scale is to stop doing the same task by hand. Pick one repetitive job and find a simple tool to do it for you — then reinvest the time in sales.',
    steps: [
      'List the top 3 repetitive things you do every week.',
      'Pick exactly one to automate this week.',
      'Find a free or cheap tool (reminders, invoicing, scheduling).',
      'Measure the hours saved and spend them on customers.',
    ],
    caseStudyId: 'cs_operations',
    planType: 'strat_automation_1',
  },
];

export function findTopicAdvice(text: string): TopicAdvice | undefined {
  const lower = text.toLowerCase();
  return TOPIC_ADVICE.find((t) => t.keywords.some((k) => lower.includes(k)));
}
