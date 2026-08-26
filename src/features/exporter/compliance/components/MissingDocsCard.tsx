import { MissingDocsCardProps } from '../types/compliance';

export default function MissingDocsCard({ score }: MissingDocsCardProps) {
  return (
    <div className="helix-card p-6">
      <div className="helix-label">Missing documents</div>
      <ul className="mt-3 space-y-2">
        {score?.map((m) => (
          <li key={m} className="text-[13px] flex items-center gap-2 text-text">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
