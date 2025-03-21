import { useState } from "react";
import { Recipe } from "../pages/types";
import { createRecipe } from "../utils/recipe.routes";

const CreateRecipe: React.FC = () => {
  const [formData, setFormData] = useState<
    Omit<Recipe, "id" | "createdAt" | "updatedAt">
  >({
    title: "",
    description: "",
    ingredients: [""],
    instructions: [""],
    image: "",
    cookingTime: 0,
    servings: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe = await createRecipe(formData);
    alert(`Recipe ${newRecipe.title} created!`);
  };
  return (
    <div>
      <h1> Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Recipe Title"/>
        <textarea name ='ingredients' value={formData.ingredients} onChange={handleChange} placeholder="Recipe ingredients" />
        <textarea name ='instructions' value={formData.instructions} onChange={handleChange} placeholder="Recipe instructions" />
        <input type="text" name="image" value={formData.image || ''} onChange={handleChange} placeholder="Image URL"/>
        <input type="number" name="CookingTime" value={formData.cookingTime} onChange={handleChange} placeholder="Recipe Cooking Time"/>
        <input type="number" name="servings" value={formData.servings} onChange={handleChange} placeholder= "Servings "/>
        <button type = "submit"> Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
