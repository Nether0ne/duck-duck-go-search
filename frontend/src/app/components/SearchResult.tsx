import { FC, memo } from "react";
import { Button } from "../../components/ui/button";

type SearchResultProps = {
  title: string;
  url: string;
};

const SearchResult: FC<SearchResultProps> = memo(({ title, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <Button
      variant="secondary"
      className="justify-start flex-nowrap p-2 w-full cursor-pointer"
    >
      <p className="text-left truncate">{title}</p>
      <p>
        <i className="text-blue-500 underline truncate">{url}</i>
      </p>
    </Button>
  </a>
));
SearchResult.displayName = "SearchResult";

export default SearchResult;
