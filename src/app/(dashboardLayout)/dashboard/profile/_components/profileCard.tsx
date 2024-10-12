/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";

import { IconBowlChopsticks } from "@tabler/icons-react";
import { TUser } from "@/types/user.types";
import { useUpdateUserInfoMutation } from "@/redux/api/features/auth/authApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/form/TextField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ui/file-upload";
import { toast } from "sonner";
import { Check,  } from "lucide-react";
import { useState } from "react";
export const ProfileCard = ({ user }: { user: TUser | null }) => {
 
  const [open, setOpen] = useState(false);
  const [updateUser] = useUpdateUserInfoMutation();

  const userProfileSchema = z.object({
    name: z.string(),
    email: z.string(),
    bio: z.string().min(10).max(200).optional(),
    image: z.string().optional(),
  });
  const form = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      bio: user?.bio,
      image: user?.image,
    },
  });

  const onSubmit = async (data: any) => {
    const res = await updateUser({ id: user?._id, body: data }).unwrap();

    console.log(res.data);
    if (res.data) {
      toast("Profile updated successfully", { icon: <Check color="blue" /> });
    }

    setOpen(false);
    form.reset();
  };

  return (
    <div className="w-full">
      <div className="mx-4  bg-white shadow-xl rounded-lg text-gray-900 sm:mx-auto">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <Image
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max"
            alt="Mountain"
            width={400}
            height={128}
            layout="responsive"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <Image
            className="object-cover object-center h-32 w-full"
            src={
              user?.image ||
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max"
            }
            alt="User Image"
            width={128}
            height={128}
            layout="fixed"
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{user?.name}</h2>
          <h2 className="font-semibold">{user?.email}</h2>
          <p className="text-gray-500">{user?.bio}</p>
        </div>
        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
          <li className="flex flex-col items-center">
            <IconBowlChopsticks color="blue" />
            <p className="text-sm"> Recipe published</p>
            <div>{user?.recipePublished?.length}</div>
          </li>
          <li className="flex flex-col items-center">
            <svg
              className="w-4 fill-current text-blue-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            <p className="text-sm"> followers</p>
            <div>{user?.followers?.length}</div>
          </li>
          <li className="flex flex-col items-center">
            <svg
              className="w-4 fill-current text-blue-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            <p className="text-sm"> following</p>
            <div>{user?.following?.length}</div>
          </li>
        </ul>
        <div className="p-4 border-t mx-8 mt-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
                Edit Profile
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="">
                    <TextField
                      placeholder={user?.name || "Name"}
                      type="text"
                      fieldName="name"
                      label="User Name"
                      control={form.control}
                    />
                  </div>
                  <div className=" py-2">
                    <p className="font-medium text-[14px] pb-2">
                      Email (Read only)
                    </p>
                    <Input
                      className=" rounded-2xl"
                      readOnly
                      type="email"
                      value={user?.email}
                    />
                  </div>

                  <div className="py-b">
                    <FormField
                      control={form.control}
                      name={"bio"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{"Bio"}</FormLabel>
                          <FormControl>
                            <Textarea {...field} className={` rounded-2xl`} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-fit   mb-4 mt-24 md:mt-10 lg:mt-5 mx-auto">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Image </FormLabel>
                          <FormControl>
                            <ImageUpload
                              onChange={(imageUrls: any) => {
                                field.onChange(imageUrls[0]);
                              }}
                              value={[field.value as string]}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
