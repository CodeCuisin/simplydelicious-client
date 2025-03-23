import { useState } from "react";
import { Recipe } from "../pages/types";
import { createRecipe } from "../utils/recipe.routes";
import './recipe.css';

const CreateRecipe: React.FC = () => {
  const [formData, setFormData] = useState<
    Omit<Recipe, "id" | "createdAt" | "updatedAt"> >({
    title: "",
    description: "",
    ingredients: [""],
    instructions: [""],
    image: "",
    cookingTime: "",
    serving: 0,
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
      <h1 className="title"> Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="create">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe Title"
        />
           <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Recipe description"
        />
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Recipe ingredients"
        />
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Recipe instructions"
        />
        <input
          type="text"
          name="image"
          value={formData.image || ""}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <input
          type="text"
          name="cookingTime"
          value={formData.cookingTime}
          onChange={handleChange}
          placeholder="Recipe Cooking Time"
        />
        <input
          type="number"
          name="serving"
          value={formData.serving}
          onChange={handleChange}
          placeholder="Serving "
        />
       
        <button type="submit"> Create Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
