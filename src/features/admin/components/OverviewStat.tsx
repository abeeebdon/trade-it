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
          <p className="font-mono text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon size={22} className="text-[#1A7A6E]" />
      </div>
    </div>
  );
}
