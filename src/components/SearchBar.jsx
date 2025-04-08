import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [cityInput, setCityInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onSearch(cityInput);
      setCityInput(""); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-2 mb-6">
      <input
        type="text"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder="Enter city"
        className="border border-gray-300 p-2 rounded w-64 shadow
                   bg-white text-black placeholder-gray-500
                   dark:bg-gray-800 dark:text-white dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
