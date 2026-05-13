import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { Card } from "@/components/ui/card";
import { FC, PropsWithChildren, ReactNode } from "react";

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

const RootLayout: FC<PropsWithChildren & { sidebar: ReactNode }> = ({
  sidebar,
  children,
}) => (
  <html
    lang="en"
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  >
    <body className="min-h-full flex w-full">
      <SidebarProvider>
        <Sidebar>{sidebar}</Sidebar>
        <SidebarTrigger />
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
