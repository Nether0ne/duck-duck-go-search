"use client";

import { FC, useEffect, useMemo } from "react";
import { useSearchResultsStore } from "../../store/searchResults";
import SearchResult from "@/app/components/SearchResult";
import { countMatches } from "@/components/common/hightlightText";

const SearchResultsList: FC = () => {
  const results = useSearchResultsStore((state) => state.results);
  const total = useSearchResultsStore((state) => state.pagination.total);
  const findQuery = useSearchResultsStore((state) => state.findQuery);
  const setMatchCount = useSearchResultsStore((state) => state.setMatchCount);
  const setCurrentMatchIndex = useSearchResultsStore(
    (state) => state.setCurrentMatchIndex,
  );

  const matchesPerResult = useMemo(
    () =>
      results.map(
        ({ title, url }) =>
          countMatches(title, findQuery) + countMatches(url, findQuery),
      ),
    [results, findQuery],
  );

  const matchOffsets = useMemo(() => {
    const offsets: number[] = [];
    let running = 0;
    for (const count of matchesPerResult) {
      offsets.push(running);
      running += count;
    }
    return offsets;
  }, [matchesPerResult]);

  const totalMatches = useMemo(
    () => matchesPerResult.reduce((a, b) => a + b, 0),
    [matchesPerResult],
  );

  useEffect(() => {
    setMatchCount(totalMatches);
    setCurrentMatchIndex(0);
  }, [totalMatches, setMatchCount, setCurrentMatchIndex]);
  console.log(matchesPerResult, matchOffsets);
  if (total === 0) return <p className="mt-4">Nothing was found</p>;

  return (
    <div className="space-y-4 mt-4">
      <p>
        Found <b>{total}</b> entries
      </p>
      <p>Here are the search results:</p>
      <ul className="space-y-2">
        {results.map(({ id, ...props }, index) => (
          <li key={id}>
            <SearchResult
              {...props}
              matchIndexStart={matchOffsets[index]}
              itemMatchCount={matchesPerResult[index]}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
SearchResultsList.displayName = "SearchResultsList";

export default SearchResultsList;
