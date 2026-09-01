import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { SendHorizonal, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  'We have low repeat customers — what should I do?',
  'My profit margins are too thin. Any ideas?',
  'Our afternoons are dead quiet. How do I drive more sales?',
  'How do I get more new customers each week?',
];

export function ChatInput({ onSubmit, disabled }: { onSubmit: (text: string) => void; disabled: boolean }) {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue('');
    setShowSuggestions(false);
  };

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    submit(value);
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit(value);
    }
  };

  return (
    <div className="border-t border-slate-200 bg-white p-4">
      {showSuggestions && (
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => submit(s)}
              disabled={disabled}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100 disabled:opacity-50"
            >
              <Sparkles className="h-3 w-3" />
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleForm} className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
          disabled={disabled}
          placeholder="Describe a business problem… (Enter to send)"
          className="max-h-32 min-h-[44px] w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm transition-all hover:bg-brand-700 disabled:opacity-40 active:scale-95"
          aria-label="Send message"
        >
          <SendHorizonal className="h-5 w-5" />
        </button>
      </form>
      <p className="mt-2 text-center text-[11px] text-slate-400">
        GrowBro gives actionable advice, not financial, legal, or tax guidance.
      </p>
    </div>
  );
}
