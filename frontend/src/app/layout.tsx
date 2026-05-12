import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import AppSidebar from "./components/AppSidebar";
import { Card } from "@/components/ui/card";
import { FC, PropsWithChildren } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Duck Duck Go Search App",
  description: "A test application to use Duck Duck Go proxy search",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html
    lang="en"
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col w-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="" />
        <main className="grid w-full overflow-hidden p-1">
          <Card className="p-4 sm:p-4 flex flex-1">
            <Toaster />
            {children}
          </Card>
        </main>
      </SidebarProvider>
    </body>
  </html>
);

export default RootLayout;
