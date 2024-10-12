/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TextField from "@/components/form/TextField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";

import ImageUpload from "@/components/ui/file-upload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BlogSchema } from "./BlogSchema";
import { foodBlogCategories } from "@/constant";
import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from "@/redux/api/features/blog/blogApi";
import LoadingAnimation from "@/app/loading";

const ReactQuillEditor = dynamic(
  () => import("@/components/common/ReactQuill/ReactQuillEditor"),
  {
    ssr: false,
  }
);
const BlogFormComponent = ({ blog }: any) => {
  const [content, setContent] = useState("");
  const userInfo = useAppSelector((state) => state.auth.user);

  // RTK Query
  // const { data: categoryRes, isLoading, error } = useGetAllCategoryQuery("");

  const [createBlog, { isLoading: isCreatingBlog }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdatingBlog }] = useUpdateBlogMutation();

  const router = useRouter();

  const categoryNames = foodBlogCategories.map((foodCategory: any) => ({
    label: foodCategory,
    value: foodCategory,
  }));

  const form = useForm({
    resolver: zodResolver(BlogSchema),
    mode: "onChange",
    defaultValues: {
      title: blog?.title || "",
      user: blog ? blog.user._id : userInfo?._id,
      blogCategory: blog?.blogCategory || "",
      description: blog?.description || "",
      image: blog?.image || "",
      isPremium: blog?.isPremium || false,
    },
  });

  const onSubmit = async (data: any) => {
    const formData = { ...data, description: content };
    console.log("Form submitted with data:", formData);
    if (!data.image) {
      return toast("Image is required", {
        style: {
          backgroundColor: "red",
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
        },
      });
    }

    if (blog) {
      // Update blog
      
      const res = await updateBlog({ body: formData, id: blog._id });
      
      if (res?.error) {
        const error = res.error as any;
        console.log(res.error);
        toast((error.data?.message as string) || "Something went wrong");
      } else {
        if (res?.data?.success) {
          router.push("/");
          toast("Blog updated successfully", { id: 1, duration: 500 });
        }
      }
      return;
    }

    const res = await createBlog(formData);

    if (res?.error) {
      const error = res.error as any;
      console.log(res.error);
      toast((error.data?.message as string) || "Something went wrong");
    }

    if (res?.data?.success) {
      router.push("/");
      toast("Blog added successfully", { id: 1, duration: 500 });
    }

    // form.reset();
  };

  const onError = (errors: any) => {
    console.log("Validation errors:", errors);
  };

  if (!userInfo || isCreatingBlog || isUpdatingBlog) {
    return <LoadingAnimation/>;
  }
  return (
    <div className="flex justify-center ">
      <div className=" w-full  max-w-[800px] border p-2 md:p-5">
        {userInfo.isPremium || userInfo.role === "admin" || (
          <p className="text-red-400">
            To make premium blogs, you need to upgrade your account to premium
          </p>
        )}
        <h1 className="text-2xl font-bold mb-4">
          {blog ? "Update Blog" : "Add Blog"}
        </h1>

        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <LabelInputContainer className="mb-4  mt-4">
                <div className="flex  items-center mt-4">
                  <input
                    disabled={!userInfo.isPremium && userInfo.role !== "admin"}
                    type="checkbox"
                    id="isPremium"
                    {...form.register("isPremium")}
                    className="mr-2 w-6 h-6" // Increased width and height for a bigger checkbox
                  />
                  <label htmlFor="isPremium" className="font-medium">
                    <p> Premium blog</p>
                  </label>
                </div>
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <TextField
                  control={form.control}
                  label="Title"
                  fieldName="title"
                  placeholder="Blog title"
                  type="text"
                />
              </LabelInputContainer>

              <div className="mb-4">
                <p className="text-[14px] pb-[8px] font-medium">
                  Blog Category
                </p>
                <LabelInputContainer className="mb-4">
                  <FormField
                    control={form.control}
                    name="blogCategory"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full  rounded-full">
                          <SelectValue placeholder="Select blog category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryNames.map((category: any) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </LabelInputContainer>
              </div>

              <LabelInputContainer className="mb-4">
                <div className="max-w-[800px]">
                  <p className="font-medium -mb-14">Description of the blog:</p>
                  <ReactQuillEditor
                    toolbarId="editor-toolbar"
                    value={content || blog?.description || ""}
                    setValue={setContent}
                    defaultValue="Enter your blog details here..."
                  />
                </div>
              </LabelInputContainer>

              <div className="w-fit mb-4 mt-24 md:mt-10 lg:mt-5 mx-auto">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          onChange={(imageUrls: any) => {
                            field.onChange(imageUrls[0]);
                          }}
                          value={[field.value as string]}
                          disabled={isCreatingBlog || isUpdatingBlog}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <LabelInputContainer className="mt-5">
                <Button
                  disabled={isCreatingBlog || isUpdatingBlog}
                  className="bg-[#b66055] rounded-full "
                >
                  {blog ? "Update Blog" : "Add Blog"}
                </Button>
              </LabelInputContainer>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BlogFormComponent;

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
