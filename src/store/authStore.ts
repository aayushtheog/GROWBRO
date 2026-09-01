// Authentication state (demo flows). Persists the signed-in session so a
// reload keeps the user logged in. Credentials are validated against stored
// users (the demo account is seeded on first run).

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StoredUser, User } from '../types';
import { load, save } from '../lib/storage';
import { DEMO_USER } from '../data/demoUser';

const USERS_KEY = 'users';

interface AuthState {
  currentUser: User | null;
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signUp: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  signOut: () => void;
}

function getUsers(): StoredUser[] {
  return load<StoredUser[]>(USERS_KEY, []);
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,

      signIn: (email, password) => {
        const users = getUsers();
        const allUsers = users.some((u) => u.email === DEMO_USER.email)
          ? users
          : [DEMO_USER, ...users];

        const target = allUsers.find(
          (u) => u.email === normalizeEmail(email) && u.password === password,
        );

        if (!target) {
          // Distinguish "wrong password" from "no such account".
          const exists = allUsers.some((u) => u.email === normalizeEmail(email));
          return {
            ok: false,
            error: exists
              ? 'Incorrect password. Please try again.'
              : 'No account found with that email.',
          };
        }

        const { password: _pw, ...safe } = target;
        set({ currentUser: safe });
        return { ok: true };
      },

      signUp: (name, email, password) => {
        const normalized = normalizeEmail(email);
        const users = getUsers();
        if (users.some((u) => u.email === normalized)) {
          return { ok: false, error: 'An account with that email already exists.' };
        }
        const newUser: StoredUser = {
          id: `user_${Date.now().toString(36)}`,
          name: name.trim(),
          email: normalized,
          password,
        };
        save<StoredUser[]>(USERS_KEY, [newUser, ...users]);
        set({ currentUser: { id: newUser.id, name: newUser.name, email: newUser.email } });
        return { ok: true };
      },

      signOut: () => set({ currentUser: null }),
    }),
    { name: 'growbro:auth-session' },
  ),
);

// Re-expose under a stable name for convenience.
export const useAuth = useAuthStore;
