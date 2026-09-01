import type { StoredUser } from '../types';

// Seeded demo account so first-run exploration is instant.
export const DEMO_USER: StoredUser = {
  id: 'user_demo',
  name: 'Alex Rivera',
  email: 'demo@growbro.io',
  password: 'demo1234',
};

export const DEMO_CREDENTIALS = {
  email: DEMO_USER.email,
  password: DEMO_USER.password,
  hint: `Demo account — sign in with ${DEMO_USER.email} / ${DEMO_USER.password}`,
};
