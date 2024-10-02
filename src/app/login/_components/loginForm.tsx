/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { z } from "zod";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form} from "@/components/ui/form";
import TextField from "@/components/form/textField";



const userSignUpSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email(),
  password: z.string(),
  image: z.string(),
});

export default function LoginForm() {
    const searchParams = useSearchParams();

    const redirect = searchParams.get("redirect");
  const form = useForm({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
    },
  });
  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to TastyHub
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to TastyHub to discover amazing recipes and share your own.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-8">
    

          <LabelInputContainer className="mb-4">
            <TextField
              control={form.control}
              placeholder="example@gmail.com"
              fieldName={"email"}
              type={"email"}
              label={"email"}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <TextField
              control={form.control}
              placeholder="••••••••"
              fieldName={"password"}
              type={"password"}
              label={"Password"}
            />
          </LabelInputContainer>

        

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
 </form></Form>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                signIn("google", { callbackUrl: redirect ? redirect : "/" });
              }}
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
          </div>
          <div className="flex   justify-center pt-3  gap-2">
            <p>Don&apos;t have account </p>{" "}
            <Link href={"/signup"}>
              <p className="text-blue-500 font-bold hover:underline">SignUp</p>{" "}
            </Link>
          </div>
       
      
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
