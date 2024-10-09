import BreadcrumbComponent from "@/components/common/BreadcrumbComponent";
import { TRecipe } from "@/types/recipe.types";
import RecipeTopInfo from "./_components/RecipeTopInfo";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { minuteFormat } from "@/app/utils/MinuteFormat";

const Page = async ({ params }: { params: { recipeId: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_BASE_URL}/recipe/${params.recipeId}`
  );
  const data = await res.json();
  const recipe: TRecipe = data?.data;
  console.log(data);
  const breadcrumbLinks = {
    preLinks: [
      { link: "/", name: "Home" },
      { link: "/recipe", name: "Recipe" },
    ],
    pageName: recipe?.name,
  };
  console.log(data);
  return (
    <div>
      <div className="px-2">
        <BreadcrumbComponent links={breadcrumbLinks} />
        <div className="p-2 md:p-1  mt-5">
          <h1 className="text-2xl font-bold md:text-3xl  ">{recipe.name}</h1>
          <RecipeTopInfo recipe={recipe} />
        </div>
      </div>
      <Separator className="mt-2" />

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[70%] lg:pt-5 px-5  min-h-screen ">
          <div className="w-full">
            <Image
              className="w-full object-center object-cover h-[500px]"
              alt="recipe image"
              src={recipe.recipeImage}
              width={500}
              height={400}
            />
          </div>
          <div className="flex text-center text-xl justify-center font-medium gap-10 pt-5">
            <div className="">
              <p className="text-gray-500">Prep time: </p>
              <p>{minuteFormat(recipe.readyIn)}</p>
            </div>
            <span className="w-[2px] bg-slate-800"></span>
            <div>
              <p className="text-gray-500">Serving</p>
              <p>{recipe.totalPeople} people</p>
            </div>
            <span className="w-[2px] bg-slate-800"></span>
            <div>
              <p className="text-gray-500">Category</p>
              <p>{recipe.foodCategory.name}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center py-16 ">
            <p>ingredients ingredients</p>
            <p>ingredients ingredients</p>
            <p>ingredients ingredients</p>
            <p>ingredients ingredients</p>
            <p>ingredients ingredients</p>
          </div>

          <Separator className="my-1" />
          <div className="w-full h-[60vh] bg-green-300">description</div>

<div className="h-[30vh] w-full bg-yellow-200">

</div>


        </div>
        <div className="lg:w-[30%] min-h-screen lg:pt-5 px-5 bg-blue-200">
          sdfds
        </div>
      </div>
    </div>
  );
};

export default Page;
