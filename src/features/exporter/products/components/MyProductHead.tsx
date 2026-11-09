import { useState } from 'react';
import { Filter, Plus } from 'lucide-react';

import Modal from '@/components/ui/Modal';
import MyProductFilterControls from './MyProductFilterControls';
import CustomSelect from '@/components/form/CustomSelect';
import { CustomSearchInput } from '@/components/form/CustomSearchInput';
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
        <CustomSearchInput
          id="header-search"
          className="max-w-md"
          inputClassName="text-[13px]"
          placeholder="Search products…"
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
