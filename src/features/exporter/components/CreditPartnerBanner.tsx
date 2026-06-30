'use client';

export default function CreditPartnerBanner() {
  return (
    <div className="helix-card p-6 mb-6 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#C9922A]/10 blur-3xl pointer-events-none" />

      <div className="flex items-start gap-4 relative">
        {/* Logo mark */}
        <div
          className="w-12 h-12 rounded-md flex items-center justify-center font-bold text-[#0A1628] text-lg shrink-0"
          style={{ background: 'linear-gradient(135deg,#C9922A,#1A7A6E)' }}
        >
          J
        </div>

        <div className="flex-1">
          <div className="helix-kicker">Credit · Technology Partner</div>
          <h2 className="helix-h3 mt-1">JompStart Digital Limited</h2>
          <p className="text-[13px] text-[#9CA3AF] mt-2 max-w-2xl leading-relaxed">
            JompStart builds &amp; maintains Jompshop alongside our operating
            partners, and — as the platform&rsquo;s business-credit partner —
            offers working-capital financing to exporters against their verified
            sales history on Helix.
          </p>
        </div>
      </div>
    </div>
  );
}
