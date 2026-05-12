"use client";

import { FC, memo } from "react";
import { useSearchResultsStore } from "../../store/searchResults";
import SearchResult from "@/app/components/SearchResult";

const SearchResultsList: FC = memo(() => {
  const results = useSearchResultsStore((state) => state.results);
  const total = useSearchResultsStore((state) => state.pagination.total);

  if (total === 0) return <p className="mt-4">Nothing was found</p>;

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
});
SearchResultsList.displayName = "SearchResultsList";

export default SearchResultsList;
