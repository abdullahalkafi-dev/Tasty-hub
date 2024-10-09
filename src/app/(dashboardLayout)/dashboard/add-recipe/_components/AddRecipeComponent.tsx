/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { addRecipeSchema } from "./addRecipeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import TextField from "@/components/form/TextField";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetAllCategoryQuery } from "@/redux/api/features/category/categoryApi";

// import { useGetLoginUserInfoQuery } from "@/redux/api/features/auth/authApi";

const ReactQuillEditor = dynamic(
  () => import("@/components/common/ReactQuill/ReactQuillEditor"),
  {
    ssr: false,
  }
);
const AddRecipeComponent = () => {
  const [content, setContent] = useState("");
  const userInfo = useAppSelector((state) => state.auth.user);
  const [truncatedContent, setTruncatedContent] = useState<string>("");
  const [ingredients, setIngredients] = useState<{ name: string }[]>([]);
  const [newIngredient, setNewIngredient] = useState("");

  const {data:categoryRes} = useGetAllCategoryQuery(undefined);
console.log(categoryRes?.data);
  const form = useForm({
    resolver: zodResolver(addRecipeSchema),
    mode: "onChange",
    defaultValues: {
      name: "hello",
      user: userInfo?._id,
      ingredients: ingredients, // default array structure
      readyIn: 1, // default to 0
      isVegetarian: false, // default to false
      description: "", // default to empty string
      totalPeople: 1, // default to 1
      category: "Dinner",
      foodCategory: "67043d0e236747591ac15c17",

      recipeImage: "https://www.youtube.com",
      // default to empty string
    },
  });

  const onSubmit = (data: any) => {
    const formData = { ...data, description: content, ingredients };
    console.log("Form submitted with data:", formData);
  };

  const onError = (errors: any) => {
    console.log("Validation errors:", errors);
  };
  const details = true;

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
  useEffect(() => {
    const truncateContent = (text: string | undefined, maxLength: number) => {
      if (!text) return "";
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };

    if (details) {
      setTruncatedContent(content || "");
    } else {
      setTruncatedContent(truncateContent(content, 300));
    }
  }, [content, details]);

  return (
    <div className="flex justify-center  min-h-screen ">
      <div className=" w-full  max-w-[800px]">
        <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>

        <div
          className="prose  overflow-hidden"
          dangerouslySetInnerHTML={{ __html: truncatedContent || "" }}
        />
        <p>{userInfo?._id}</p>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <LabelInputContainer className="mb-4">
                <TextField
                  control={form.control}
                  label="Name"
                  fieldName="name"
                  placeholder="Cute salad"
                  type="text"
                />
              </LabelInputContainer>

              <div className="mb-4 flex flex-row gap-2 items-center">
                <LabelInputContainer className="mb-4 ">
                  <div>
                    <TextField
                      control={form.control}
                      label="ReadyIn"
                      fieldName="readIn1"
                      placeholder="Input in minutes..."
                      type="number"
                    />
                  </div>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4 ">
                  <div>
                    <TextField
                      control={form.control}
                      label="ReadyIn"
                      fieldName="readIn1"
                      placeholder="Input in minutes..."
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
                    value={content}
                    setValue={setContent}
                    defaultValue="Enter your recipe details here..."
                  />
                </div>
              </LabelInputContainer>

              <LabelInputContainer className="mb-4 mt-16 md:mt-10 lg:mt-5">
                <Button className="bg-[#b66055] rounded-full ">
                  Add Recipe
                </Button>
              </LabelInputContainer>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeComponent;
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
