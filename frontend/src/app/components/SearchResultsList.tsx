"use client";

import { FC } from "react";
import { useSearchResultsStore } from "../store/searchResults";
import SearchResult from "@/components/cards/SearchResult";

const SearchResultsList: FC = () => {
  const results = useSearchResultsStore((state) => state.results);
  const total = useSearchResultsStore((state) => state.pagination.total);

  console.log(results);
  if (total === 0) return null;

  return (
    <div className="space-y-4 mt-4">
      <p>
        Found <b>{total}</b> entries
      </p>
      <p>Here are the search results:</p>
      <ul className="space-y-2">
        {results.map(({ id, ...props }) => (
          <li key={id}>
            <SearchResult {...props} />
          </li>
        ))}
      </ul>
    </div>
  );
};
SearchResultsList.displayName = "SearchResultsList";

export default SearchResultsList;
