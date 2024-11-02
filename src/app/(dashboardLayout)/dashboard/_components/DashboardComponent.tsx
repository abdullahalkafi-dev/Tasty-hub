"use client";

import { cn } from "@/lib/utils";
import SidebarComponent from "./SidebarComponent";
import {
  IconArrowLeft,
 
  // IconSettings,
} from "@tabler/icons-react";
import { JSX, ReactNode, useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { UsersRoundIcon } from "lucide-react";

// import Link from "next/link";
// import { motion } from "framer-motion";
const DashboardComponents = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    console.log("user", user);
    if (!user) {
     return router.push("/login");
    }
  }, [user, router]);

  let sideBrLinks: { label: string; href: string; icon: JSX.Element }[] = [];
  if (user?.role === "admin") {
    sideBrLinks = [
      // {
      //   label: "Dashboard",
      //   href: "/dashboard",
      //   icon: (
      //     <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      //   ),
      // },

      {
        label: "User management",
        href: "/dashboard/user-management",
        icon: (
          <UsersRoundIcon  className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        
        ),
      },
      {
        label: "Recipe management",
        href: "/dashboard/recipe-management",
        icon: (
          <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Blog management",
        href: "/dashboard/blog-management",
        icon: (
          <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
    ];
  }

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row  dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen",
        "min-h-[100vh]"
      )}
    >
      <SidebarComponent sideBrLinks={sideBrLinks} />
      <div className="  min-h-screen flex-grow p-4 w-full pt-10 overflow-y-auto  ">
        {children}
      </div>
    </div>
  );
};

export default DashboardComponents;
