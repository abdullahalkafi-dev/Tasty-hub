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
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex gap-2 items-center mb-2">
          <span className="text-xl font-medium">{index + 1}.</span>
          <input
            type="checkbox"
            id={`ingredient-${index}`}
            className="mr-2 h-5 w-5"
            checked={checkedIngredients[index]}
            onChange={() => handleCheckboxChange(index)}
          />
          <label
            id={`label-${index}`}
            htmlFor={`ingredient-${index}`}
            className={`text-xl font-medium ${
              checkedIngredients[index] ? "line-through text-gray-500" : ""
            }`}
          >
            {ingredient.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default IngredientsList;
