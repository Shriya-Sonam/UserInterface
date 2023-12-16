import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500 w-full"
      />
      <button onClick={handleSearch} className="bg-blue-400 text-white rounded px-3 py-1">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
