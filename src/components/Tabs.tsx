import { accentColor, type Accent } from '../theme';

export interface TabsProps {
  labels: string[];
  active: number;
  onSelect: (index: number) => void;
  accent?: Accent;
}

export function Tabs({ labels, active, onSelect, accent = 'gouache' }: TabsProps) {
  return (
    <div className="gk-tabs">
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          className="gk-tab"
          onClick={() => onSelect(i)}
          style={{
            color: active === i ? '#2A2018' : '#A5988A',
            borderBottomColor: active === i ? accentColor(accent) : 'transparent',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
