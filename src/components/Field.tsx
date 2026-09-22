import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FieldWrapProps {
  label: string;
}

export function TextField({
  label,
  className,
  ...rest
}: FieldWrapProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="gk-field">
      <label className="gk-field__label">{label}</label>
      <input className={['gk-field__control', className].filter(Boolean).join(' ')} {...rest} />
    </div>
  );
}

export function TextAreaField({
  label,
  className,
  ...rest
}: FieldWrapProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="gk-field">
      <label className="gk-field__label">{label}</label>
      <textarea className={['gk-field__control', className].filter(Boolean).join(' ')} {...rest} />
    </div>
  );
}
