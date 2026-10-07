import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  title: string;
  children: ReactNode;
  testid?: string;
  maxWidth?: string;
}

export default function Modal({
  onClose,
  title,
  children,
  maxWidth = 'max-w-md',
}: ModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <aside
      className="fixed inset-0 z-60  backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      aria-labelledby="modal-title"
    >
      {/* Modal positioning wrapper */}
      <div className="min-h-full flex items-center justify-center pt-16 pb-10 px-4">
        <section
          onClick={(e) => e.stopPropagation()}
          className={`helix-card w-full ${maxWidth} fade-up shadow-2xl`}
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-bg/20">
            <h2 id="modal-title" className="helix-h3">
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="text-muted hover:text-text transition-colors"
              aria-label="Close modal"
              data-testid="modal-close"
            >
              <X size={18} />
            </button>
          </header>

          {/* Modal Content */}
          <main className="p-6">{children}</main>
        </section>
      </div>
    </aside>
  );
}
