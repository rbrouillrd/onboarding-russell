import React from "react";
import { TextBox } from "devextreme-react/text-box";

interface SearchBoxProps {
  searchValue: string;
  handleSearch: (e: any) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchValue, handleSearch }) => {
  return (
    <TextBox value={searchValue} onValueChanged={handleSearch} />
  );
};

export default SearchBox;
