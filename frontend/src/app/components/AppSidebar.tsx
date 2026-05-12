import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { FC } from "react";
import RecentSearchItem from "./RecentSearchItem";
import { getSearchHistory } from "../../lib/api";

const AppSidebar: FC = async () => {
  const recentSearches = await getSearchHistory();

  return (
    <Sidebar>
      <SidebarHeader>Recent searches</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {recentSearches.history.map(({ id, ...props }) => (
            <RecentSearchItem key={id} {...props} />
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
