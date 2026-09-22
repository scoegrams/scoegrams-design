import type { ButtonHTMLAttributes } from 'react';

export type ButtonTone = 'gouache' | 'cobalt' | 'quiet' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment. `gouache` is the primary painted fill. */
  tone?: ButtonTone;
}

const TONE_CLASS: Record<ButtonTone, string> = {
  gouache: 'gk-btn--primary',
  cobalt: 'gk-btn--cobalt',
  secondary: 'gk-btn--secondary',
  quiet: 'gk-btn--quiet',
};

export function Button({ tone = 'secondary', className, children, ...rest }: ButtonProps) {
  const cls = ['gk-btn', TONE_CLASS[tone], className].filter(Boolean).join(' ');
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
