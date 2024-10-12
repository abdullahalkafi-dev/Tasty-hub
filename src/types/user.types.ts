export interface TUser {
  _id: string;
  name: string;
  image: string;
  email: string;
  bio: string;
  password?: string;
  role: "admin" | "user";
  followers: TUser[];
  following: TUser[];
  isPremium: boolean;
  recipePublished: string[];
  socialLinks: { name: "facebook" | "instagram"; link: string }[];
}
