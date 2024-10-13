import { TUser } from "./user.types";

export interface TBlog {
  _id: string;
  user: TUser;
  blogCategory: string;

  title: string;
  description: string;
  image: string;
  isPremium: boolean;
  createdAt: string;
}
