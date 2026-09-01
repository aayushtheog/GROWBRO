import { useEffect, useRef, useState } from 'react';
import { Bot, Eraser, Sparkles, Info, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBusinessStore } from '../store/businessStore';
import { useToastStore } from '../store/toastStore';
import { getAiResponse, isAiConfigured } from '../lib/ai';
import { ChatBubble } from '../components/chat/ChatBubble';
import { ChatInput } from '../components/chat/ChatInput';
import { InlineLoader } from '../components/ui/Spinner';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export function ChatPage() {
  const store = useBusinessStore();
  const notify = useToastStore((s) => s.notify);
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const aiLive = isAiConfigured();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [store.chat.length, thinking]);

  const handleSend = async (text: string) => {
    if (thinking) return;
    store.addChatMessage({ role: 'user', content: text });
    setThinking(true);

    // Give the UI a beat to render the user message + typing indicator.
    await new Promise((r) => setTimeout(r, 60));

    try {
      const res = await getAiResponse(text, store.profile, store.chat, {
        objective: store.plan,
      });
      store.addChatMessage({
        role: 'assistant',
        content: res.message,
        solution: res.solution,
      });
      if (!aiLive) {
        console.info('[growbro] Using built-in growth engine (no API key configured).');
      }
    } catch (err) {
      console.error('[growbro] Chat error:', err);
      notify({
        type: 'error',
        title: 'Something went wrong',
        description: 'I could not generate a response. Please try again.',
      });
    } finally {
      setThinking(false);
    }
  };

  const clearHistory = () => {
    store.clearChat();
    notify({ type: 'info', title: 'Conversation cleared' });
  };

  // When a solution comes back with strategies, allow adding to plan.
  const handleAddToPlan = (solution: { strategies: any[]; problem?: string }) => {
    const topStrategy = solution.strategies[0];
    if (!topStrategy) return;
    store.addStrategyToPlan(topStrategy, solution.problem);
    notify({ type: 'success', title: 'Added to your plan', description: `“${topStrategy.title}” is now your plan.` });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-card">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">GrowBro Chat</h2>
              <Badge tone={aiLive ? 'success' : 'neutral'}>
                {aiLive ? 'Live AI' : 'Demo engine'}
              </Badge>
            </div>
            <p className="text-sm text-slate-500">
              Ask any business question — I'll give you practical strategies and next steps.
            </p>
          </div>
        </div>
        <button
          onClick={clearHistory}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <Eraser className="h-4 w-4" /> Clear
        </button>
      </motion.div>

      {!aiLive && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <p>
            <strong>Demo mode:</strong> no AI key is set, so I'm using GrowBro's built-in growth
            engine. Add an <code className="rounded bg-white px-1">ANTHROPIC_API_KEY</code> to{' '}
            <code className="rounded bg-white px-1">.env.local</code> to enable live AI responses.
          </p>
        </div>
      )}

      {/* Context hint if user has an active plan */}
      {store.plan && (
        <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-5 w-5 text-brand-600" />
            <div>
              <p className="font-semibold text-slate-800">You have an active plan</p>
              <p className="mt-0.5 text-sm text-slate-600">
                Objective: <span className="font-medium">{store.plan.objective}</span>
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => (window.location.href = '/plan')}
              >
                <ListChecks className="h-3.5 w-3.5" /> View my plan
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 shadow-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {store.chat.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              onAddToPlan={handleAddToPlan}
            />
          ))}
          {thinking && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <InlineLoader label="Thinking…" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <ChatInput onSubmit={handleSend} disabled={thinking} />
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
        <Sparkles className="h-3.5 w-3.5 text-brand-500" />
        GrowBro's advice is general guidance based on your description — always validate before
        major decisions.
      </p>
    </div>
  );
}