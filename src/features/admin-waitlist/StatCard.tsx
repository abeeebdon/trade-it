export default function StatCard({ label, n }: { label: string; n: number }) {
  return (
    <div className="helix-card p-5">
      <div className="helix-label">{label}</div>
      <div className="font-mono text-3xl font-bold text-[#C9922A] mt-2">
        {n.toLocaleString()}
      </div>
    </div>
  );
}
