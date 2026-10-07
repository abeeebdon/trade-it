'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/utils';

/* ─────────────────────────────── Button ─────────────────────────────── */

type ToolbarButtonProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
  className,
  style,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      style={style}
      // Keep the editor selection intact when a toolbar control is pressed.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn(
        'inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5',
        'text-sm font-medium text-text/80 transition-colors outline-none',
        'hover:bg-secondary-dim hover:text-text',
        'focus-visible:ring-2 focus-visible:ring-primary/40',
        'disabled:pointer-events-none disabled:opacity-40',
        active && 'bg-secondary-dim text-secondary',
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────── Divider ─────────────────────────────── */

export function ToolbarDivider() {
  return <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-border" />;
}

/* ─────────────────────────────── Popover ─────────────────────────────── */

type ToolbarPopoverProps = {
  trigger: (args: { open: boolean; toggle: () => void }) => ReactNode;
  children: (args: { close: () => void }) => ReactNode;
  align?: 'start' | 'end';
  contentClassName?: string;
};

export function ToolbarPopover({
  trigger,
  children,
  align = 'start',
  contentClassName,
}: ToolbarPopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      {trigger({ open, toggle: () => setOpen((value) => !value) })}

      {open ? (
        <div
          className={cn(
            'absolute top-full z-50 mt-1.5 min-w-44 rounded-lg border border-border bg-bg p-1.5 shadow-lg',
            align === 'end' ? 'right-0' : 'left-0',
            contentClassName,
          )}
        >
          {children({ close: () => setOpen(false) })}
        </div>
      ) : null}
    </div>
  );
}

/* ───────────────────────────── Menu item ────────────────────────────── */

type ToolbarMenuItemProps = {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export function ToolbarMenuItem({
  active = false,
  disabled = false,
  onClick,
  children,
}: ToolbarMenuItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-text/85 transition-colors outline-none',
        'hover:bg-secondary-dim hover:text-text',
        'disabled:pointer-events-none disabled:opacity-40',
        active && 'bg-secondary-dim text-secondary',
      )}
    >
      {children}
    </button>
  );
}
