import { ListChecks } from 'lucide-react';

interface ListsEmptyStateProps {
  onCreate: () => void;
}

export default function ListsEmptyState({ onCreate }: ListsEmptyStateProps) {
  return (
    <div className="helix-card p-10 text-center">
      <ListChecks size={28} className="text-[#C9922A] mx-auto mb-3" />
      <div className="helix-h3 mb-2">No lists yet</div>
      <p className="text-[13px] text-[#9CA3AF] max-w-md mx-auto">
        Create your first list — great for weekly groceries or sending a care
        package back home.
      </p>
      <button
        onClick={onCreate}
        className="helix-btn-primary text-sm inline-flex mt-5"
      >
        Create list
      </button>
    </div>
  );
}
