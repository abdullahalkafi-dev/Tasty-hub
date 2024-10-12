"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useAppSelector } from "@/lib/hooks";
import {
  IconBowlChopsticks,
  IconNewSection,
  IconUserBolt,
} from "@tabler/icons-react";
import { HomeIcon, NewspaperIcon, PlusCircle } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SidebarComponent = ({ sideBrLinks }: any) => {
  const user = useAppSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false); // Manage the sidebar state

  const commonLinks = [
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My Recipes",
      href: "/dashboard/recipe-management/my-recipe",
      icon: (
        <IconBowlChopsticks className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Add Recipe",
      href: "/dashboard/add-recipe",
      icon: (
        <PlusCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My Blogs",
      href: "/dashboard/blog-management/my-blog",
      icon: (
        <NewspaperIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Add Blog",
      href: "/dashboard/add-blog",
      icon: (
        <IconNewSection className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Home",
      href: "/",
      icon: (
        <HomeIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody className="justify-between  gap-10 h-screen ">
        <div className="flex flex-col flex-1  overflow-x-hidden">
          {/* Logo */}
          <Link href={"/"}>
            <p className="text-2xl font-bold">TastyHub</p>
          </Link>
          <div className="mt-8 flex flex-col gap-2">
            {sideBrLinks.map((link: any) => (
              <SidebarLink key={link.label} link={link} />
            ))}

            {commonLinks.map((link: any) => (
              <SidebarLink key={link.label} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: user?.name || "User",
              href: "#",
              icon: (
                <Image
                  src={user?.image || "/path/to/default/image.jpg"}
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="User Image"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export default SidebarComponent;
