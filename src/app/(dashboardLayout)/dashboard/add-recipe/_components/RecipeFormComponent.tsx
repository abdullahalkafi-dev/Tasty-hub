/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { addRecipeSchema } from "./addRecipeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TextField from "@/components/form/TextField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetAllCategoryQuery } from "@/redux/api/features/category/categoryApi";
import ImageUpload from "@/components/ui/file-upload";
import { toast } from "sonner";
import {
  useCreateRecipeMutation,
  useGetSingleRecipeQuery,
  useUpdateRecipeMutation,
} from "@/redux/api/features/recipe/recipeApi";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/app/loading";

const ReactQuillEditor = dynamic(
  () => import("@/components/common/ReactQuill/ReactQuillEditor"),
  {
    ssr: false,
  }
);

const RecipeFormComponent = ({ recipe }: any) => {
  const [content, setContent] = useState(recipe?.description || "");
  const userInfo = useAppSelector((state) => state.auth.user);

  console.log(recipe);
  const [ingredients, setIngredients] = useState<{ name: string }[]>(
    recipe?.ingredients || []
  );
  const [newIngredient, setNewIngredient] = useState("");

  // RTK Query
  const { data: categoryRes, isLoading, error } = useGetAllCategoryQuery("");

  const [createRecipe, { isLoading: isCreatingRecipe }] =
    useCreateRecipeMutation();
  const [updateRecipe, { isLoading: isUpdatingRecipe }] =
    useUpdateRecipeMutation();

  const router = useRouter();

  const categoryNames =
    categoryRes && categoryRes.data
      ? categoryRes.data.map((foodCategory: any) => ({
          label: foodCategory.name,
          value: foodCategory._id,
        }))
      : [];

  console.log(recipe);
  const form = useForm({
    resolver: zodResolver(addRecipeSchema),
    mode: "onChange",
    defaultValues: {
      name: recipe?.name || "",
      user: recipe ? recipe.user._id : userInfo?._id,
      ingredients: recipe?.ingredients || ingredients,
      readyIn: recipe ? recipe?.readyIn : 1,
      isVegetarian: recipe?.isVegetarian || false,
      description: recipe?.description || "",
      totalPeople: recipe?.totalPeople || 1,
      category: recipe?.category || "Dinner",
      foodCategory: recipe?.foodCategory?._id || "",
      recipeImage: recipe?.recipeImage || "",
      isPremium: recipe ? recipe?.isPremium : false,
    },
  });

  console.log(recipe ? recipe?.isPremium : false);
  const onSubmit = async (data: any) => {
    const formData = { ...data, description: content, ingredients };
    console.log("Form submitted with data:", formData);
    if (!data.recipeImage) {
      return toast("recipeImage is required", {
        style: {
          backgroundColor: "red",
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
        },
      });
    }

    if (recipe) {
      // Update recipe

      const res = await updateRecipe({ body: formData, id: recipe._id });
      console.log(res.data);
      if (res?.error) {
        const error = res.error as any;
        console.log(res.error);
        toast((error.data?.message as string) || "Something went wrong");
      } else {
        if (res?.data?.success) {
          router.push(`/recipe/${res?.data?.data._id}`);
          toast("Recipe updated successfully", { id: 1, duration: 500 });
        }
      }
      return;
    }

    const res = await createRecipe(formData);

    if (res?.error) {
      const error = res.error as any;
      console.log(res.error);
      toast((error.data?.message as string) || "Something went wrong");
    }

    if (res?.data?.success) {
      router.push(`/recipe/${res?.data?.data._id}`);
      toast("Recipe added successfully", { id: 1, duration: 500 });
    }

    form.reset();
  };

  const onError = (errors: any) => {
    console.log("Validation errors:", errors);
  };

  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, { name: newIngredient.trim() }]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };
  if (error) {
    console.error("Failed to fetch categories:", error);
    return <div>Error loading categories</div>;
  }
  if (!userInfo || isLoading) {
    return <LoadingAnimation/>;
  }
  return (
    <div className="flex justify-center ">
      <div className=" w-full  max-w-[800px] border p-2 md:p-5">
        {userInfo.isPremium || userInfo.role === "admin" || (
          <p className="text-red-400">
            To make premium recipes, you need to upgrade your account to premium
          </p>
        )}
        <h1 className="text-2xl font-bold mb-4">
          {recipe ? "Update Recipe" : "Add Recipe"}
        </h1>

        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <LabelInputContainer className="mb-4  mt-4">
                <div className="flex  items-center mt-4">
                  <input
                    disabled={!userInfo.isPremium && userInfo.role !== "admin"}
                    type="checkbox"
                    id="isPremium"
                    checked={form.watch("isPremium")}
                    {...form.register("isPremium")}
                    className="mr-2 w-6 h-6" // Increased width and height for a bigger checkbox
                  />
                  <label htmlFor="isPremium" className="font-medium">
                    <p> Premium recipe</p>
                  </label>
                </div>
              </LabelInputContainer>

              <div className="flex items-center gap-4">
                <LabelInputContainer className="mb-4 w-[80%]">
                  <TextField
                    control={form.control}
                    label="Name"
                    fieldName="name"
                    placeholder="Recipe name"
                    type="text"
                  />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4 ml-4 mt-4">
                  <div className="flex  items-center mt-4">
                    <input
                      type="checkbox"
                      id="isVegetarian"
                      {...form.register("isVegetarian")}
                      className="mr-2 w-6 h-6" // Increased width and height for a bigger checkbox
                    />
                    <label htmlFor="isVegetarian" className="font-medium">
                      <p> Is Vegetarian</p>
                    </label>
                  </div>
                </LabelInputContainer>
              </div>

              <div className="mb-4 flex flex-row gap-3 items-center">
                <LabelInputContainer className="mb-4 ">
                  <div>
                    <TextField
                      control={form.control}
                      label="ReadyIn"
                      fieldName="readyIn"
                      placeholder="Input in minutes..."
                      type="number"
                    />
                  </div>
                </LabelInputContainer>

                <div className="mt-1 w-full">
                  <p className="text-[14px] pb-[8px] font-medium">
                    Food category
                  </p>
                  <LabelInputContainer className="mb-4 ">
                    <FormField
                      control={form.control}
                      name="foodCategory"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full  rounded-full">
                            <SelectValue placeholder="Select food category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryNames.map((category: any) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </LabelInputContainer>
                </div>
              </div>
              <div className="flex justify-center gap-3 -mt-5 items-center">
                <LabelInputContainer className="mb-4">
                  <p className="text-[14px]  font-medium">Food category</p>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full mt-7 rounded-full">
                          <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Breakfast">Breakfast</SelectItem>
                          <SelectItem value="Lunch">Lunch</SelectItem>
                          <SelectItem value="Dinner">Dinner</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <div>
                    <TextField
                      control={form.control}
                      label="For Total People"
                      fieldName="totalPeople"
                      placeholder="Input in number"
                      type="number"
                    />
                  </div>
                </LabelInputContainer>
              </div>

              <LabelInputContainer className="mb-4">
                <label htmlFor="ingredient" className="font-medium">
                  Ingredients
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    id="ingredient"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Add an ingredient"
                    className="flex-grow"
                  />
                  <Button
                    type="button"
                    onClick={addIngredient}
                    className="bg-[#b66055] rounded-full"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 rounded-full px-3 py-1 flex items-center"
                    >
                      <span>{ingredient.name}</span>
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="ml-2 text-gray-600 hover:text-gray-800"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <div className="max-w-[800px]">
                  <p className="font-medium -mb-14">
                    Description of direction and nutrition facts :
                  </p>
                  <ReactQuillEditor
                    toolbarId="editor-toolbar"
                    value={content || recipe?.description || ""}
                    setValue={setContent}
                    defaultValue="Enter your recipe details here..."
                  />
                </div>
              </LabelInputContainer>
              <div className="w-fit   mb-4 mt-24 md:mt-10 lg:mt-5 mx-auto">
                <FormField
                  control={form.control}
                  name="recipeImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipe Image Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          onChange={(imageUrls: any) => {
                            field.onChange(imageUrls[0]);
                          }}
                          value={[field.value as string]}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <LabelInputContainer className="mt-5">
                <Button
                  disabled={isCreatingRecipe || isUpdatingRecipe}
                  className="bg-[#b66055] rounded-full "
                >
                  {recipe ? "Update Recipe" : "Add Recipe"}
                </Button>
              </LabelInputContainer>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RecipeFormComponent;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
