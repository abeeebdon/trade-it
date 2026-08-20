// components/OrderSummaryCard.tsx
// Line items + total. Identical on all three screens, so it's shared
// rather than re-typed per role.

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface OrderSummaryCardProps {
  items: OrderItem[];
  total: number;
}

export function OrderSummaryCard({ items, total }: OrderSummaryCardProps) {
  return (
    <div className="helix-card rounded-xl p-4 flex flex-col gap-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden shrink-0">
            {item.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/90 truncate">{item.name}</p>
            <p className="text-xs text-white/40">Qty {item.quantity}</p>
          </div>
          <p className="text-sm text-white/70">
            ₦{(item.price * item.quantity).toLocaleString()}
          </p>
        </div>
      ))}
      <div className="border-t border-white/10 pt-3 flex items-center justify-between">
        <p className="text-sm text-white/60">Total</p>
        <p className="text-base font-semibold text-[#C9922A]">
          ₦{total.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
