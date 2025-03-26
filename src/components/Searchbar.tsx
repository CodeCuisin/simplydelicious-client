import React from "react";


interface SearchbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <form className="flex justify-center m-10" onSubmit={(e) => e.preventDefault()}>
      <div className="text-3xl m-1">🔎</div>
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