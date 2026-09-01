import { createContext, useContext, useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';

const FieldIdContext = createContext<string | undefined>(undefined);

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ label, hint, error, className = '', children }: FieldProps) {
  const id = useId();
  return (
    <FieldIdContext.Provider value={id}>
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        {children}
        {hint && !error && <span className="text-xs text-slate-400">{hint}</span>}
        {error && <span className="text-xs text-rose-600">{error}</span>}
      </div>
    </FieldIdContext.Provider>
  );
}

const baseInput =
  'w-full h-11 rounded-xl border bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 disabled:bg-slate-50';

const stateClasses = (invalid: boolean) =>
  invalid
    ? 'border-rose-400 focus:ring-rose-200'
    : 'border-slate-300 focus:ring-brand-200 focus:border-brand-400';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}
export function TextInput({ invalid = false, className = '', ...props }: TextInputProps) {
  const id = useContext(FieldIdContext);
  return (
    <input id={id} {...props} className={`${baseInput} ${stateClasses(invalid)} ${className}`} />
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}
export function TextArea({ invalid = false, className = '', ...props }: TextAreaProps) {
  const id = useContext(FieldIdContext);
  return (
    <textarea
      id={id}
      {...props}
      className={`${baseInput} h-auto min-h-[88px] py-2.5 resize-y ${stateClasses(invalid)} ${className}`}
    />
  );
}
