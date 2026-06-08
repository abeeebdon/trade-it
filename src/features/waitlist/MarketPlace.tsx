import Image from 'next/image';
import { PRODUCTS, ProductType } from './constants';
import { Dispatch, SetStateAction } from 'react';

export default function Marketplace({
  onOpen,
}: {
  onOpen: Dispatch<SetStateAction<ProductType | null>>;
}) {
  return (
    <section id="marketplace" className="js-section">
      <div className="js-container">
        <div className="js-section-head reveal">
          <h3 className="js-eyebrow">Sample Listings</h3>
          <h2 className="js-h2">A glimpse of what&apos;s coming.</h2>
          <div className="js-preview-note">
            <span className="js-dot js-dot-gold" /> Preview only · Marketplace
            launching soon
          </div>
        </div>
        <div className="js-product-grid">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              className="js-card reveal"
              onClick={() => onOpen(p)}
              data-testid={`product-${p.id}`}
            >
              <div className="js-card-thumb" style={{ background: p.grad }}>
                <span className="js-soon-badge">Coming Soon</span>
                <span className="js-city-badge">{p.city}</span>
                {/* <span className="js-product-emoji">{p.emoji}</span> */}
                <Image
                  src={`/images/${p.image}`}
                  alt={p.name}
                  width={200}
                  height={200}
                  className="w-full js-product-emoji h-full"
                />
              </div>
              <div className="js-card-body">
                <h3 className="js-card-title">{p.name}</h3>
                <div className="js-card-seller">
                  {p.seller} · Verified Exporter
                </div>
                <div className="js-card-meta">
                  <span className="js-card-price">
                    {p.price}
                    <span className="js-card-unit">{p.unit}</span>
                  </span>
                  <span className="js-card-moq">MOQ: {p.moq}</span>
                </div>
                <button
                  className="js-card-cta"
                  data-testid={`view-${p.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen(p);
                  }}
                >
                  View Sample →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
