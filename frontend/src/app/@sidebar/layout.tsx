import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { FC, PropsWithChildren } from "react";

const SidebarLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <>
      <SidebarHeader>Recent searches</SidebarHeader>
      <SidebarContent>{children}</SidebarContent>
    </>
  );
};
SidebarLayout.displayName = "SidebarLayout";

export default SidebarLayout;
