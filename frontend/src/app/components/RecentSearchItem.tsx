"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { FC } from "react";

type RecentSearchItemProps = {
  query: string;
  createdAt: string;
};

const RecentSearchItem: FC<RecentSearchItemProps> = ({ query }) => {
  const onClick = () => {
    redirect(`/?query=${query}`);
  };

  return (
    <Button variant="ghost" className="justify-start" onClick={onClick}>
      {query}
    </Button>
  );
};
RecentSearchItem.displayName = "RecentSearchItem";
export default RecentSearchItem;
