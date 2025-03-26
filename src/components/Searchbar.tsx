import React from "react";


interface SearchbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <form className="m-20" onSubmit={(e) => e.preventDefault()}>🔎
      <input className="border-2 border-double w-100 h-10 p-5 text-xl "
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default Searchbar;