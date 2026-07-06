import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function FavouritesEmptyState() {
  return (
    <div className="helix-card p-10 text-center">
      <Heart size={28} className="text-[#C9922A] mx-auto mb-3" />
      <div className="helix-h3 mb-2">No favourites yet</div>
      <p className="text-[13px] text-[#9CA3AF] max-w-md mx-auto">
        Tap ♡ on any product to save it here for easy reordering.
      </p>
      <Link
        href="/?beta=1"
        className="helix-btn-primary text-sm inline-flex mt-5"
      >
        Browse marketplace
      </Link>
    </div>
  );
}
