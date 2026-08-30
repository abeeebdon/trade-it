import SelectField from '@/components/form/SelectField';
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
      <SelectField
        label="Category"
        name="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        disabled={categoriesLoading}
        className="helix-input w-full"
      >
        <option value="all">All categories</option>
        {categoryOptions.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </SelectField>

      <SelectField
        label="Status"
        name="status"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="helix-input w-full"
      >
        <option value="all">All statuses</option>
        {STATUSES.map((status) => (
          <option key={status.id} value={String(status.id)}>
            {status.label}
          </option>
        ))}
      </SelectField>

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
