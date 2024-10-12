import BreadcrumbComponent from "@/components/common/BreadcrumbComponent";
import { TRecipe } from "@/types/recipe.types";
import RecipeTopInfo from "./_components/RecipeTopInfo";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { minuteFormat } from "@/app/utils/MinuteFormat";
import IngredientsList from "./_components/IngredientsList";
import RecipeDescriptionComponent from "./_components/RecipeDescriptionComponent";
import RecipeCommentsSection from "./_components/RecipeComment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RecipeDetailsSidebar from "./_components/recipeDetailsSidebar";

const Page = async ({ params }: { params: { recipeId: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/recipe/${params.recipeId}`,
    {
      cache: "no-cache",
    }
  );
  const data = await res.json();
  const resSideData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/recipe?limit=6`,
    {
      cache: "no-cache",
    }
  );
  const sideBarData = await resSideData.json();

  const recipe: TRecipe = data?.data;

  const breadcrumbLinks = {
    preLinks: [
      { link: "/", name: "Home" },
      { link: "/recipe", name: "Recipe" },
    ],
    pageName: recipe?.name,
  };
  if (!recipe)
    return (
      <div className="flex flex-col justify-center h-screen items-center w-full">
        <p className="font-bold text-3xl ">Recipe not found</p>
        <Link href={"/recipe"}>
          <Button className="mt-5">Go back</Button>
        </Link>
      </div>
    );
  return (
    <div>
      <div className="px-2">
        <BreadcrumbComponent links={breadcrumbLinks} />
        <div className="p-2 md:p-1  mt-5">
          <h1 className="text-2xl font-bold md:text-3xl  ">{recipe?.name}</h1>
          <RecipeTopInfo recipe={recipe} />
        </div>
        <Separator className="my-2" />
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[70%] lg:pt-5 px-5  min-h-screen ">
          <div className="w-full">
            <Image
              className="w-full object-center object-cover h-[500px]"
              alt="recipe image"
              src={recipe?.recipeImage}
              width={500}
              height={400}
            />
          </div>
          <div className="flex text-center text-xl justify-center font-medium gap-10 pt-5">
            <div className="">
              <p className="text-gray-500">Prep time: </p>
              <p>{minuteFormat(recipe?.readyIn)}</p>
            </div>
            <span className="w-[2px] bg-slate-800"></span>
            <div>
              <p className="text-gray-500">Serving</p>
              <p>{recipe?.totalPeople} people</p>
            </div>
            <span className="w-[2px] bg-slate-800"></span>
            <div>
              <p className="text-gray-500">Category</p>
              {recipe?.foodCategory?.name}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center py-5 ">
            <IngredientsList ingredients={recipe?.ingredients} />
          </div>

          <Separator className="my-1" />
          <div className="w-full min-h-[60vh] ">
            <RecipeDescriptionComponent content={recipe?.description} />
          </div>

          <div className="min-h-[30vh] w-full ">
            <RecipeCommentsSection recipeId={recipe?._id} />{" "}
            {/* Comments Section */}
          </div>
        </div>
        <div className="lg:w-[30%] min-h-screen lg:pt-5 px-5 ">
          <p className="text-2xl text-center pb-5 font-bold">You may like </p>
          {
       <RecipeDetailsSidebar recipes={sideBarData?.data} />
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
