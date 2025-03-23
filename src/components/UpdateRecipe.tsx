import { useEffect, useState } from "react";
import { Recipe } from "../pages/types";
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
} from "../utils/recipe.routes";
import "./recipe.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRecipe: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<
    Omit<Recipe, "id" | "createdAt" | "updatedAt">
  >({
    title: "",
    description: "",
    ingredients: [""],
    instructions: [""],
    image: "",
    cookingTime: "",
    serving: 0,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) return;

      const id = Number(recipeId);
      if (isNaN(id)) {
        console.error("Invalid recipe ID:", recipeId);
        alert("Invalid recipe ID.");
        return;
      }
      try {
        const existingRecipe = await getRecipeById(id);
        setFormData({
          title: existingRecipe.title,
          description: existingRecipe.description,
          ingredients: existingRecipe.ingredients,
          instructions: existingRecipe.instructions,
          image: existingRecipe.image || "",
          cookingTime: existingRecipe.cookingTime || "",
          serving: existingRecipe.serving || 0,
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
        alert("Failed to fetch recipe.");
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "ingredients" || name === "instructions") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (recipeId) {
        const updatedRecipe = await updateRecipe(Number(recipeId), formData);
        alert(`Recipe "${updatedRecipe.title}" updated successfully!`);
      } else {
        const newRecipe = await createRecipe(formData);
        alert(`Recipe "${newRecipe.title}" created successfully!`);
      }
      navigate("/recipes");
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe.");
    }
  };

  return (
    <div>
      <h1 className="title"> Update Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="create">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Recipe Title"
          />
           <textarea
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
            type="number"
            name="CookingTime"
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

          <button type="submit"> Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRecipe;
