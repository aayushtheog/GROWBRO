// 30-day growth roadmap templates, keyed by strategy category.
//
// Each roadmap is built from the SELECTED strategy's category, keeping every
// daily task relevant to that strategy. A roadmap is 4 weeks (phases) of
// daily actions with day counts that sum to 30:
//   Week 1 · Setup & Research   (days 1–7)
//   Week 2 · Implementation     (days 8–15)
//   Week 3 · Optimization       (days 16–23)
//   Week 4 · Growth & Measurement (days 24–30)

export interface RoadmapTask {
  task: string;
  goal: string;
  outcome: string;
}

export interface PhaseTemplate {
  title: string;
  tasks: RoadmapTask[];
}

export interface RoadmapTemplate {
  weeks: PhaseTemplate[]; // exactly 4; tasks total 30
}

// ---- Generic phase titles (all categories share the same 4-week arc) ----
export const PHASE_TITLES = [
  'Week 1 · Setup & Research',
  'Week 2 · Implementation',
  'Week 3 · Optimization',
  'Week 4 · Growth & Measurement',
];

const w1 = 'Week 1 · Setup & Research';
const w2 = 'Week 2 · Implementation';
const w3 = 'Week 3 · Optimization';
const w4 = 'Week 4 · Growth & Measurement';

/**
 * Build a roadmap template from 4 arrays of tasks (7 / 8 / 8 / 7 = 30 days).
 */
function tpl(weeks: [RoadmapTask[], RoadmapTask[], RoadmapTask[], RoadmapTask[]]): RoadmapTemplate {
  return { weeks: weeks.map((tasks, i) => ({ title: [w1, w2, w3, w4][i], tasks })) };
}

// =========================================================================
// Retention / Loyalty
// =========================================================================
const RETENTION: RoadmapTemplate = tpl([
  [
    { task: 'Audit your last 60 days.', goal: 'Map who buys and when.', outcome: 'A clear list of repeat vs one-time customers.' },
    { task: 'Ask 5 best customers why they return.', goal: 'Understand the real pull.', outcome: 'Quotes you can build a loyalty pitch around.' },
    { task: 'List the quiet spots in your week.', goal: 'Find gaps to fill with repeat offers.', outcome: 'A week-at-a-glance of slow hours.' },
    { task: 'Set one loyalty mechanic', goal: 'Keep it simple.', outcome: 'A chosen reward (points, punch card, member perk).' },
    { task: 'Estimate the cost of the reward.', goal: 'Make sure it is profitable.', outcome: 'Reward budget that stays under margin.' },
    { task: 'Pick how customers sign up.', goal: 'Remove friction.', outcome: 'A sign-up method (card, app, notebook, email).' },
    { task: 'Draft the promo message.', goal: 'Explain it simply.', outcome: 'A 2-sentence pitch for the till and social.' },
  ],
  [
    { task: 'Print / build the loyalty materials.', goal: 'Make it physical and visible.', outcome: 'Punch cards, QR, or member page ready.' },
    { task: 'Train your team on the pitch.', goal: 'Consistent delivery.', outcome: 'Staff can explain it in one breath.' },
    { task: 'Launch the program.', goal: 'Get live.', outcome: 'First members join day one.' },
    { task: 'Capture every new member.', goal: 'Track sign-ups.', outcome: 'A running count of members.' },
    { task: 'Send a welcome message to new members.', goal: 'Start the relationship.', outcome: 'Every member gets a hello.' },
    { task: 'Add the reward to quiet hours.', goal: 'Fill the dead time.', outcome: 'A mid-week / off-peak offer live.' },
    { task: 'Remind lapsed customers.', goal: 'Re-engage the silent.', outcome: 'A "we miss you" message to 20+ lapsed buyers.' },
    { task: 'Track first-week sign-ups.', goal: 'Measure traction.', outcome: 'A baseline member count.' },
  ],
  [
    { task: 'Review what members actually use.', goal: 'Double down on winners.', outcome: 'Top mechanic identified.' },
    { task: 'Cut or change what is ignored.', goal: 'Stop wasted effort.', outcome: 'One mechanic simplified or removed.' },
    { task: 'Test a small "refer a friend" add-on.', goal: 'Turn members into promoters.', outcome: 'Referral incentive live.' },
    { task: 'Survey members for ideas.', goal: 'Let them shape it.', outcome: '3 practical asks from real customers.' },
    { task: 'Promote the program on social.', goal: 'Spread the word.', outcome: 'Weekly posts about the program.' },
    { task: 'Add a second reward tier.', goal: 'Give a reason to spend more.', outcome: 'Higher-tier perk for frequent buyers.' },
    { task: 'Recount member spend vs non-members.', goal: 'Prove the lift.', outcome: 'A repeat-rate comparison.' },
    { task: 'Refresh the welcome sequence.', goal: 'Keep it fresh.', outcome: 'Updated second-touch message.' },
  ],
  [
    { task: 'Announce a repeat-customer milestone.', goal: 'Build buzz.', outcome: 'A small celebration event / post.' },
    { task: 'Measure your repeat-purchase rate.', goal: 'Quantify the win.', outcome: '% of customers who bought twice.' },
    { task: 'Identify your best member segment.', goal: 'Know who to reward.', outcome: 'A profile of your top 20%.' },
    { task: 'Create a VIP perk.', goal: 'Reward the top 20%.', outcome: 'Exclusive perk for best members.' },
    { task: 'Gather and post member testimonials.', goal: 'Use social proof.', outcome: '2 real reviews shared publicly.' },
    { task: 'Compare 30-day repeat rate to start.', goal: 'Show progress.', outcome: 'A before/after number for your notes.' },
    { task: 'Write your Month-2 plan.', goal: 'Keep momentum.', outcome: '3 next steps for next month.' },
  ],
]);

// =========================================================================
// Pricing
// =========================================================================
const PRICING: RoadmapTemplate = tpl([
  [
    { task: 'List every offer with cost and price.', goal: 'See the real margins.', outcome: 'A pricing spreadsheet.' },
    { task: 'Flag offers under 30% margin.', goal: 'Find the drains.', outcome: 'A list of low-margin items.' },
    { task: 'Benchmark 3 competitors.', goal: 'Know your position.', outcome: 'A comparison of price & value.' },
    { task: 'Interview 3 loyal customers on price.', goal: 'Test willingness to pay.', outcome: 'Qualitative price feedback.' },
    { task: 'Pick your top 20% sellers.', goal: 'Focus the change.', outcome: 'Your best sellers identified.' },
    { task: 'Decide price-test candidates.', goal: 'Keep it safe.', outcome: '3 items to reprice/test.' },
    { task: 'Draft a price-increase story.', goal: 'Explain the value bump.', outcome: 'Why-it-costs-more messaging.' },
  ],
  [
    { task: 'Build 3 tiers (Good / Better / Best).', goal: 'Give buyers a ladder.', outcome: 'A 3-tier offer structure.' },
    { task: 'Add an add-on to the middle tier.', goal: 'Steer buyers upward.', outcome: 'A natural upsell in place.' },
    { task: 'Raise price on your #1 best seller.', goal: 'Capture value.', outcome: 'New price live (5–8%).' },
    { task: 'Update all price touchpoints.', goal: 'Stay consistent.', outcome: 'Website, menu, quote template updated.' },
    { task: 'Train staff on the new pitch.', goal: 'Deliver confidently.', outcome: 'A short value script.' },
    { task: 'Communicate the change to customers.', goal: 'Manage reaction.', outcome: 'A friendly announcement.' },
    { task: 'Monitor sales after 48h.', goal: 'Catch any shock.', outcome: 'Volume vs margin trade-off noted.' },
    { task: 'Adjust bundles for better margin.', goal: 'Improve mix.', outcome: 'Re-bundled best sellers.' },
  ],
  [
    { task: 'Review week-two sales data.', goal: 'See the real effect.', outcome: 'An updated margin picture.' },
    { task: 'Cut or reprice the lowest-margin item.', goal: 'Stop the leak.', outcome: 'One drain removed.' },
    { task: 'Test a premium option.', goal: 'Capture high intent.', outcome: 'A premium tier or add-on.' },
    { task: 'Add quantity/retainer discounts.', goal: 'Lift order value.', outcome: 'Volume pricing live.' },
    { task: 'Survey customers on perceived value.', goal: 'Justify your price.', outcome: 'Feedback to refine the story.' },
    { task: 'Refresh the tier descriptions.', goal: 'Make Best look obvious.', outcome: 'Sharper tier copy.' },
    { task: 'Measure average order value.', goal: 'Track the lever.', outcome: 'AOV before/after.' },
    { task: 'Fine-tune pricing based on results.', goal: 'Optimize.', outcome: 'One more price tweak applied.' },
  ],
  [
    { task: 'Run a small price-increase test.', goal: 'Reach the ceiling.', outcome: 'Test results documented.' },
    { task: 'Package a "value anchor" bundle.', goal: 'Make the high tier sell.', outcome: 'Anchor bundle live.' },
    { task: 'Publish a value explainer.', goal: 'Educate buyers.', outcome: 'A page/post on why you cost more.' },
    { task: 'Track margin % vs last month.', goal: 'Show the win.', outcome: 'Margin improvement %.' },
    { task: 'Collect testimonials at the new price.', goal: 'Validate.', outcome: '2 new reviews.' },
    { task: 'Review profitability per offer.', goal: 'Cut the long tail.', outcome: 'Retire the weakest offer.' },
    { task: 'Write your Month-2 pricing plan.', goal: 'Keep improving.', outcome: '3 next moves for next month.' },
  ],
]);

// =========================================================================
// Marketing (acquisition)
// =========================================================================
const MARKETING: RoadmapTemplate = tpl([
  [
    { task: 'Pick ONE ideal customer segment.', goal: 'Stop spreading thin.', outcome: 'A single target persona.' },
    { task: 'Define one clear offer.', goal: 'Make it irresistible.', outcome: 'A one-line offer statement.' },
    { task: 'Research where they hang out.', goal: 'Find the channel.', outcome: 'A shortlist of 2 channels.' },
    { task: 'Look at 3 competitor campaigns.', goal: 'Learn what works.', outcome: 'Notes on offers & messaging.' },
    { task: 'Draft your message.', goal: 'Say it simply.', outcome: 'Headline + call-to-action.' },
    { task: 'Set your first weekly goal.', goal: 'Be measurable.', outcome: 'e.g. 20 new leads this week.' },
    { task: 'Prepare a landing page / post.', goal: 'Have a place to send people.', outcome: 'A basic page or post live.' },
  ],
  [
    { task: 'Publish your offer.', goal: 'Put it out there.', outcome: 'Offer is live on your channel.' },
    { task: 'Launch a small paid test.', goal: 'Validate cheaply.', outcome: 'A small budget ad/test running.' },
    { task: 'Share on your top channel daily.', goal: 'Build consistency.', outcome: 'A post or update every day.' },
    { task: 'Respond to every comment/lead.', goal: 'Convert interest.', outcome: 'All replies answered within a day.' },
    { task: 'Capture every lead.', goal: 'Build your list.', outcome: 'A lead list / email list growing.' },
    { task: 'Follow up with interested leads.', goal: 'Turn interest into sales.', outcome: 'Follow-up messages sent.' },
    { task: 'Measure your first results.', goal: 'Learn fast.', outcome: 'Leads & cost per lead recorded.' },
    { task: 'Double down on what worked.', goal: 'Fuel the winner.', outcome: 'More budget/time to best channel.' },
  ],
  [
    { task: 'Review clicks and conversions.', goal: 'Find the drop-off.', outcome: 'The weak link identified.' },
    { task: 'Improve your landing page.', goal: 'Convert more.', outcome: 'A clearer headline + CTA.' },
    { task: 'Test a second message variant.', goal: 'Improve response.', outcome: 'A/B message in play.' },
    { task: 'Add a referral ask.', goal: 'Multiply reach.', outcome: 'A "share a friend" offer live.' },
    { task: 'Create a simple funnel.', goal: 'Automate follow-up.', outcome: 'A 3-step email follow-up.' },
    { task: 'Post a customer win.', goal: 'Use social proof.', outcome: '1 success story shared.' },
    { task: 'Check cost per lead.', goal: 'Manage budget.', outcome: 'CPL vs target noted.' },
    { task: 'Refine audience targeting.', goal: 'Reach the right people.', outcome: 'Better-targeted ads/posts.' },
  ],
  [
    { task: 'Scale your best channel.', goal: 'Increase volume.', outcome: 'Budget up on the winner.' },
    { task: 'Measure new customers this month.', goal: 'Quantify growth.', outcome: 'New customers count.' },
    { task: 'Ask new customers how they found you.', goal: 'Verify channels.', outcome: 'Source breakdown.' },
    { task: 'Share monthly results with your team.', goal: 'Keep momentum.', outcome: 'A short results update.' },
    { task: 'Create reusable content.', goal: 'Save future time.', outcome: '5 templates/posts banked.' },
    { task: 'Compare month start vs end.', goal: 'Show progress.', outcome: 'A before/after lead number.' },
    { task: 'Write your Month-2 marketing plan.', goal: 'Keep the funnel running.', outcome: '3 next moves for next month.' },
  ],
]);

// =========================================================================
// Digital (online presence / website)
// =========================================================================
const DIGITAL: RoadmapTemplate = tpl([
  [
    { task: 'Audit your top 5 pages.', goal: 'Find the leaks.', outcome: 'A list of problem pages.' },
    { task: 'Test your site speed.', goal: 'Remove friction.', outcome: 'Speed score recorded.' },
    { task: 'Clarify your homepage headline.', goal: 'Say what you do instantly.', outcome: 'A sharper first message.' },
    { task: 'Add a clear call-to-action.', goal: 'Tell people what to do.', outcome: 'A visible buy/book/Call button.' },
    { task: 'Check you look good on mobile.', goal: 'Support phone visitors.', outcome: 'A mobile pass done.' },
    { task: 'Collect your best reviews.', goal: 'Build trust.', outcome: '3–5 strong reviews gathered.' },
    { task: 'Plan your social cadence.', goal: 'Be consistent.', outcome: 'A weekly posting plan.' },
  ],
  [
    { task: 'Fix the most confusing page.', goal: 'Reduce drop-off.', outcome: 'One page rewritten.' },
    { task: 'Add reviews to your key pages.', goal: 'Leverage social proof.', outcome: 'Reviews visible near the CTA.' },
    { task: 'Speed up your slowest element.', goal: 'Cut load time.', outcome: 'A faster page.' },
    { task: 'Start posting daily.', goal: 'Build the habit.', outcome: 'One real update/day posted.' },
    { task: 'Answer comments and DMs.', goal: 'Engage your audience.', outcome: 'All replies handled.' },
    { task: 'Set up basic analytics.', goal: 'See what works.', outcome: 'Traffic tracking live.' },
    { task: 'Add a lead capture form.', goal: 'Turn visits into contacts.', outcome: 'A sign-up form / email capture.' },
    { task: 'Refresh your images.', goal: 'Look professional.', outcome: 'Real, fresh photos up.' },
  ],
  [
    { task: 'Review your analytics.', goal: 'Learn what converts.', outcome: 'Top pages identified.' },
    { task: 'Improve your slowest funnel step.', goal: 'Lift conversions.', outcome: 'A better checkout/form.' },
    { task: 'Test a new headline or CTA.', goal: 'Improve response.', outcome: 'A/B test running.' },
    { task: 'Grow your email list.', goal: 'Own your audience.', outcome: 'New subscribers added.' },
    { task: 'Post the content that worked.', goal: 'Double down.', outcome: 'More of your best content.' },
    { task: 'Add an FAQ / objection section.', goal: 'Answer doubts.', outcome: 'Key objections addressed.' },
    { task: 'Optimize for search basics.', goal: 'Get found.', outcome: 'Page titles/descriptions improved.' },
    { task: 'Measure conversion rate.', goal: 'Track the win.', outcome: 'Conversion % recorded.' },
  ],
  [
    { task: 'Celebrate and share a real result.', goal: 'Build credibility.', outcome: 'A post showing a win.' },
    { task: 'Create a welcome email sequence.', goal: 'Monetize the list.', outcome: 'A 3-email sequence live.' },
    { task: 'Review traffic this month.', goal: 'Quantify growth.', outcome: 'Visitors vs last month.' },
    { task: 'Add a referral/review reminder.', goal: 'Automate trust.', outcome: 'Auto review ask live.' },
    { task: 'Refresh your about/trust page.', goal: 'Humanize the brand.', outcome: 'A stronger story page.' },
    { task: 'Compare conversion vs start of month.', goal: 'Show improvement.', outcome: 'Before/after number.' },
    { task: 'Write your Month-2 digital plan.', goal: 'Keep improving.', outcome: '3 next moves for next month.' },
  ],
]);

// =========================================================================
// Operations (automation / time-saving)
// =========================================================================
const OPERATIONS: RoadmapTemplate = tpl([
  [
    { task: 'List your top 5 repetitive tasks.', goal: 'Find the time sinks.', outcome: 'A task inventory.' },
    { task: 'Estimate hours per week on each.', goal: 'Prioritize the win.', outcome: 'Time saved potential ranked.' },
    { task: 'Find one free automation tool.', goal: 'Get started cheaply.', outcome: 'Tool chosen and signed up.' },
    { task: 'Map the manual process.', goal: 'Understand the steps.', outcome: 'A step-by-step process map.' },
    { task: 'Identify where errors happen.', goal: 'Fix the weak spot.', outcome: 'The error-prone step flagged.' },
    { task: 'Set up automatic reminders.', goal: 'Start with easy wins.', outcome: 'Reminder automation live.' },
    { task: 'Draft a repeatable template.', goal: 'Stop starting from scratch.', outcome: 'A reuse-ready template.' },
  ],
  [
    { task: 'Automate your #1 task.', goal: 'Win back hours.', outcome: 'First task automated.' },
    { task: 'Automate your #2 task.', goal: 'Keep the momentum.', outcome: 'Second task automated.' },
    { task: 'Set up auto-replies for inquiries.', goal: 'Respond faster.', outcome: 'Instant reply active.' },
    { task: 'Automate booking / scheduling.', goal: 'Cut the back-and-forth.', outcome: 'Self-serve booking live.' },
    { task: 'Automate follow-ups.', goal: 'Never drop a lead.', outcome: 'Follow-up sequence running.' },
    { task: 'Switch to a shared calendar/board.', goal: 'Stay organized.', outcome: 'Team tasks in one place.' },
    { task: 'Back up your key data.', goal: 'Protect the business.', outcome: 'Automated backup on.' },
    { task: 'Track hours saved this week.', goal: 'See the payoff.', outcome: 'Hours-saved figure.' },
  ],
  [
    { task: 'Review automated workflows.', goal: 'Fix the rough edges.', outcome: 'Workflows refined.' },
    { task: 'Automate your #3 task.', goal: 'Keep chipping away.', outcome: 'Third task automated.' },
    { task: 'Add a QA step for automation.', goal: 'Catch errors.', outcome: 'A simple check in place.' },
    { task: 'Cut one manual report.', goal: 'Reduce busywork.', outcome: 'One report automated/deleted.' },
    { task: 'Create SOPs (one page each).', goal: 'Make it repeatable.', outcome: '2–3 short SOPs written.' },
    { task: 'Delegate a low-value task.', goal: 'Use your time better.', outcome: 'A task handed off.' },
    { task: 'Invoice / bill automatically.', goal: 'Get paid faster.', outcome: 'Auto-billing configured.' },
    { task: 'Sum hours saved to date.', goal: 'Quantify the win.', outcome: 'Total hours saved.' },
  ],
  [
    { task: 'Measure your added capacity.', goal: 'See the headroom.', outcome: 'Capacity / hours freed.' },
    { task: 'Reinvest saved time in sales.', goal: 'Turn time into revenue.', outcome: 'Sales work time added.' },
    { task: 'Review for new bottlenecks.', goal: 'Keep scaling.', outcome: 'Next bottleneck found.' },
    { task: 'Document your system for the team.', goal: 'Make it stick.', outcome: 'Systems doc shared.' },
    { task: 'Check automation error rate.', goal: 'Keep it reliable.', outcome: 'Error rate low/recorded.' },
    { task: 'Compare productivity vs month start.', goal: 'Show progress.', outcome: 'Before/after time use.' },
    { task: 'Write your Month-2 operations plan.', goal: 'Keep optimizing.', outcome: '3 next moves for next month.' },
  ],
]);

// =========================================================================
// Revenue (upsell / average order value)
// =========================================================================
const REVENUE: RoadmapTemplate = tpl([
  [
    { task: 'List your most-loved add-ons.', goal: 'Find the upsell gold.', outcome: 'A shortlist of add-ons.' },
    { task: 'Review your average order value.', goal: 'Know your baseline.', outcome: 'AOV baseline recorded.' },
    { task: 'Pick 2 upsell/cross-sell offers.', goal: 'Keep it simple.', outcome: 'Two offers chosen.' },
    { task: 'Price the add-ons.', goal: 'Make them attractive.', outcome: 'Clear add-on pricing.' },
    { task: 'Write a natural upsell script.', goal: 'Make it feel easy.', outcome: 'A short staff script.' },
    { task: 'Add bundles/combos.', goal: 'Increase value per sale.', outcome: 'A bundle product live.' },
    { task: 'Map where to offer the upsell.', goal: 'Hit the right moment.', outcome: 'Insertion points listed.' },
  ],
  [
    { task: 'Launch your first upsell offer.', goal: 'Get it live.', outcome: 'Add-on/upsell active.' },
    { task: 'Coach your team with the script.', goal: 'Deliver consistently.', outcome: 'Team trained.' },
    { task: 'Add the bundle to checkout.', goal: 'Increase order value.', outcome: 'Bundle offered at checkout.' },
    { task: 'Create a "complete the order" email.', goal: 'Recover abandoned value.', outcome: 'Abandoned-cart/refill email sent.' },
    { task: 'Track your upsell rate.', goal: 'Measure adoption.', outcome: 'Upsell % recorded.' },
    { task: 'Add a loyalty/incentive nudge.', goal: 'Reward bigger orders.', outcome: 'A spend reward live.' },
    { task: 'Test a minimum-order offer.', goal: 'Lift order size.', outcome: 'Threshold offer live.' },
    { task: 'Review which upsell converts best.', goal: 'Find the winner.', outcome: 'Top-performing upsell noted.' },
  ],
  [
    { task: 'Cut the upsell that flops.', goal: 'Remove waste.', outcome: 'Weak offer removed.' },
    { task: 'Double down on the winner.', goal: 'Scale what works.', outcome: 'Winning upsell promoted.' },
    { task: 'Add a premium tier to your best offer.', goal: 'Capture more value.', outcome: 'Premium option live.' },
    { task: 'Bundle your top 3 add-ons.', goal: 'Make the big-ticket easy.', outcome: 'A signature bundle.' },
    { task: 'Personalize upsells by segment.', goal: 'Make them relevant.', outcome: 'Segment-based offers.' },
    { task: 'Add a post-purchase upsell.', goal: 'Sell at the right time.', outcome: 'Post-purchase offer live.' },
    { task: 'Measure AOV again.', goal: 'Show the lift.', outcome: 'Updated AOV.' },
    { task: 'Test a small price anchor.', goal: 'Boost perceived value.', outcome: 'Anchor comparison live.' },
  ],
  [
    { task: 'Share your best results.', goal: 'Build team confidence.', outcome: 'A win shared.' },
    { task: 'Track revenue per customer.', goal: 'Quantify the gain.', outcome: 'Revenue/customer before/after.' },
    { task: 'Celebrate your top sellers.', goal: 'Reinforce behavior.', outcome: 'Top sellers recognized.' },
    { task: 'Automate the winning upsell.', goal: 'Save effort.', outcome: 'Upsell automated.' },
    { task: 'Survey customers on add-ons.', goal: 'Find new ideas.', outcome: 'New add-on ideas.' },
    { task: 'Compare month revenue vs last.', goal: 'Show total impact.', outcome: 'AOV & revenue delta noted.' },
    { task: 'Write your Month-2 revenue plan.', goal: 'Keep growing value.', outcome: '3 next moves for next month.' },
  ],
]);

// =========================================================================
// Strategy (positioning / clarity)
// =========================================================================
const STRATEGY: RoadmapTemplate = tpl([
  [
    { task: 'Write who you serve + the result you deliver.', goal: 'Crystallize the offer.', outcome: 'A one-sentence position.' },
    { task: 'Research your ideal customer.', goal: 'Know them deeply.', outcome: 'A customer profile.' },
    { task: 'Review your top 3 competitors.', goal: 'Find the gap.', outcome: 'A differentiation note.' },
    { task: 'Audit your current messaging.', goal: 'Spot the confusion.', outcome: 'Where the message is scattered.' },
    { task: 'Define your #1 value promise.', goal: 'Keep it focused.', outcome: 'A single core promise.' },
    { task: 'Map your 3-stage customer journey.', goal: 'See the path.', outcome: 'Awareness → decision → retention map.' },
    { task: 'Set a clear 30-day goal.', goal: 'Give the month a target.', outcome: 'One measurable goal.' },
  ],
  [
    { task: 'Rewrite your homepage headline.', goal: 'Match the position.', outcome: 'New headline live.' },
    { task: 'Update your about / intro.', goal: 'Tell the story.', outcome: 'A stronger intro.' },
    { task: 'Align your offers to the promise.', goal: 'Back it up.', outcome: 'Offers support the position.' },
    { task: 'Launch a positioning asset.', goal: 'Share the message.', outcome: 'A post/page communicating it.' },
    { task: 'Test the message with 5 customers.', goal: 'Validate.', outcome: 'Real feedback gathered.' },
    { task: 'Refine based on feedback.', goal: 'Sharpen the message.', outcome: 'Messaging tweaked.' },
    { task: 'Make your CTA match the promise.', goal: 'Guide the next step.', outcome: 'Clear, aligned CTA.' },
    { task: 'Update your bios and profiles.', goal: 'Be consistent everywhere.', outcome: 'Profiles aligned.' },
  ],
  [
    { task: 'Review what resonates.', goal: 'Double down.', outcome: 'Winning messages noted.' },
    { task: 'Narrow your audience focus.', goal: 'Go deeper, not broader.', outcome: 'A tighter target.' },
    { task: 'Remove one off-message offer.', goal: 'Reduce clutter.', outcome: 'One distraction removed.' },
    { task: 'Create a credibility asset.', goal: 'Prove it.', outcome: 'A case study or testimonial.' },
    { task: 'Share your position consistently.', goal: 'Build recognition.', outcome: 'Consistent weekly content.' },
    { task: 'Measure brand recall / enquiries.', goal: 'Track awareness.', outcome: 'Enquiries/recall noted.' },
    { task: 'Refine your service depth.', goal: 'Focus effort.', outcome: 'A clear "what we do best".' },
    { task: 'Test one new premium offer.', goal: 'Raise ambition.', outcome: 'A bold offer tested.' },
  ],
  [
    { task: 'Showcase your refined position.', goal: 'Make it public.', outcome: 'A launch/reveal post.' },
    { task: 'Re-ask your 5 customer voices.', goal: 'Confirm the clarity.', outcome: 'Positive validation.' },
    { task: 'Measure progress toward your goal.', goal: 'Prove the shift.', outcome: 'Goal progress noted.' },
    { task: 'Turn your position into a product name.', goal: 'Simplify the offer.', outcome: 'A memorable offer name.' },
    { task: 'Collect a new testimonial.', goal: 'Lock in proof.', outcome: '1 fresh review.' },
    { task: 'Compare month-start vs end message.', goal: 'See the clarity win.', outcome: 'A crisper brand.' },
    { task: 'Write your Month-2 positioning plan.', goal: 'Keep reinforcing.', outcome: '3 next moves for next month.' },
  ],
]);

// =========================================================================
// Conversion (local / e-commerce funnels) — hybrid of marketing + digital
// =========================================================================
const CONVERSION: RoadmapTemplate = tpl([
  [
    { task: 'Map your current funnel.', goal: 'See where you lose people.', outcome: 'Awareness → sale funnel map.' },
    { task: 'Find your biggest drop-off point.', goal: 'Target the leak.', outcome: 'The weak funnel step.' },
    { task: 'Test your checkout / booking speed.', goal: 'Remove friction.', outcome: 'Speed/UX assessment.' },
    { task: 'Audit your trust signals.', goal: 'Build confidence.', outcome: 'Reviews/guarantees listed.' },
    { task: 'Set a conversion baseline.', goal: 'Know where you start.', outcome: 'Current conversion %.' },
    { task: 'Draft a stronger call-to-action.', goal: 'Tell people what to do.', outcome: 'A clear next step.' },
    { task: 'Prepare a simple landing page.', goal: 'Focus the offer.', outcome: 'A dedicated page/post.' },
  ],
  [
    { task: 'Reduce friction at the top drop-off.', goal: 'Keep more people.', outcome: 'One friction point fixed.' },
    { task: 'Add clear trust signals near the CTA.', goal: 'Lower hesitation.', outcome: 'Reviews/guarantee visible.' },
    { task: 'Start capturing leads early.', goal: 'Don’t lose visitors.', outcome: 'A lead-capture live.' },
    { task: 'Launch an abandoned-cart reminder.', goal: 'Recover lost sales.', outcome: 'Recovery email/text live.' },
    { task: 'Offer a low-risk trial/discount.', goal: 'Lower the barrier.', outcome: 'First-time incentive live.' },
    { task: 'Follow up warm leads within 24h.', goal: 'Strike while hot.', outcome: 'Fast follow-ups sent.' },
    { task: 'Track conversion daily.', goal: 'See changes fast.', outcome: 'A simple conversion log.' },
    { task: 'Simplify your form/checkout.', goal: 'Cut the steps.', outcome: 'Fewer required fields.' },
  ],
  [
    { task: 'Review conversion analytics.', goal: 'Find what moved.', outcome: 'Winning changes identified.' },
    { task: 'A/B test your headline/CTA.', goal: 'Improve response.', outcome: 'A test in flight.' },
    { task: 'Add social proof to the funnel.', goal: 'Convert skeptics.', outcome: 'Testimonials added.' },
    { task: 'Create an urgency/social hook.', goal: 'Encourage action.', outcome: 'A time-bound offer.' },
    { task: 'Improve your post-purchase ask.', goal: 'Build repeat.', outcome: 'A thank-you/repeat offer.' },
    { task: 'Refine your audience targeting.', goal: 'Attract hotter leads.', outcome: 'Better targeting.' },
    { task: 'Measure conversion again.', goal: 'Quantify the lift.', outcome: 'Updated conversion %.' },
    { task: 'Remove a low-value step.', goal: 'Shorten the path.', outcome: 'A step removed.' },
  ],
  [
    { task: 'Scale the winning variation.', goal: 'Amplify the win.', outcome: 'Winning version promoted.' },
    { task: 'Track new-conversion rate vs baseline.', goal: 'Show progress.', outcome: 'Before/after conversion.' },
    { task: 'Add a referral-to-funnel loop.', goal: 'Compound growth.', outcome: 'Referral loop live.' },
    { task: 'Automate the reminder sequence.', goal: 'Run hands-free.', outcome: 'Automation active.' },
    { task: 'Share a conversion win publicly.', goal: 'Build momentum.', outcome: 'A results post.' },
    { task: 'Compare month start vs end.', goal: 'Close the loop.', outcome: 'A full-month summary.' },
    { task: 'Write your Month-2 conversion plan.', goal: 'Keep improving.', outcome: '3 next moves for next month.' },
  ],
]);

// Default fallback roadmap (mixes the fundamental growth levers).
const DEFAULT: RoadmapTemplate = tpl([
  [
    { task: 'Refresh what you know about your customers.', goal: 'Start from reality.', outcome: 'A short customer snapshot.' },
    { task: 'Set one clear 30-day goal.', goal: 'Give the month direction.', outcome: 'One measurable target.' },
    { task: 'Pick your #1 growth lever.', goal: 'Focus, don’t scatter.', outcome: 'One lever chosen.' },
    { task: 'Review your numbers.', goal: 'Know your baseline.', outcome: 'Key metric baseline.' },
    { task: 'Check what your customers say.', goal: 'Find quick wins.', outcome: 'Feedback notes.' },
    { task: 'Plan your first week’s actions.', goal: 'Be concrete.', outcome: 'A 7-day task list.' },
    { task: 'Prepare the tools you need.', goal: 'Remove blockers.', outcome: 'Tools ready.' },
  ],
  [
    { task: 'Start executing week one.', goal: 'Take action.', outcome: 'Tasks underway.' },
    { task: 'Take the #1 quick win.', goal: 'Get momentum.', outcome: 'One win completed.' },
    { task: 'Track progress daily.', goal: 'Stay honest.', outcome: 'Progress logged.' },
    { task: 'Adjust based on early signals.', goal: 'Learn fast.', outcome: 'One change applied.' },
    { task: 'Ask a customer for feedback.', goal: 'Stay close.', outcome: 'Fresh input.' },
    { task: 'Ship the core improvement.', goal: 'Make it real.', outcome: 'Improvement live.' },
    { task: 'Communicate progress.', goal: 'Stay accountable.', outcome: 'A status update.' },
    { task: 'Review the week.', goal: 'Reflect.', outcome: 'Wins + lessons noted.' },
  ],
  [
    { task: 'Double down on what worked.', goal: 'Scale the win.', outcome: 'Winner amplified.' },
    { task: 'Cut what didn’t.', goal: 'Reduce waste.', outcome: 'Weak effort dropped.' },
    { task: 'Refine your approach.', goal: 'Improve quality.', outcome: 'Process improved.' },
    { task: 'Add a measurement.', goal: 'See the impact.', outcome: 'Metric tracking added.' },
    { task: 'Test one new idea.', goal: 'Stay fresh.', outcome: 'A mini experiment live.' },
    { task: 'Involve your team/customers.', goal: 'Gather support.', outcome: 'Others engaged.' },
    { task: 'Remove a blocker.', goal: 'Unblock yourself.', outcome: 'A friction removed.' },
    { task: 'Check your baseline metric.', goal: 'Track change.', outcome: 'Metric vs baseline.' },
  ],
  [
    { task: 'Push for the final stretch.', goal: 'Close strong.', outcome: 'Strong week.' },
    { task: 'Measure your 30-day goal.', goal: 'Show the result.', outcome: 'Goal progress %.' },
    { task: 'Document what you learned.', goal: 'Capture insights.', outcome: 'A lessons note.' },
    { task: 'Gather one testimonial.', goal: 'Keep proof.', outcome: 'A fresh review.' },
    { task: 'Share your results.', goal: 'Build momentum.', outcome: 'A results update.' },
    { task: 'Compare month start vs end.', goal: 'Quantify growth.', outcome: 'A before/after number.' },
    { task: 'Write your Month-2 plan.', goal: 'Keep going.', outcome: '3 next steps.' },
  ],
]);

// Map a strategy category (e.g. 'Retention', 'Pricing') to a roadmap key.
const CATEGORY_KEY: Record<string, string> = {
  Retention: 'retention',
  Loyalty: 'retention',
  Pricing: 'pricing',
  Marketing: 'marketing',
  Acquisition: 'marketing',
  Digital: 'digital',
  Operations: 'operations',
  Revenue: 'revenue',
  Strategy: 'strategy',
  Conversion: 'conversion',
  'Conversion Rate': 'conversion',
};

const TEMPLATES: Record<string, RoadmapTemplate> = {
  retention: RETENTION,
  pricing: PRICING,
  marketing: MARKETING,
  digital: DIGITAL,
  operations: OPERATIONS,
  revenue: REVENUE,
  strategy: STRATEGY,
  conversion: CONVERSION,
  default: DEFAULT,
};

/**
 * Resolve the roadmap template for a strategy category. Unknown categories
 * gracefully fall back to the default template so selection never breaks.
 */
export function getRoadmapTemplate(category: string | undefined): RoadmapTemplate {
  const key = CATEGORY_KEY[category ?? ''] ?? 'default';
  return TEMPLATES[key] ?? DEFAULT;
}
