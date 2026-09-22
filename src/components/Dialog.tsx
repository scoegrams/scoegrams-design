import type { ReactNode } from 'react';
import { Button } from './Button';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
}

export function Dialog({ open, onClose, eyebrow, title, children, confirmLabel, cancelLabel, onConfirm }: DialogProps) {
  if (!open) return null;
  return (
    <div className="gk-dialog-overlay" onClick={onClose}>
      <div className="gk-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="gk-dialog__eyebrow">{eyebrow}</div>
        <div className="gk-dialog__title">{title}</div>
        <p className="gk-dialog__body">{children}</p>
        <div className="gk-dialog__actions">
          <Button tone="gouache" onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button tone="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
