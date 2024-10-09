"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconUserBolt } from "@tabler/icons-react";
import { PlusCircle } from "lucide-react";

import Image from "next/image";
import { useState } from "react";

const SidebarComponent = ({ sideBrLinks }: any) => {
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
      label: "Add Recipe",
      href: "/dashboard/add-recipe",
      icon: (
         <PlusCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody className="justify-between gap-10 h-screen">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Logo */}
          logo
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
              label: "Manu Arora",
              href: "#",
              icon: (
                <Image
                  src="https://assets.aceternity.com/manu.png"
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
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
