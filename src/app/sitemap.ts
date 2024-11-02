/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRecipe } from "@/services/recipeServices";

export default async function sitemap() {
  const baseUrl = "https://tasty-hub-chi.vercel.app";
  const allRecipesRes = await getRecipe();
  const allRecipes = allRecipesRes.data;

  const recipeUrls = allRecipes.map((recipe: any) => {
    return {
      url: `${baseUrl}/recipe/${recipe._id}`,
      lastModified: new Date(recipe.updatedAt).toISOString(),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...recipeUrls,
  ];
}
