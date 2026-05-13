"use client";

import { FC, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchResultsStore } from "@/store/searchResults";

const FindInResults: FC = () => {
  const results = useSearchResultsStore((state) => state.results);
  const findQuery = useSearchResultsStore((state) => state.findQuery);
  const matchCount = useSearchResultsStore((state) => state.matchCount);
  const currentMatchIndex = useSearchResultsStore(
    (state) => state.currentMatchIndex,
  );
  const setFindQuery = useSearchResultsStore((state) => state.setFindQuery);
  const nextMatch = useSearchResultsStore((state) => state.nextMatch);
  const prevMatch = useSearchResultsStore((state) => state.prevMatch);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(
      `[data-match-index="${currentMatchIndex}"]`,
    );
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [currentMatchIndex]);

  if (results.length === 0) return null;

  const hasMatches = matchCount > 0;
  const displayIndex = hasMatches ? currentMatchIndex + 1 : 0;

  return (
    <div className="flex items-center gap-2 mt-3">
      <div className="relative flex-1 max-w-xs">
        <Input
          ref={inputRef}
          id="findIn"
          value={findQuery}
          onChange={(e) => setFindQuery(e.target.value)}
          placeholder="Find in results"
          aria-label="Find in results"
          className="pr-24"
        />
        {findQuery && (
          <span
            aria-live="polite"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground whitespace-nowrap pointer-events-none"
          >
            {hasMatches ? `${displayIndex} of ${matchCount}` : "no matches"}
          </span>
        )}
      </div>
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous match"
        disabled={!hasMatches}
        onClick={prevMatch}
      >
        <ChevronUp className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Next match"
        disabled={!hasMatches}
        onClick={nextMatch}
      >
        <ChevronDown className="size-4" />
      </Button>
    </div>
  );
};
FindInResults.displayName = "FindInResults";

export default FindInResults;
