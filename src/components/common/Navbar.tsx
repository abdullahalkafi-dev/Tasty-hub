/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

import Cookies from "js-cookie";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/redux/api/features/auth/authSlice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const menus = [
    { id: 1, href: "/", linkText: "Home" },
    { id: 2, href: "/recipe", linkText: "Recipes" },
    { id: 4, href: "/blog", linkText: "Blogs" },
    { id: 5, href: "/about", linkText: "About Us" },
    { id: 6, href: "/contact", linkText: "Contact" },
    { id: 7, href: `/dashboard/profile`, linkText: "Dashboard" },
  ];

  const userInfo = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    // Remove authentication cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    // Set user and userInfo to null to trigger a UI update

    dispatch(logout());
    // Redirect to home page
    router.push("/");
  };

  return (
    <nav className="container relative z-20 transition-all duration-300">
      <div className="mx-auto bg-[#FFF0ED] w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold">
              Logo
            </a>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 dark:bg-black flex items-baseline space-x-4">
              {menus.map((menu) => (
                <Link
                  key={menu.id}
                  href={menu.href}
                  className="text-gray-800 dark:text-white hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {menu.linkText}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            {isMounted && (
              <LoginComponent userInfo={userInfo} handleLogout={handleLogout} />
            )}
          </div>
          <div className="-mr-2 flex items-center gap-3 lg:hidden">
            <div className="mt-4">{/* <DarkModeToggle /> */}</div>
            {isMounted && (
              <LoginComponent userInfo={userInfo} handleLogout={handleLogout} />
            )}

            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`${
          isMobileMenuOpen
            ? "fixed inset-0 top-[64px] z-30 bg-black bg-opacity-60"
            : "hidden"
        } lg:hidden`}
      >
        <div className="px-4 pt-5 pb-3 space-y-1">
          {menus.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-100 hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
            >
              {menu.linkText}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

const LoginComponent = ({ userInfo, handleLogout }: any) => {
  return (
    <div>
      {userInfo?.image ? (
        <ProfileImageDrop img={userInfo?.image} handleLogout={handleLogout} />
      ) : (
        <Link
          href="/login"
          className="text-gray-800 dark:text-white hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
        >
          Login
        </Link>
      )}
    </div>
  );
};

const ProfileImageDrop = ({
  img,
  handleLogout,
}: {
  img: string;
  handleLogout: () => void;
}) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src={img}
              alt="User profile image"
              width={45}
              height={45}
              className="rounded-full w-[50px] h-[50px]"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem autoFocus={false}>
              <Button className="font-bold h-8 w-full bg-blue-700 text-white">
                <Link href={"/dashboard/profile"}>Profile</Link>{" "}
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Button
                className="font-bold h-8 w-full bg-red-700 text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Suspense>
    </div>
  );
};

export default Navbar;
