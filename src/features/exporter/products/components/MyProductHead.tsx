import { useState } from 'react';
import { Filter, Plus } from 'lucide-react';

import Modal from '@/components/ui/Modal';
import MyProductFilterControls from './MyProductFilterControls';
import SelectField from '@/components/form/SelectField';
import { STATUSES } from '@/lib/constants';

type MyProductHeadProps = {
  selectedCategory: string;
  categoryOptions: Array<{ id: number; name: string }>;
  categoriesLoading: boolean;
  selectedStatus: string;
  startDate: string;
  endDate: string;
  onCreate: () => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onReset: () => void;
};

const MyProductHead = ({
  selectedCategory,
  categoryOptions,
  categoriesLoading,
  selectedStatus,
  startDate,
  endDate,
  onCreate,
  onCategoryChange,
  onStatusChange,
  onStartDateChange,
  onEndDateChange,
  onReset,
}: MyProductHeadProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="mb-6">
      <article className="flex gap-4 items-center  justify-between ">
        <input
          id="header-search"
          placeholder="Search products…"
          className="helix-input max-w-md text-[13px]"
        />
        <button
          onClick={onCreate}
          className="helix-btn-primary flex gap-4 items-center"
        >
          <Plus className="size-6 md:size-4" />
          <span className="md:block hidden">New product</span>
        </button>
      </article>

      <section className=" flex justify-between items-center mt-4">
        <article className="hidden md:grid gap-3 w-full md:grid-cols-[1fr_1fr_180px_180px_auto] items-end">
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
        </article>
        <div className=" flex justify-end">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="helix-btn-secondary inline-flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
          </button>
        </div>
      </section>

      {mobileOpen && (
        <Modal title="Product filters" onClose={() => setMobileOpen(false)}>
          <MyProductFilterControls
            selectedCategory={selectedCategory}
            categoryOptions={categoryOptions}
            categoriesLoading={categoriesLoading}
            selectedStatus={selectedStatus}
            startDate={startDate}
            endDate={endDate}
            onCategoryChange={onCategoryChange}
            onStatusChange={onStatusChange}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            onReset={onReset}
          />
        </Modal>
      )}
    </section>
  );
};

export default MyProductHead;
