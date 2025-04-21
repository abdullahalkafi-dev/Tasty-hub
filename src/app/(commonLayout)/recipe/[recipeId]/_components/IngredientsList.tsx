// IngredientsList.tsx
"use client";

import { useState } from "react";

interface Ingredient {
  name: string;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(ingredients.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    const newCheckedIngredients = [...checkedIngredients];
    newCheckedIngredients[index] = !newCheckedIngredients[index];
    setCheckedIngredients(newCheckedIngredients);
  };

  return (
    <div className="flex flex-col justify-center items-center py-16">
    <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
    <p className="text-lg mb-8">
      Check off the ingredients as you gather them:
    </p>
  
    <div className="w-full max-w-xl space-y-2">
      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="grid grid-cols-[2rem_1fr] items-center gap-2"
        >
          <span className="text-xl font-medium">{index + 1}.</span>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`ingredient-${index}`}
              className="h-5 w-5"
              checked={checkedIngredients[index]}
              onChange={() => handleCheckboxChange(index)}
            />
            <label
              htmlFor={`ingredient-${index}`}
              className={`text-xl font-medium ${
                checkedIngredients[index] ? "line-through text-gray-500" : ""
              }`}
            >
              {ingredient.name}
            </label>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default IngredientsList;
