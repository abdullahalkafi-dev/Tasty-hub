import { TCategory } from "./foodCategory";
import { TUser } from "./user.types";


export interface TRecipe {
    _id:string;
  user: TUser;
  name: string;
  description: string;
  
  ingredients: { name: string }[];
  readyIn: number;
  Directions: string;
  recipeImage: string;
  category: "Breakfast" | "Dinner" | "Lunch";
  foodCategory: TCategory;
  isVegetarian: boolean;
  totalPeople?: number;
  comments: string[];
  likes: string[];
  disLikes: string[];
  rating: {
    userId: string;
    ratingNumber: number;
  }[];
  totalAverageRating: number;
  status: 'published'| 'unPublished'|'pending';
  isPremium: boolean;
  isDeleted: boolean;
  createdAt:string
}
export interface TRating {
  userId: string;
  ratingNumber: number;
}
