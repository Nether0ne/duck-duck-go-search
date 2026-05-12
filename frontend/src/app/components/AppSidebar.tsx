"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useRecentSearchesStore } from "@/store/recentSearches";
import { FC, useEffect } from "react";
import RecentSearchItem from "./RecentSearchItem";

const AppSidebar: FC = () => {
  const searches = useRecentSearchesStore((state) => state.searches);
  const setSearches = useRecentSearchesStore((state) => state.setSearches);

  useEffect(() => {
    const fetchSearches = async () => {
      const response = await fetch("http://localhost:3000/search/history", {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      setSearches(data.history);
    };
    fetchSearches();
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>Recent searches</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {searches.map(({ id, ...props }) => (
            <RecentSearchItem key={id} {...props} />
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
