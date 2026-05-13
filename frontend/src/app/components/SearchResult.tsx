import { FC } from "react";
import { Button } from "../../components/ui/button";
import { useSearchResultsStore } from "@/store/searchResults";
import { HighlightText } from "@/components/common/hightlightText";

type SearchResultProps = {
  title: string;
  url: string;
  matchIndexStart: number;
  itemMatchCount: number;
};

const SearchResult: FC<SearchResultProps> = ({
  title,
  url,
  matchIndexStart,
  itemMatchCount,
}) => {
  const findQuery = useSearchResultsStore((state) => state.findQuery);
  const currentMatchIndex = useSearchResultsStore(
    (state) => state.currentMatchIndex,
  );

  const titleMatchCount = findQuery
    ? (
        title.match(
          new RegExp(findQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
        ) ?? []
      ).length
    : 0;

  const isActive =
    itemMatchCount > 0 &&
    currentMatchIndex >= matchIndexStart &&
    currentMatchIndex < matchIndexStart + itemMatchCount;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Button
        variant="secondary"
        className={[
          "block p-2 text-left w-full h-auto cursor-pointer",
          isActive ? "ring-2 ring-orange-400" : "",
        ]
          .join(" ")
          .trim()}
      >
        <p className="text-left text-wrap">
          <HighlightText
            text={title}
            query={findQuery}
            matchStart={matchIndexStart}
            currentMatchIndex={currentMatchIndex}
          />{" "}
          <i className="text-blue-500 underline break-all">
            <HighlightText
              text={url}
              query={findQuery}
              matchStart={matchIndexStart + titleMatchCount}
              currentMatchIndex={currentMatchIndex}
            />
          </i>
        </p>
      </Button>
    </a>
  );
};
SearchResult.displayName = "SearchResult";

export default SearchResult;
