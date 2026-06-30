import { StatProps } from '../types/admin';

export default function Stat({ label, value, icon: Icon, accent }: StatProps) {
  return (
    <div
      className={`helix-card p-5 ${accent ? 'relative overflow-hidden' : ''}`}
    >
      {accent && (
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#C9922A]/15 blur-2xl" />
      )}
      <div className="flex justify-between items-start relative">
        <div>
          <p className="helix-label">{label}</p>
          <p className="font-mono text-3xl font-bold mt-2 text-text">{value}</p>
        </div>
        <Icon size={22} className="text-[#1A7A6E]" />
      </div>
    </div>
  );
}
export const StatSkeleton = () => {
  return (
    <div className="helix-card p-5  ">
      <div className="flex justify-between animate-pulse items-start relative">
        <div className="flex-1">
          {/* label */}
          <div className="h-3 w-24  rounded animate-pulse bg-muted mb-3" />

          {/* value */}
          <div className="h-4 mt-4 w-20 animate-pulse rounded bg-muted" />
        </div>

        {/* icon */}
        <div className="h-4 w-6 animate-pulse rounded-md bg-muted shrink-0" />
      </div>
    </div>
  );
};
