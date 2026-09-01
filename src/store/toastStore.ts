// Minimal toast notification store.

import { create } from 'zustand';
import type { ToastMessage } from '../types';
import { uid } from '../lib/storage';

interface ToastState {
  toasts: ToastMessage[];
  notify: (toast: Omit<ToastMessage, 'id'>) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  notify: (toast) => {
    const id = uid('toast');
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    setTimeout(() => get().dismiss(id), 4200);
  },

  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
