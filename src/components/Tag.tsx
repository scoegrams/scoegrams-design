import type { ReactNode } from 'react';
import { colors } from '../theme';

export type TagTone = 'gouache' | 'cobalt' | 'pine' | 'outline';

export interface TagProps {
  tone?: TagTone;
  children: ReactNode;
}

const FILLS: Record<Exclude<TagTone, 'outline'>, { bg: string; fg: string }> = {
  gouache: { bg: colors.gouache, fg: colors.cream },
  cobalt: { bg: colors.cobalt, fg: colors.cream },
  pine: { bg: colors.pine, fg: colors.creamAlt },
};

export function Tag({ tone = 'gouache', children }: TagProps) {
  if (tone === 'outline') {
    return <span className="gk-tag gk-tag--outline">{children}</span>;
  }
  const { bg, fg } = FILLS[tone];
  return (
    <span className="gk-tag" style={{ backgroundColor: bg, color: fg }}>
      {children}
    </span>
  );
}
