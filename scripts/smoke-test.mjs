// Runtime smoke test for the core logic engine (pure TS, no browser needed).
import { analyzeBusiness, summarizeProfile } from '../src/lib/businessLogic';
import { buildLocalSolution } from '../src/lib/ai';
import { DEMO_PROFILE } from '../src/data/demoBusiness';
import { GROWTH_TIPS, CASE_STUDIES } from '../src/data/content';
import { formatCurrency } from '../src/lib/format';

let pass = 0;
const fail = [];

function check(name, cond, extra = '') {
  if (cond) pass++;
  else fail.push(`${name} ${extra}`);
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name} ${extra}`);
}

// 1. Analysis on the demo profile detects problems and strategies.
const result = analyzeBusiness(DEMO_PROFILE);
check('analysis finds problems', result.problems.length >= 2, `(${result.problems.length} problems)`);
check('analysis maps to strategies', result.strategies.length >= 2, `(${result.strategies.length} strategies)`);
const inferred = result.problems.filter((p) => p.source === 'inferred');
check('loyalty problem flagged from demo profile', inferred.some((p) => /retention|loyal/i.test(p.title)));
check(
  'intensity: severity values valid',
  result.problems.every((p) => ['high', 'medium', 'low'].includes(p.severity)),
);

// 2. Chat fallback produces a full structured solution.
const chat = buildLocalSolution('We have low repeat customers and thin margins.', DEMO_PROFILE);
check('chat solution has message', chat.message.length > 0);
check('chat solution has strategies', chat.solution.strategies.length >= 1);
check('chat solution has next steps', chat.solution.nextSteps.length >= 1);

// 3. Content library non-empty.
check('case studies exist', CASE_STUDIES.length >= 3);
check('growth tips exist', GROWTH_TIPS.length >= 4);

// 4. Formatters.
check('currency formatted', formatCurrency(48300) === '$48,300');
check('compact currency', formatCurrency(48300, true) === '$48.3K');

console.log(`\n${pass} passed, ${fail.length} failed`);
if (fail.length) {
  console.log(fail.join('\n'));
  process.exit(1);
}
