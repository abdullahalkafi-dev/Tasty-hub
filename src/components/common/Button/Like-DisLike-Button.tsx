// "use client";

// import { useEffect, useState } from "react";
// import { ThumbsDown, ThumbsUp } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   useAddLikeMutation,
//   useAddDislikeMutation,
//   useGetSingleRecipeQuery,
// } from "@/redux/api/features/recipe/recipeApi";

// interface LikeDislikeButtonProps {
//   foodId: string;
//   initialLikes: number;
//   initialDislikes: number;
//   initialUserReaction: "like" | "dislike" | null;
//   size?: "default" | "large";
// }

// export function LikeDislikeButton({
//   foodId,
//   initialLikes = 0,
//   initialDislikes = 0,
//   initialUserReaction = null,
//   size = "default",
// }: LikeDislikeButtonProps) {
//   const [likes, setLikes] = useState(initialLikes);
//   const [dislikes, setDislikes] = useState(initialDislikes);
//   const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
//     initialUserReaction
//   );
//   const [isPending, setIsPending] = useState(false);

//   // Fetch recipe data
//   const { data, isLoading } = useGetSingleRecipeQuery(foodId);
//   const [addLike] = useAddLikeMutation();
//   const [addDislike] = useAddDislikeMutation();

//   useEffect(() => {
//     if (!data?.data) return;

//     // Synchronize user reaction with the server
//     const isLiked = data.data.likes.includes(data.data.user?._id);
//     const isDisliked = data.data.disLikes.includes(data.data.user?._id);

//     setUserReaction(isLiked ? "like" : isDisliked ? "dislike" : null);

//     // Synchronize likes and dislikes count
//     setLikes(data.data.likes.length);
//     setDislikes(data.data.disLikes.length);
//   }, [data]);

//   if (isLoading) {
//     return (
//       <div className="h-4 w-4 animate-pulse bg-gray-200 rounded-full"></div>
//     );
//   }

//   const handleLike = async () => {
//     if (isPending) return;
//     setIsPending(true);

//     try {
//       if (userReaction === "like") {
//         // User is unliking
//         setUserReaction(null);
//         setLikes((prev) => prev - 1);
//         await addLike(foodId).unwrap();
//       } else {
//         // User is liking
//         if (userReaction === "dislike") {
//           setDislikes((prev) => prev - 1);
//         }
//         setUserReaction("like");
//         setLikes((prev) => prev + 1);
//         await addLike(foodId).unwrap();
//       }
//     } catch (error) {
//       console.error("Error handling like:", error);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   const handleDislike = async () => {
//     if (isPending) return;
//     setIsPending(true);

//     try {
//       if (userReaction === "dislike") {
//         // User is undisliking
//         setUserReaction(null);
//         setDislikes((prev) => prev - 1);
//         await addDislike(foodId).unwrap();
//       } else {
//         // User is disliking
//         if (userReaction === "like") {
//           setLikes((prev) => prev - 1);
//         }
//         setUserReaction("dislike");
//         setDislikes((prev) => prev + 1);
//         await addDislike(foodId).unwrap();
//       }
//     } catch (error) {
//       console.error("Error handling dislike:", error);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <div className="flex items-center">
//         <Button
//           variant="ghost"
//           size={size === "large" ? "lg" : "sm"}
//           className={cn(
//             "flex items-center gap-2 text-gray-600 hover:text-green-600",
//             userReaction === "like" && "text-green-600"
//           )}
//           onClick={handleLike}
//           disabled={isPending}
//         >
//           <ThumbsUp
//             className={cn(
//               size === "large" ? "h-6 w-6" : "h-4 w-4",
//               userReaction === "like" && "fill-green-600"
//             )}
//           />
//           <span className={size === "large" ? "text-lg font-medium" : ""}>
//             {likes}
//           </span>
//         </Button>
//       </div>

//       <div className="flex items-center">
//         <Button
//           variant="ghost"
//           size={size === "large" ? "lg" : "sm"}
//           className={cn(
//             "flex items-center gap-2 text-gray-600 hover:text-red-600",
//             userReaction === "dislike" && "text-red-600"
//           )}
//           onClick={handleDislike}
//           disabled={isPending}
//         >
//           <ThumbsDown
//             className={cn(
//               size === "large" ? "h-6 w-6" : "h-4 w-4",
//               userReaction === "dislike" && "fill-red-600"
//             )}
//           />
//           <span className={size === "large" ? "text-lg font-medium" : ""}>
//             {dislikes}
//           </span>
//         </Button>
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { useEffect, useState } from "react";
// import { ThumbsDown, ThumbsUp } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   useAddLikeMutation,
//   useAddDislikeMutation,
//   useGetSingleRecipeQuery,
// } from "@/redux/api/features/recipe/recipeApi";

// interface LikeDislikeButtonProps {
//   foodId: string;
//   initialLikes: number;
//   initialDislikes: number;
//   initialUserReaction: "like" | "dislike" | null;
//   size?: "default" | "large";
// }

// export function LikeDislikeButton({
//   foodId,

//   size = "default",
// }: LikeDislikeButtonProps) {

//   const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
//     null
//   );
//   const [isPending, setIsPending] = useState(false);

//   // Fetch recipe data
//   const { data, isLoading } = useGetSingleRecipeQuery(foodId);
//   const [addLike] = useAddLikeMutation();
//   const [addDislike] = useAddDislikeMutation();

//   useEffect(() => {
//     if (!data?.data) return;

//     // Synchronize user reaction with the server
//     const isLiked = data.data.likes.includes(data.data.user?._id);
//     const isDisliked = data.data.disLikes.includes(data.data.user?._id);

//     setUserReaction(isLiked ? "like" : isDisliked ? "dislike" : null);

//     // Synchronize likes and dislikes count

//   }, [data]);

//   if (isLoading) {
//     return (
//       <div className="h-4 w-4 animate-pulse bg-gray-200 rounded-full"></div>
//     );
//   }

//   const handleLike = async () => {
//     if (isPending) return;
//     setIsPending(true);

//     try {
//       if (userReaction === "like") {
//         // User is unliking
//         setUserReaction(null);
//         setLikes((prev) => prev - 1);
//         await addLike(foodId).unwrap();
//       } else {
//         // User is liking
//         if (userReaction === "dislike") {
//           setDislikes((prev) => prev - 1);
//         }
//         setUserReaction("like");
//         setLikes((prev) => prev + 1);
//         await addLike(foodId).unwrap();
//       }
//     } catch (error) {
//       console.error("Error handling like:", error);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   const handleDislike = async () => {
//     if (isPending) return;
//     setIsPending(true);

//     try {
//       if (userReaction === "dislike") {
//         // User is undisliking
//         setUserReaction(null);
//         setDislikes((prev) => prev - 1);
//         await addDislike(foodId).unwrap();
//       } else {
//         // User is disliking
//         if (userReaction === "like") {
//           setLikes((prev) => prev - 1);
//         }
//         setUserReaction("dislike");
//         setDislikes((prev) => prev + 1);
//         await addDislike(foodId).unwrap();
//       }
//     } catch (error) {
//       console.error("Error handling dislike:", error);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <div className="flex items-center">
//         <Button
//           variant="ghost"
//           size={size === "large" ? "lg" : "sm"}
//           className={cn(
//             "flex items-center gap-2 text-gray-600 hover:text-green-600",
//             userReaction === "like" && "text-green-600"
//           )}
//           onClick={handleLike}
//           disabled={isPending}
//         >
//           <ThumbsUp
//             className={cn(
//               size === "large" ? "h-6 w-6" : "h-4 w-4",
//               userReaction === "like" && "fill-green-600"
//             )}
//           />
//           <span className={size === "large" ? "text-lg font-medium" : ""}>
//             {likes}
//           </span>
//         </Button>
//       </div>

//       <div className="flex items-center">
//         <Button
//           variant="ghost"
//           size={size === "large" ? "lg" : "sm"}
//           className={cn(
//             "flex items-center gap-2 text-gray-600 hover:text-red-600",
//             userReaction === "dislike" && "text-red-600"
//           )}
//           onClick={handleDislike}
//           disabled={isPending}
//         >
//           <ThumbsDown
//             className={cn(
//               size === "large" ? "h-6 w-6" : "h-4 w-4",
//               userReaction === "dislike" && "fill-red-600"
//             )}
//           />
//           <span className={size === "large" ? "text-lg font-medium" : ""}>
//             {dislikes}
//           </span>
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  useAddLikeMutation,
  useAddDislikeMutation,
  useGetSingleRecipeQuery,
} from "@/redux/api/features/recipe/recipeApi";
import { useAppSelector } from "@/lib/hooks";

interface LikeDislikeButtonProps {
  foodId: string;
  size?: "default" | "large";
}

export function LikeDislikeButton({
  foodId,
  size = "large",
}: LikeDislikeButtonProps) {
  const { data, isLoading, refetch } = useGetSingleRecipeQuery(foodId);
  const [addLike, { isLoading: likeLoading }] = useAddLikeMutation();
  const [addDislike, { isLoading: dislikeLoading }] = useAddDislikeMutation();
    const loggedInUser = useAppSelector((state) => state.auth.user);
  const userId = loggedInUser?._id;

  const userReaction = data?.data?.likes?.includes(userId)
    ? "like"
    : data?.data?.disLikes?.includes(userId)
    ? "dislike"
    : null;

  const handleLike = async () => {
    if (likeLoading || dislikeLoading) return;

    try {
      await addLike(foodId).unwrap();
      await refetch(); // Refetch to get the latest state from the server
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleDislike = async () => {
    if (likeLoading || dislikeLoading) return;

    try {
      await addDislike(foodId).unwrap();
      await refetch(); // Refetch to get the latest state from the server
    } catch (error) {
      console.error("Error handling dislike:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-4 w-4 animate-pulse bg-gray-200 rounded-full"></div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size={size === "large" ? "lg" : "sm"}
          className={cn(
            "flex items-center gap-2 text-gray-600 hover:text-green-600",
            userReaction === "like" && "text-green-600"
          )}
          onClick={handleLike}
          disabled={likeLoading || dislikeLoading}
        >
          <ThumbsUp
            className={cn(
              size === "large" ? "h-6 w-6" : "h-4 w-4",
              userReaction === "like" && "fill-green-600"
            )}
          />
          <span className={size === "large" ? "text-lg font-medium" : ""}>
            {data?.data?.likes?.length || 0}
          </span>
        </Button>
      </div>

      <div className="flex items-center">
        <Button
          variant="ghost"
          size={size === "large" ? "lg" : "sm"}
          className={cn(
            "flex items-center gap-2 text-gray-600 hover:text-red-600",
            userReaction === "dislike" && "text-red-600"
          )}
          onClick={handleDislike}
          disabled={likeLoading || dislikeLoading}
        >
          <ThumbsDown
            className={cn(
              size === "large" ? "h-6 w-6" : "h-4 w-4",
              userReaction === "dislike" && "fill-red-600"
            )}
          />
          <span className={size === "large" ? "text-lg font-medium" : ""}>
            {data?.data?.disLikes?.length || 0}
          </span>
        </Button>
      </div>
    </div>
  );
}
