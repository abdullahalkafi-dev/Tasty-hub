
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX, SVGProps } from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-4 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-2">
        <CircleCheckIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Payment successful</h1>
        <p className="max-w-[600px] text-center text-gray-500 md:text-xl/relaxed dark:text-gray-400">
          Your order has been confirmed and is now being processed.
        </p>
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row">
        <Link
          href="/"
          className="flex-1 inline-flex items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          prefetch={false}
        >

   <Button > Back to home</Button>
      
        </Link>
      </div>
    </div>
  );
};

export default Page;

function CircleCheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
  