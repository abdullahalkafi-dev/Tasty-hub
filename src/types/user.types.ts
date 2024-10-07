export interface TUser {
  name: string;
  image: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  followers: string[];
  isPremium: boolean;
  recipePublished: string[];
  socialLinks: { name: "facebook" | "instagram"; link: string }[];
}
