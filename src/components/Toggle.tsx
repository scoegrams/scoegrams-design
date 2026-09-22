import { accentColor, type Accent } from '../theme';

export interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  accent?: Accent;
}

export function Toggle({ checked, onChange, label, accent = 'gouache' }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className="gk-control"
      onClick={() => onChange(!checked)}
    >
      <span
        className="gk-switch"
        style={{ justifyContent: checked ? 'flex-end' : 'flex-start' }}
      >
        <span
          className="gk-switch__dot"
          style={{ backgroundColor: checked ? accentColor(accent) : '#C4B7A6' }}
        />
      </span>
      <span className="gk-control__label">{label}</span>
    </button>
  );
}
