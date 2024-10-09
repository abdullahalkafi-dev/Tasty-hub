import { TRecipe } from "@/types/recipe.types";
import { format } from "date-fns";
import { Calendar, MessageSquare, ThumbsUp, UserCircle } from "lucide-react";

const RecipeTopInfo = ({recipe}:{recipe:TRecipe}) => {
  return (
    <div className="flex flex-wrap gap-5 pt-2">
    <div className="flex items-center gap-1"> <UserCircle color="#b76156"/>   <p>{recipe.user.name}</p></div>
    <div className="flex items-center gap-1"> <Calendar color="#b76156"/>  <p>{format(recipe.createdAt, "dd-mm-yyyy")}</p></div>
    <div className="flex items-center gap-1"> <MessageSquare color="#b76156"/> <p>{recipe.comments.length}</p> comments</div>
    <div className="flex items-center gap-1"> <ThumbsUp color="#b76156"/> <p>{recipe.likes.length}</p> Likes</div>
    <div className="flex items-center gap-1"> <ThumbsUp color="#b76156"/> <p>{recipe.likes.length}</p> Likes</div>
  </div>
  );
};

export default RecipeTopInfo;