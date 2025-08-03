import React from "react";

type Props = {
  query: string;
  setQuery: (value: string) => void;
  onSearch: () => void;
};

export default function SearchBar({ query, setQuery, onSearch }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search repositories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}
