"use client";
import { format } from "date-fns";
import type { TRecipe } from "@/types/recipe.types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useAppSelector } from "@/lib/hooks";
import {
  useFollowUserMutation,
  useGetSingleUserQuery,
  useUnFollowUserMutation,
} from "@/redux/api/features/auth/authApi";
import type { TUser } from "@/types/user.types";
import { ThumbsDown, ThumbsUp, Clock, Users } from "lucide-react";
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
    if (res.error) {
      console.log(res.error);
    }
    if (res.data?.success) {
      toast("Followed successfully");
    }
    await refetch();
  };

  const totalLikes = recipe.likes?.length || 0;
  const totalDisLikes = recipe.disLikes?.length || 0;

  return (
    <div className="overflow-hidden shadow-lg bg-[#FFF0ED] rounded-xl hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col">
        <div className="relative rounded-t-xl overflow-hidden h-[220px] w-full">
          <Image
            src={recipe.recipeImage || "/placeholder.svg"}
            alt={recipe.name}
            layout="fill"
            className="bg-gray-100 hover:scale-105 transition-all duration-500 object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="font-medium bg-white/80 backdrop-blur-sm text-tourHub-title2"
            >
              {recipe.foodCategory.name}
            </Badge>
          </div>
          {recipe.isPremium && (
            <div className="absolute top-3 right-3">
              <PremiumIcon />
            </div>
          )}
        </div>

        <div className="py-4 px-5 space-y-3">
          <Link href={`/recipe/${recipe._id}`}>
            <h3 className="text-xl leading-[26px] font-bold text-tourHub-title2 hover:text-tourHub-primary duration-300 line-clamp-2">
              {recipe.name}
            </h3>
          </Link>

          <div className="flex items-center gap-4 text-sm text-tourHub-gray">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.readyIn} min</span>
            </div>
            {recipe.totalPeople && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{recipe.totalPeople} servings</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4 text-green-600" />
                <span className="text-sm">{totalLikes}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsDown className="w-4 h-4 text-red-600" />
                <span className="text-sm">{totalDisLikes}</span>
              </div>
            </div>
            <p className="text-[12px] text-tourHub-gray">
              {format(new Date(recipe.createdAt), "dd MMMM yyyy")}
            </p>
          </div>

          <div className="border-t border-gray-200 my-2"></div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                <AvatarImage
                  src={recipe?.user?.image || "/placeholder.svg"}
                  alt={recipe?.user?.name}
                />
                <AvatarFallback>
                  {recipe?.user?.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm text-tourHub-title2 font-medium">
                {recipe?.user?.name}
              </p>
            </div>

            {latestUser?._id !== recipe.user._id && (
              <div>
                {latestUser?.following?.some(
                  (u) => u._id === recipe.user._id
                ) ? (
                  <button
                    onClick={handleUnFollow}
                    className="h-8 px-4 text-sm font-medium text-blue-500 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    UnFollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollow}
                    className="h-8 px-4 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
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
