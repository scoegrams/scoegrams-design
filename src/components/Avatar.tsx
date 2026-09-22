import { colors } from '../theme';

export interface AvatarProps {
  initials: string;
  tone?: 'pine' | 'cobalt';
}

const FILLS = {
  pine: { bg: colors.pine, fg: colors.creamAlt },
  cobalt: { bg: colors.cobalt, fg: colors.cream },
};

export function Avatar({ initials, tone = 'pine' }: AvatarProps) {
  const { bg, fg } = FILLS[tone];
  return (
    <div className="gk-avatar" style={{ backgroundColor: bg, color: fg }}>
      {initials}
    </div>
  );
}

export function AvatarAdd() {
  return <div className="gk-avatar gk-avatar--add">+</div>;
}
