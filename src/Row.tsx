import type { ReactNode } from 'react';

export interface RowProps {
  index: string;
  label: string;
  children: ReactNode;
  /** Drops the bottom padding (used once content below needs its own top border with margin). */
  noBottomPadding?: boolean;
  /** Adds extra top margin, used by the free-standing sections after the Paper note. */
  spaced?: boolean;
}

export function Row({ index, label, children, noBottomPadding, spaced }: RowProps) {
  const style = {
    padding: noBottomPadding ? '42px 0 0' : '42px 0',
    marginTop: spaced ? 42 : undefined,
  };
  return (
    <div className="gk-row" style={style}>
      <div className="gk-row__label">
        {index}
        <br />
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}
