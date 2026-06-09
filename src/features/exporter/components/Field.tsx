import { FieldProps } from '../types/exporter';

export default function Field({ label, children, full }: FieldProps) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="helix-label">{label}</label>
      {children}
    </div>
  );
}
