"use client";
import { format } from "date-fns";
import { TRecipe } from "@/types/recipe.types";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import { useAppSelector } from "@/lib/hooks";
import {
  useFollowUserMutation,
  useGetSingleUserQuery,
  useUnFollowUserMutation,
} from "@/redux/api/features/auth/authApi";
import { TUser } from "@/types/user.types";
import PremiumIcon from "./utils/PremiumIcon";

const RecipeCard = ({ recipe }: { recipe: TRecipe }) => {
  const loggedInUser = useAppSelector((state) => state.auth.user);

  const { data, refetch } = useGetSingleUserQuery(loggedInUser?._id);
  const latestUser = data?.data as TUser;
  const [unFollow] = useUnFollowUserMutation();
  const [follow] = useFollowUserMutation();
  const handleUnFollow = async () => {
    if (!loggedInUser) return toast("Please login to follow users");
    const res = await unFollow({
      id: loggedInUser?._id,
      targetUserId: recipe.user._id,
    });
    if (res.error) {
      console.log(res.error);
    }
    if (res.data?.success) {
      toast("UnFollowed successfully");
    }
    await refetch();
  };

  const handleFollow = async () => {
    if (!loggedInUser) return toast("Please login to follow users");
    const res = await follow({
      id: loggedInUser?._id,
      targetUserId: recipe.user._id,
    });
    console.log(res);
    if (res.error) {
      console.log(res.error);
    }

    if (res.data?.success) {
      toast("Followed successfully");
    }
    await refetch();
  };

  // const latestUser = data?.data as TUser;

  return (
    <div className="shadow-lg bg-[#FFF0ED] rounded-xl">
      <div className="flex flex-col space-y-3">
        {/* Container for maintaining aspect ratio and filling image */}
        <div className="relative rounded-t-xl overflow-hidden h-[200px] w-full">
          <Image
            src={recipe.recipeImage}
            alt={recipe.name}
            loading="lazy"
            layout="fill" // Ensures the image fills the container
            className="bg-gray-100 hover:scale-105 transition-all duration-500 object-cover" // Crops the image to cover the full space
          />
        </div>
        <div className="py-2 px-5 space-y-2">
          <div className="flex items-center justify-between gap-1">
            <Badge variant={"secondary"} className={"mb-2"}>
              {recipe.foodCategory.name}
            </Badge>
            {recipe.isPremium && <PremiumIcon />}
          </div>

          <Link href={`/recipe/${recipe._id}`}>
            <h3 className="leading-[26px] font-bold text-tourHub-title2 hover:opacity-75 duration-300 line-clamp-2">
              {recipe.name}
            </h3>
          </Link>
          <p className="pt-2 text-[12px] text-tourHub-gray mb-2">
            Published: {format(new Date(recipe.createdAt), "dd MMMM yyyy")}
          </p>

          <div className="flex justify-between">
            <div className="flex items-center gap-x-2 pb-2">
              <Avatar className="w-7 h-7">
                <AvatarImage src={recipe?.user?.image} />
                <AvatarFallback>TH</AvatarFallback>
              </Avatar>
              <p className="text-[12px] text-tourHub-title2 font-medium">
                {recipe?.user?.name}
              </p>
            </div>
            {latestUser?._id === recipe.user._id || (
              <div>
                {latestUser?.following?.some(
                  (u) => u._id === recipe.user._id
                ) ? (
                  <button
                    onClick={() => handleUnFollow()}
                    className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                  >
                    UnFollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow()}
                    className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
