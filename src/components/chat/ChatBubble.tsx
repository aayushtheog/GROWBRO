import { Bot, User, ArrowRight, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ChatMessage, AiSolution } from '../../types';
import { AiSolutionView } from './AiSolutionView';
import { Button } from '../ui/Button';

interface ChatBubbleProps {
  message: ChatMessage;
  onAddToPlan?: (solution: AiSolution) => void;
}

export function ChatBubble({ message, onAddToPlan }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white'
            : 'bg-slate-200 text-slate-600'
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div className={`flex max-w-[78%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'rounded-tr-md bg-brand-600 text-white'
              : 'rounded-tl-md border border-slate-200 bg-white text-slate-700'
          }`}
        >
          {/* render markdown-ish bold segments */}
          <ChatText text={message.content} isUser={isUser} />
        </div>

        {message.solution && <AiSolutionView solution={message.solution} onAddToPlan={onAddToPlan} />}

        <span className="mt-1 px-1 text-[10px] text-slate-400">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </span>
      </div>
    </motion.div>
  );
}

// Tiny markdown-ish renderer: bold **text**, line breaks.
function ChatText({ text, isUser }: { text: string; isUser: boolean }) {
  const base = isUser ? 'text-white' : 'text-slate-700';
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={i} className="block">
          {splitBold(line).map((part, j) =>
            part.bold ? (
              <strong key={j} className={isUser ? 'font-bold text-white/95' : 'font-bold text-slate-900'}>
                {part.text}
              </strong>
            ) : (
              <span key={j} className={base}>
                {part.text}
              </span>
            ),
          )}
        </span>
      ))}
    </>
  );
}

function splitBold(text: string): { text: string; bold: boolean }[] {
  const parts: { text: string; bold: boolean }[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), bold: false });
    parts.push({ text: m[1], bold: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), bold: false });
  if (parts.length === 0) parts.push({ text, bold: false });
  return parts;
}
