import { accentColor, type Accent } from '../theme';

export interface CheckboxProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  accent?: Accent;
  disabled?: boolean;
}

export function Checkbox({ checked, onChange, label, accent = 'gouache', disabled }: CheckboxProps) {
  if (disabled) {
    return (
      <span className="gk-control gk-control--disabled">
        <span className="gk-checkbox gk-checkbox--locked" />
        <span className="gk-control__label">{label}</span>
      </span>
    );
  }
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className="gk-control"
      onClick={() => onChange(!checked)}
    >
      <span
        className="gk-checkbox"
        style={{ backgroundColor: checked ? accentColor(accent) : 'transparent' }}
      />
      <span className="gk-control__label">{label}</span>
    </button>
  );
}
