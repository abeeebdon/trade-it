'use client';

import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Code2,
  Columns3,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Merge,
  Pilcrow,
  Plus,
  Quote,
  Redo2,
  Rows3,
  SplitSquareHorizontal,
  Strikethrough,
  Table as TableIcon,
  Trash2,
  Underline,
  Undo2,
  Video,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { menuBarStateSelector, type MenuBarState } from './MenubarState';
import {
  ToolbarButton,
  ToolbarDivider,
  ToolbarMenuItem,
  ToolbarPopover,
} from './ToolbarPrimitives';

type MenuBarProps = {
  editor: Editor;
  /** Whether the raw HTML source view is currently active. */
  showSource: boolean;
  onToggleSource: () => void;
};

/* ─────────────────────────── Options & swatches ────────────────────────── */

type BlockOption = {
  label: string;
  icon: ReactNode;
  active: (state: MenuBarState) => boolean;
  run: (editor: Editor) => void;
};

const headingIcon = (level: number) => (
  <span className="text-[10px] font-bold">H{level}</span>
);

const BLOCK_OPTIONS: BlockOption[] = [
  {
    label: 'Paragraph',
    icon: <Pilcrow className="size-3.5" />,
    active: (state) => state.isParagraph,
    run: (editor) => editor.chain().focus().setParagraph().run(),
  },
  {
    label: 'Heading 1',
    icon: headingIcon(1),
    active: (state) => state.isHeading1,
    run: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    label: 'Heading 2',
    icon: headingIcon(2),
    active: (state) => state.isHeading2,
    run: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    label: 'Heading 3',
    icon: headingIcon(3),
    active: (state) => state.isHeading3,
    run: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    label: 'Heading 4',
    icon: headingIcon(4),
    active: (state) => state.isHeading4,
    run: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run(),
  },
  {
    label: 'Bullet list',
    icon: <List className="size-3.5" />,
    active: (state) => state.isBulletList,
    run: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    label: 'Ordered list',
    icon: <ListOrdered className="size-3.5" />,
    active: (state) => state.isOrderedList,
    run: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    label: 'Quote',
    icon: <Quote className="size-3.5" />,
    active: (state) => state.isBlockquote,
    run: (editor) => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    label: 'Code block',
    icon: <Code2 className="size-3.5" />,
    active: (state) => state.isCodeBlock,
    run: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
];

const ALIGN_OPTIONS = [
  {
    value: 'left',
    label: 'Align left',
    icon: <AlignLeft className="size-4" />,
  },
  {
    value: 'center',
    label: 'Align center',
    icon: <AlignCenter className="size-4" />,
  },
  {
    value: 'right',
    label: 'Align right',
    icon: <AlignRight className="size-4" />,
  },
  {
    value: 'justify',
    label: 'Justify',
    icon: <AlignJustify className="size-4" />,
  },
] as const;

const COLOR_SWATCHES = [
  '#1f1b2e',
  '#6b6680',
  '#e74c3c',
  '#f39c12',
  '#c9922a',
  '#4a2e8a',
  '#1a7a6e',
  '#2e8b57',
  '#2563eb',
  '#9333ea',
  '#db2777',
  '#ffffff',
];

const fieldClass =
  'w-full rounded-md border border-border bg-bg px-2.5 py-1.5 text-sm text-text outline-none transition-colors focus:border-primary';

/* ────────────────────────────── Sub-forms ─────────────────────────────── */

function LinkForm({
  editor,
  initialUrl,
  close,
}: {
  editor: Editor;
  initialUrl: string;
  close: () => void;
}) {
  const [url, setUrl] = useState(initialUrl);

  const apply = () => {
    const href = url.trim();
    if (href) {
      editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
    close();
  };

  return (
    <form
      className="flex w-64 flex-col gap-2 p-1"
      onSubmit={(event) => {
        event.preventDefault();
        apply();
      }}
    >
      <input
        autoFocus
        type="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://example.com"
        className={fieldClass}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-md bg-primary px-2 py-1.5 text-xs font-semibold text-bg transition-opacity hover:opacity-90"
        >
          Apply link
        </button>
        {initialUrl ? (
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().extendMarkRange('link').unsetLink().run();
              close();
            }}
            className="rounded-md border border-border px-2 py-1.5 text-xs text-text transition-colors hover:bg-secondary-dim"
          >
            Remove
          </button>
        ) : null}
      </div>
    </form>
  );
}

function ImageForm({ editor, close }: { editor: Editor; close: () => void }) {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  const apply = () => {
    const src = url.trim();
    if (!src) return;
    editor
      .chain()
      .focus()
      .setImage({ src, alt: alt.trim() || undefined })
      .run();
    close();
  };

  return (
    <form
      className="flex w-64 flex-col gap-2 p-1"
      onSubmit={(event) => {
        event.preventDefault();
        apply();
      }}
    >
      <input
        autoFocus
        type="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="Image URL"
        className={fieldClass}
      />
      <input
        type="text"
        value={alt}
        onChange={(event) => setAlt(event.target.value)}
        placeholder="Alt text (optional)"
        className={fieldClass}
      />
      <button
        type="submit"
        className="rounded-md bg-primary px-2 py-1.5 text-xs font-semibold text-bg transition-opacity hover:opacity-90"
      >
        Insert image
      </button>
    </form>
  );
}

function VideoForm({ editor, close }: { editor: Editor; close: () => void }) {
  const [url, setUrl] = useState('');

  const apply = () => {
    const src = url.trim();
    if (!src) return;
    editor.commands.setYoutubeVideo({ src });
    close();
  };

  return (
    <form
      className="flex w-64 flex-col gap-2 p-1"
      onSubmit={(event) => {
        event.preventDefault();
        apply();
      }}
    >
      <input
        autoFocus
        type="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="YouTube URL"
        className={fieldClass}
      />
      <button
        type="submit"
        className="rounded-md bg-primary px-2 py-1.5 text-xs font-semibold text-bg transition-opacity hover:opacity-90"
      >
        Embed video
      </button>
    </form>
  );
}

function ColorPicker({
  editor,
  currentColor,
  close,
}: {
  editor: Editor;
  currentColor: string;
  close: () => void;
}) {
  const [custom, setCustom] = useState(currentColor || '#1f1b2e');

  const apply = (color: string) => {
    editor.chain().focus().setColor(color).run();
    close();
  };

  return (
    <div className="w-56 p-1">
      <div className="grid grid-cols-6 gap-1.5">
        {COLOR_SWATCHES.map((color) => (
          <button
            key={color}
            type="button"
            title={color}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => apply(color)}
            style={{ backgroundColor: color }}
            className={cn(
              'size-6 rounded-md border border-border transition-transform hover:scale-110',
              currentColor.toLowerCase() === color.toLowerCase() &&
                'ring-2 ring-primary',
            )}
          />
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 border-t border-border pt-2">
        <input
          type="color"
          value={custom}
          onChange={(event) => setCustom(event.target.value)}
          className="size-7 cursor-pointer rounded border border-border bg-transparent"
        />
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => apply(custom)}
          className="flex-1 rounded-md bg-secondary-dim px-2 py-1 text-xs font-medium text-text transition-colors hover:opacity-80"
        >
          Apply colour
        </button>
      </div>

      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          editor.chain().focus().unsetColor().run();
          close();
        }}
        className="mt-1 w-full rounded-md px-2 py-1 text-left text-xs text-muted transition-colors hover:bg-secondary-dim hover:text-text"
      >
        Remove colour
      </button>
    </div>
  );
}

function TableMenu({ editor, state }: { editor: Editor; state: MenuBarState }) {
  return (
    <ToolbarPopover
      contentClassName="w-52"
      trigger={({ open, toggle }) => (
        <ToolbarButton
          label="Table"
          active={open || state.isTable}
          onClick={toggle}
        >
          <TableIcon className="size-4" />
        </ToolbarButton>
      )}
    >
      {({ close }) => {
        const run = (command: () => void) => {
          command();
          close();
        };

        if (!state.isTable) {
          return (
            <ToolbarMenuItem
              onClick={() =>
                run(() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run(),
                )
              }
            >
              <TableIcon className="size-4 opacity-70" />
              Insert table (3 × 3)
            </ToolbarMenuItem>
          );
        }

        return (
          <div className="flex flex-col">
            <ToolbarMenuItem
              onClick={() =>
                run(() => editor.chain().focus().addRowBefore().run())
              }
            >
              <Plus className="size-4 opacity-70" />
              Add row above
            </ToolbarMenuItem>
            <ToolbarMenuItem
              onClick={() =>
                run(() => editor.chain().focus().addRowAfter().run())
              }
            >
              <Plus className="size-4 opacity-70" />
              Add row below
            </ToolbarMenuItem>
            <ToolbarMenuItem
              onClick={() =>
                run(() => editor.chain().focus().addColumnBefore().run())
              }
            >
              <Plus className="size-4 opacity-70" />
              Add column before
            </ToolbarMenuItem>
            <ToolbarMenuItem
              onClick={() =>
                run(() => editor.chain().focus().addColumnAfter().run())
              }
            >
              <Plus className="size-4 opacity-70" />
              Add column after
            </ToolbarMenuItem>

            <span aria-hidden className="my-1 h-px bg-border" />

            <ToolbarMenuItem
              onClick={() =>
                run(() => editor.chain().focus().toggleHeaderRow().run())
              }
            >
              <Rows3 className="size-4 opacity-70" />
              Toggle header row
            </ToolbarMenuItem>
            <ToolbarMenuItem
              disabled={!state.canMergeCells}
              onClick={() =>
                run(() => editor.chain().focus().mergeCells().run())
              }
            >
              <Merge className="size-4 opacity-70" />
              Merge cells
            </ToolbarMenuItem>
            <ToolbarMenuItem
              disabled={!state.canSplitCell}
              onClick={() =>
                run(() => editor.chain().focus().splitCell().run())
              }
            >
              <SplitSquareHorizontal className="size-4 opacity-70" />
              Split cell
            </ToolbarMenuItem>

            <span aria-hidden className="my-1 h-px bg-border" />

            <ToolbarMenuItem
              onClick={() =>
                run(() => editor.chain().focus().deleteRow().run())
              }
            >
              <Trash2 className="size-4 opacity-70" />
              Delete row
            </ToolbarMenuItem>
            <ToolbarMenuItem
              onClick={() =>
                run(() => editor.chain().focus().deleteColumn().run())
              }
            >
              <Columns3 className="size-4 opacity-70" />
              Delete column
            </ToolbarMenuItem>
            <ToolbarMenuItem
              onClick={() =>
                run(() => editor.chain().focus().deleteTable().run())
              }
            >
              <Trash2 className="size-4 opacity-70" />
              Delete table
            </ToolbarMenuItem>
          </div>
        );
      }}
    </ToolbarPopover>
  );
}

/* ──────────────────────────────── Toolbar ─────────────────────────────── */

export const MenuBar = ({
  editor,
  showSource,
  onToggleSource,
}: MenuBarProps) => {
  const state = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  const currentBlock =
    BLOCK_OPTIONS.find((option) => option.active(state)) ?? BLOCK_OPTIONS[0];
  const currentAlign =
    ALIGN_OPTIONS.find((option) => option.value === state.textAlign) ??
    ALIGN_OPTIONS[0];

  return (
    <div className="flex flex-wrap items-center gap-0.5 rounded-t-lg border-b border-border bg-surface/60 px-2 py-1.5">
      {/* Block type */}
      <ToolbarPopover
        trigger={({ open, toggle }) => (
          <ToolbarButton
            label="Text style"
            active={open}
            onClick={toggle}
            className="w-36 justify-between gap-2 px-2"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="flex size-4 shrink-0 items-center justify-center opacity-70">
                {currentBlock.icon}
              </span>
              <span className="truncate">{currentBlock.label}</span>
            </span>
            <ChevronDown className="size-3.5 shrink-0 opacity-60" />
          </ToolbarButton>
        )}
      >
        {({ close }) => (
          <div className="flex flex-col">
            {BLOCK_OPTIONS.map((option) => (
              <ToolbarMenuItem
                key={option.label}
                active={option.active(state)}
                onClick={() => {
                  option.run(editor);
                  close();
                }}
              >
                <span className="flex size-4 items-center justify-center opacity-70">
                  {option.icon}
                </span>
                {option.label}
              </ToolbarMenuItem>
            ))}
          </div>
        )}
      </ToolbarPopover>

      <ToolbarDivider />

      {/* Inline formatting */}
      <ToolbarButton
        label="Bold"
        active={state.isBold}
        disabled={!state.canBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={state.isItalic}
        disabled={!state.canItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={state.isUnderline}
        disabled={!state.canUnderline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        active={state.isStrike}
        disabled={!state.canStrike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Text colour */}
      <ToolbarPopover
        trigger={({ open, toggle }) => (
          <ToolbarButton label="Text colour" active={open} onClick={toggle}>
            <span className="flex flex-col items-center leading-none">
              <span className="text-[13px] font-semibold">A</span>
              <span
                className="mt-0.5 block h-0.75 w-3.5 rounded-full"
                style={{ backgroundColor: state.color || 'currentColor' }}
              />
            </span>
          </ToolbarButton>
        )}
      >
        {({ close }) => (
          <ColorPicker
            editor={editor}
            currentColor={state.color}
            close={close}
          />
        )}
      </ToolbarPopover>

      <ToolbarDivider />

      {/* Alignment */}
      <ToolbarPopover
        trigger={({ open, toggle }) => (
          <ToolbarButton label="Alignment" active={open} onClick={toggle}>
            {currentAlign.icon}
            <ChevronDown className="size-3 opacity-60" />
          </ToolbarButton>
        )}
      >
        {({ close }) => (
          <div className="flex flex-col">
            {ALIGN_OPTIONS.map((option) => (
              <ToolbarMenuItem
                key={option.value}
                active={option.value === state.textAlign}
                onClick={() => {
                  editor.chain().focus().setTextAlign(option.value).run();
                  close();
                }}
              >
                <span className="flex size-4 items-center justify-center opacity-70">
                  {option.icon}
                </span>
                {option.label}
              </ToolbarMenuItem>
            ))}
            <ToolbarMenuItem
              onClick={() => {
                editor.chain().focus().unsetTextAlign().run();
                close();
              }}
            >
              <AlignLeft className="size-4 opacity-70" />
              Reset alignment
            </ToolbarMenuItem>
          </div>
        )}
      </ToolbarPopover>

      <ToolbarDivider />

      {/* Link */}
      <ToolbarPopover
        trigger={({ open, toggle }) => (
          <ToolbarButton
            label="Link"
            active={open || state.isLink}
            onClick={toggle}
          >
            <Link2 className="size-4" />
          </ToolbarButton>
        )}
      >
        {({ close }) => (
          <LinkForm editor={editor} initialUrl={state.linkHref} close={close} />
        )}
      </ToolbarPopover>

      {/* Table */}
      <TableMenu editor={editor} state={state} />

      {/* History + source view */}
      <div className="ml-auto flex items-center gap-0.5">
        <ToolbarButton
          label="Undo"
          disabled={!state.canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          disabled={!state.canRedo}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className="size-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Toggle HTML source"
          active={showSource}
          onClick={onToggleSource}
        >
          <Code2 className="size-4" />
        </ToolbarButton>
      </div>
    </div>
  );
};
