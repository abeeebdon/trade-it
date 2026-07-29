import { Pencil, Trash2 } from 'lucide-react';
import { HelpItem } from '@/features/admin/adminHelp/types/help';

interface HelpTableRowProps {
  item: HelpItem;
  onEdit: (item: HelpItem) => void;
  onDelete: (item: HelpItem) => void;
}

const HelpTableRow = ({ item, onEdit, onDelete }: HelpTableRowProps) => {
  return (
    <tr>
      <td className="font-mono text-[#C9922A]">{item.id}</td>
      <td className="font-medium">{item.question}</td>
      <td className="text-sm text-[#9CA3AF] max-w-xs truncate">
        {item.answer}
      </td>
      <td>{item.displayOrder}</td>
      <td>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(item)}
            className="rounded p-1.5 text-[#9CA3AF] hover:bg-[#1F2937] hover:text-white transition-colors"
            title="Edit"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="rounded p-1.5 text-[#9CA3AF] hover:bg-red-500/10 hover:text-red-400 transition-colors"
            title="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default HelpTableRow;
