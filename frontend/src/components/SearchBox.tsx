import React from "react";
import { TextBox, SelectBox } from "devextreme-react";

interface SearchAndSortBoxProps {
  searchValue: string;
  handleSearch: (e: any) => void;
  sortValue: string;
  handleSort: (e: any) => void;
  sortOrder: boolean;
  handleSortOrder: (e: any) => void;
}

const SearchAndSortBox: React.FC<SearchAndSortBoxProps> = ({
  searchValue,
  handleSearch,
  sortValue,
  handleSort,
  sortOrder,
  handleSortOrder,
}) => {
  const sortOptions = [
    { value: "priority", text: "Priority" },
    { value: "title", text: "Title" },
    { value: "due_date", text: "Due Date" },
  ];

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search..."
      />
      
      <select value={sortValue} onChange={(e) => handleSort(e.target.value)}>
        {sortOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <label>
        Descending
        <input
          type="checkbox"
          checked={sortOrder}
          onChange={handleSortOrder}
        />
      </label>
    </div>
  );
};

export default SearchAndSortBox;
