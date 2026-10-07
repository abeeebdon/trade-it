'use client';
import './styles.css';

import { DragHandle } from '@tiptap/extension-drag-handle-react';
import { EditorContent, useEditor } from '@tiptap/react';
import { GripVertical } from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { createEditorExtensions } from './extensions';
import { MenuBar } from './Menubar';

type DescriptionEditorProps = {
  label?: string;
  /** Initial HTML content. */
  value?: string;
  /** Placeholder shown while the editor is empty. */
  placeholder?: string;
  /** Validation message; also turns the frame red. */
  error?: string;
  /** Called with the current HTML whenever the content changes. */
  onChange?: (html: string) => void;
};

const DescriptionEditor = ({
  label = 'Description',
  value = '',
  placeholder,
  error,
  onChange,
}: DescriptionEditorProps) => {
  const [showSource, setShowSource] = useState(false);
  const [source, setSource] = useState('');

  const extensions = useMemo(
    () => createEditorExtensions({ placeholder }),
    [placeholder],
  );

  const editor = useEditor({
    extensions,
    content: value,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap editor-content',
      },
    },
    onUpdate: ({ editor: instance }) => onChange?.(instance.getHTML()),
  });

  const toggleSource = () => {
    if (!editor) return;

    if (showSource) {
      editor.commands.setContent(source.trim() || '<p></p>');
      onChange?.(editor.getHTML());
    } else {
      setSource(editor.getHTML());
    }

    setShowSource((previous) => !previous);
  };

  return (
    <div className="w-full">
      {label ? <label className="helix-label">{label}</label> : null}

      <div
        className={cn(
          'rounded-lg border bg-bg transition-colors',
          error
            ? 'border-red-500'
            : 'border-border focus-within:border-primary',
        )}
      >
        {editor ? (
          <>
            <MenuBar
              editor={editor}
              showSource={showSource}
              onToggleSource={toggleSource}
            />

            {showSource ? (
              <textarea
                value={source}
                onChange={(event) => setSource(event.target.value)}
                spellCheck={false}
                aria-label="HTML source"
                className="editor-source"
              />
            ) : (
              <>
                <DragHandle
                  editor={editor}
                  className="editor-drag-handle"
                  nested
                >
                  <GripVertical className="size-4" />
                </DragHandle>

                <EditorContent editor={editor} />
              </>
            )}
          </>
        ) : (
          <div className="h-64 animate-pulse rounded-b-lg bg-surface/40" />
        )}
      </div>

      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

export default DescriptionEditor;
