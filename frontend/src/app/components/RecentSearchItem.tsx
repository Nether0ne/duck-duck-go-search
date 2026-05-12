"use client";

import { Button } from "@/components/ui/button";
import { useSearchResultsStore } from "@/store/searchResults";
import { redirect } from "next/navigation";
import { FC, memo } from "react";

type RecentSearchItemProps = {
  query: string;
  createdAt: string;
};

const RecentSearchItem: FC<RecentSearchItemProps> = memo(({ query }) => {
  const page = useSearchResultsStore((state) => state.pagination.page);
  const onClick = () => {
    redirect(`/?query=${query}&page=${page}`);
  };

  return (
    <Button
      variant="ghost"
      className="justify-start cursor-pointer"
      onClick={onClick}
    >
      {query}
    </Button>
  );
});
RecentSearchItem.displayName = "RecentSearchItem";

export default RecentSearchItem;
