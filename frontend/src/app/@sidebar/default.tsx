import { SidebarGroup } from "@/components/ui/sidebar";
import { FC } from "react";
import RecentSearchItem from "./components/RecentSearchItem";
import { getSearchHistory } from "../../lib/api";
import ErrorBoundary from "@/components/common/errorBoundary";

const AppSidebar: FC = async () => {
  const recentSearches = await getSearchHistory();

  return (
    <SidebarGroup>
      <ErrorBoundary fallback={<></>}>
        {recentSearches.history.map(({ id, ...props }) => (
          <RecentSearchItem key={id} {...props} />
        ))}
      </ErrorBoundary>
    </SidebarGroup>
  );
};
AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
