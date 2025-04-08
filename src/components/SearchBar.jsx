import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between bg-[#0a2540] border border-blue-500 rounded-full px-4 py-2 w-full shadow-md focus-within:ring-2 focus-within:ring-blue-400 focus-within:shadow-blue-500/40 transition-all duration-300"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search"
        className="bg-transparent outline-none w-full text-white placeholder:text-blue-200 placeholder:tracking-widest"
      />
      <button type="submit" className="text-white hover:scale-110 transition">
        <FiSearch size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
