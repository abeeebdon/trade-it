import Image from 'next/image';
import { ProductType } from './constants';

export default function ProductModal({
  product,
  onClose,
  onCta,
}: {
  product: ProductType;
  onClose: () => void;
  onCta: () => void;
}) {
  return (
    <div
      className="js-modal-backdrop open"
      onClick={onClose}
      data-testid="product-modal"
    >
      <div className="js-modal" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="js-modal-close"
          aria-label="Close"
          data-testid="modal-close"
        >
          ✕
        </button>
        <div className="js-modal-grid">
          <div className="js-modal-left" style={{ background: product.grad }}>
            <Image
              src={`/images/${product.image}`}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-full object-center"
            />
          </div>
          <div className="js-modal-right">
            <span className="js-cat-badge">{product.category}</span>
            <h3 className="js-modal-title">{product.name}</h3>
            <div className="js-card-seller">
              {product.seller} · {product.city}
            </div>
            <p className="js-modal-desc">{product.desc}</p>
            <div className="js-spec-table">
              <div className="js-spec-row">
                <span>MOQ</span>
                <span>{product.moq}</span>
              </div>
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="js-spec-row">
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <div className="js-modal-price">
              {product.price}
              <span className="js-card-unit">{product.unit}</span>
            </div>
            <button
              onClick={onCta}
              className="js-btn js-btn-purple"
              data-testid="modal-join-cta"
            >
              Join Waitlist to Order →
            </button>
            <div className="js-form-note">
              No purchases yet — we&apos;re launching soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
