import StarterKit from '@tiptap/starter-kit';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '@tiptap/extension-table';
import { Placeholder } from '@tiptap/extensions';

type EditorExtensionOptions = {
  /** Text shown inside the editor while it is empty. */
  placeholder?: string;
};

/**
 * Extensions powering the product description editor.
 *
 * `StarterKit` (v3) already bundles Bold, Italic, Underline, Strike, Link,
 * headings, lists, code blocks and undo/redo, so only the extras are added here.
 */
export function createEditorExtensions({
  placeholder = 'Write a detailed product description…',
}: EditorExtensionOptions = {}) {
  return [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4] },
      link: {
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer nofollow',
          target: '_blank',
        },
      },
    }),
    TextStyle,
    Color,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Image.configure({
      inline: false,
      allowBase64: true,
      HTMLAttributes: { class: 'editor-image' },
    }),
    Youtube.configure({
      nocookie: true,
      HTMLAttributes: { class: 'editor-video' },
    }),
    Table.configure({
      resizable: true,
      lastColumnResizable: false,
      HTMLAttributes: { class: 'editor-table' },
    }),
    TableRow,
    TableHeader,
    TableCell,
    Placeholder.configure({ placeholder }),
  ];
}
