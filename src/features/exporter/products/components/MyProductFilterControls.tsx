import CustomSelect from '@/components/form/CustomSelect';
import { STATUSES } from '@/lib/constants';

type MyProductFilterControlsProps = {
  selectedCategory: string;
  categoryOptions: Array<{ id: number; name: string }>;
  categoriesLoading: boolean;
  selectedStatus: string;
  startDate: string;
  endDate: string;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onReset: () => void;
};

const MyProductFilterControls = ({
  selectedCategory,
  categoryOptions,
  categoriesLoading,
  selectedStatus,
  startDate,
  endDate,
  onCategoryChange,
  onStatusChange,
  onStartDateChange,
  onEndDateChange,
  onReset,
}: MyProductFilterControlsProps) => {
  return (
    <div className="space-y-4">
      <CustomSelect
        label="Category"
        value={selectedCategory}
        onValueChange={onCategoryChange}
        disabled={categoriesLoading}
        options={[
          { label: 'All categories', value: 'all' },
          ...categoryOptions.map((category) => ({
            label: category.name,
            value: category.name,
          })),
        ]}
      />

      <CustomSelect
        label="Status"
        value={selectedStatus}
        onValueChange={onStatusChange}
        options={[
          { label: 'All statuses', value: 'all' },
          ...STATUSES.map((status) => ({
            label: status.label,
            value: String(status.id),
          })),
        ]}
      />

      <div>
        <label className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-muted">
          From date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="helix-input w-full"
        />
      </div>

      <div>
        <label className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-muted">
          To date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="helix-input w-full"
        />
      </div>

      <button
        type="button"
        onClick={onReset}
        className="helix-btn-secondary w-full"
      >
        Clear Filter
      </button>
    </div>
  );
};

export default MyProductFilterControls;
