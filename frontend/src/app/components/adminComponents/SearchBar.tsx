// components/SearchBar.tsx

import React from 'react';
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => (
  <div className="relative mb-6">
    <Input
      type="text"
      placeholder="Search doctors..."
      className="pl-10"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
);

export default SearchBar;
