"use client";

import { cn } from "@/lib/utils";
import SidebarComponent from "./SidebarComponent";
import {
  IconArrowLeft,
  IconBrandTabler,
  // IconSettings,
} from "@tabler/icons-react";

// import Link from "next/link";
// import { motion } from "framer-motion";
const DashboardComponents = ({ children }: { children: ReactNode }) => {
  const sideBrLinks = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row  dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]"
      )}
    >
      <SidebarComponent sideBrLinks={sideBrLinks} />
      <div className="p-4 pt-10 w-full overflow-hidden">{children}</div>
    </div>
  );
};

export default DashboardComponents;

import { ReactNode } from "react";
