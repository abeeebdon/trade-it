import React from 'react';

type SelectDropDownProps = {
  pageNum: number;
  setPageNum: (value: number) => void;
};

const SelectDropDown: React.FC<SelectDropDownProps> = ({
  pageNum,
  setPageNum,
}) => {
  const pageNumberOptions = [5, 10, 20, 50];

  return (
    <div className="flex gap-2 text-text items-center justify-self-end">
      <span>Per Page:</span>
      <select
        value={pageNum}
        onChange={(e) => setPageNum(Number(e.target.value))}
        className="border border-border mb-2 bg-bg text-text rounded-md px-3 py-1 outline-none"
      >
        {pageNumberOptions.map((num) => (
          <option key={num} value={num} className="text-text">
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropDown;
