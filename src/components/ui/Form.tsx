import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  onPressEnter?: () => void;
}

const baseField =
  'w-full rounded-lg border border-ink-300 bg-white px-3.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:bg-ink-50 disabled:text-ink-400';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', id, onPressEnter, onKeyPress, ...props }, ref) => {
    const inputId = id || props.name;
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onPressEnter) onPressEnter();
      onKeyPress?.(e);
    };
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-semibold text-ink-800">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`${baseField} h-11 ${icon ? 'pl-10' : ''} ${error ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-500/20' : ''} ${className}`}
            onKeyPress={handleKeyPress}
            {...props}
          />
        </div>
        {error ? (
          <p className="mt-1 text-xs font-medium text-danger-600">{error}</p>
        ) : hint ? (
          <p className="mt-1 text-xs text-ink-400">{hint}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, className = '', id, children, ...props }, ref) => {
    const selectId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="mb-1.5 block text-sm font-semibold text-ink-800">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`${baseField} h-11 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%237d8c9c%22%20stroke-width%3D%222%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_0.75rem_center] bg-no-repeat pr-10 ${error ? 'border-danger-400' : ''} ${className}`}
          {...props}
        >
          {children}
        </select>
        {error && <p className="mt-1 text-xs font-medium text-danger-600">{error}</p>}
        {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const taId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={taId} className="mb-1.5 block text-sm font-semibold text-ink-800">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={taId}
          className={`${baseField} py-2.5 min-h-[88px] resize-y ${error ? 'border-danger-400' : ''} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs font-medium text-danger-600">{error}</p>}
        {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
