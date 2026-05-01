export function VerificationField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] text-[#9CA3AF] tracking-widest">{label}</p>
      <p className="font-mono">{value}</p>
    </div>
  );
}
