import React from "react";
import "./sidebar.css";

interface SearchbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>🔎
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default Searchbar;