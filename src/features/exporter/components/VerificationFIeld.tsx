export function VerificationField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] text-muted tracking-widest">{label}</p>
      <p className="font-mono text-text">{value}</p>
    </div>
  );
}
