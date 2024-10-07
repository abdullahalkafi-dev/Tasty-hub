"use client";
import { format } from "date-fns";
import { TRecipe } from "@/types/recipe.types";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const RecipeCard = ({ recipe }: { recipe: TRecipe }) => {
  return (
    <div className="shadow-lg rounded-xl">
      <div className="flex flex-col space-y-3">
        {/* Container for maintaining aspect ratio and filling image */}
        <div className="relative rounded-t-xl overflow-hidden h-[200px] w-full">
          <Image
            src={recipe.recipeImage}
            alt="recipe"
            layout="fill" // Ensures the image fills the container
            className="bg-gray-100 hover:scale-105 transition-all duration-500 object-cover" // Crops the image to cover the full space
          />
        </div>
        <div className="py-2 px-5 space-y-2">
          <Badge variant={"secondary"} className={"mb-2"}>
            {recipe.foodCategory.name}
          </Badge>
          <Link href={`/recipe/${recipe._id}`}>
            <h3 className="leading-[26px] font-bold text-tourHub-title2 hover:opacity-75 duration-300 line-clamp-2">
              {recipe.name}
            </h3>
          </Link>
          <p className="pt-2 text-[12px] text-tourHub-gray mb-2">
            Published: {format(new Date(recipe.createdAt), "dd MMMM yyyy")}
          </p>

          <div className="flex items-center gap-x-2 pb-2">
            <Avatar className="w-7 h-7">
              <AvatarImage src={recipe?.user?.image} />
              <AvatarFallback>TH</AvatarFallback>
            </Avatar>
            <p className="text-[12px] text-tourHub-title2 font-medium">
              {recipe?.user?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
