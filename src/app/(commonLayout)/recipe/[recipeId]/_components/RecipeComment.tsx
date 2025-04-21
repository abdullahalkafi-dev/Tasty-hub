/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LoadingAnimation from "@/app/loading";
import TextField from "@/components/form/TextField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/lib/hooks";
import {
  useCreateCommentMutation,
  useGetRecipeCommentQuery,
} from "@/redux/api/features/recipe/recipeApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function RecipeCommentsSection({
  recipeId,
}: {
  recipeId: string;
}) {
  const { data: commentsRes, isLoading } = useGetRecipeCommentQuery(recipeId);
  const user = useAppSelector((state) => state.auth.user);
  const [createComment] = useCreateCommentMutation();
  const route = useRouter();
  const comments = commentsRes?.data;
  const commentSchema = z.object({
    title: z.string().nonempty().min(4),
    comment: z.string().nonempty().min(10),
  });
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      title: "",
      comment: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (data: any) => {
    if (!user) {
      route.push("/login");
      toast.error("Please login to comment");
      return;
    }

    const dataFormate = {
      userId: user?._id,
      recipeId: recipeId,
      title: data.title,
      comment: data.comment,
    };

    const res = await createComment(dataFormate);
    console.log(res.data);
    if (res.data.success) {
      toast.success("Comment added successfully");
      form.reset();
    }
  };
  if (isLoading) {
    return <LoadingAnimation />;
  }
  return (
    <>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>

          <div className="space-y-4">
            {comments.map((comment: any) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <Image
                    src={comment?.userId?.image}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{comment.name}</h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(comment.createdAt), "dd-MM-yyyy")}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 font-bold">{comment.title}</p>
                <p className="text-gray-700 text-sm">{comment.comment}</p>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 bg-white p-4 rounded-lg shadow"
            >
              <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
              <div className="mb-4">
                <TextField
                  control={form.control}
                  fieldName="title"
                  label="Title"
                  placeholder="Comment Title"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Comment
                </label>
                <FormField
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          name="comment"
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Post Comment
              </button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
