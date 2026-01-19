import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      // ✅ Match backend parameter name (q)
      const res = await fetch(
        `https://api.musicandmore.co.in/api/v1/searchProducts?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();

      console.log("Search API Response:", data);

      if (data.success) {
        setSearchResults(data.data || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        handleSearch,
        loading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
