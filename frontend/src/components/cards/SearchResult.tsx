import { FC } from "react";
import { Card } from "../ui/card";

type SearchResultProps = {
  title: string;
  url: string;
};

const SearchResult: FC<SearchResultProps> = ({ title, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Card className="p-2">{title}</Card>
    </a>
  );
};
SearchResult.displayName = "SearchResult";

export default SearchResult;
