import { z } from "zod";

export const addRecipeSchema = z.object({
  user: z.string(), // Assuming user is a MongoDB ObjectId

  ingredients: z.array(
    z.object({
      name: z.string(),
    })
  ),
  readyIn: z.number().positive(),
  name: z.string().min(4),
  foodCategory: z.string(), // Assuming foodCategory is also a MongoDB ObjectId
  isVegetarian: z.boolean(),
  totalPeople: z.number().positive(),
  description: z.string(),
  recipeImage: z.string(),
  category: z.string(),
});
