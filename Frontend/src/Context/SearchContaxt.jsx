import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoadingSuggestions(true);
      const res = await fetch(
        `https://api.musicandmore.co.in/api/v1/searchProducts?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data.success) {
        setSuggestions(data.data || []);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setNoResultsFound(false);
      setSuggestions([]); // Clear suggestions on formal search
      // ✅ Match backend parameter name (q)
      const res = await fetch(
        `https://api.musicandmore.co.in/api/v1/searchProducts?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();

      console.log("Search API Response:", data);

      if (data.success && data.data && data.data.length > 0) {
        setSearchResults(data.data);
        setNoResultsFound(false);
      } else {
        setSearchResults([]);
        setNoResultsFound(true);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setNoResultsFound(true);
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
        fetchSuggestions,
        suggestions,
        loading,
        loadingSuggestions,
        noResultsFound,
        setNoResultsFound,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
