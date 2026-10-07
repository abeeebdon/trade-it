import type { Editor } from '@tiptap/core';
import type { EditorStateSnapshot } from '@tiptap/react';

/**
 * State selector for the MenuBar component.
 * Extracts the relevant editor state for rendering menu buttons.
 */
export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
  const { editor } = ctx;
  const can = () => editor.can().chain();

  return {
    // Inline marks
    isBold: editor.isActive('bold') ?? false,
    canBold: can().toggleBold().run() ?? false,
    isItalic: editor.isActive('italic') ?? false,
    canItalic: can().toggleItalic().run() ?? false,
    isUnderline: editor.isActive('underline') ?? false,
    canUnderline: can().toggleUnderline().run() ?? false,
    isStrike: editor.isActive('strike') ?? false,
    canStrike: can().toggleStrike().run() ?? false,
    isCode: editor.isActive('code') ?? false,
    canCode: can().toggleCode().run() ?? false,
    canClearMarks: can().unsetAllMarks().run() ?? false,

    // Text colour
    color: (editor.getAttributes('textStyle').color as string) ?? '',

    // Alignment
    textAlign: editor.isActive({ textAlign: 'center' })
      ? 'center'
      : editor.isActive({ textAlign: 'right' })
        ? 'right'
        : editor.isActive({ textAlign: 'justify' })
          ? 'justify'
          : 'left',

    // Block types
    isParagraph: editor.isActive('paragraph') ?? false,
    isHeading1: editor.isActive('heading', { level: 1 }) ?? false,
    isHeading2: editor.isActive('heading', { level: 2 }) ?? false,
    isHeading3: editor.isActive('heading', { level: 3 }) ?? false,
    isHeading4: editor.isActive('heading', { level: 4 }) ?? false,

    // Lists and blocks
    isBulletList: editor.isActive('bulletList') ?? false,
    isOrderedList: editor.isActive('orderedList') ?? false,
    isCodeBlock: editor.isActive('codeBlock') ?? false,
    isBlockquote: editor.isActive('blockquote') ?? false,

    // Link
    isLink: editor.isActive('link') ?? false,
    linkHref: (editor.getAttributes('link').href as string) ?? '',

    // Tables
    isTable: editor.isActive('table') ?? false,
    canMergeCells: can().mergeCells().run() ?? false,
    canSplitCell: can().splitCell().run() ?? false,

    // History
    canUndo: can().undo().run() ?? false,
    canRedo: can().redo().run() ?? false,
  };
}

export type MenuBarState = ReturnType<typeof menuBarStateSelector>;
