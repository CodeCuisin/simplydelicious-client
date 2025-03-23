import { useEffect, useState } from "react";
import { Recipe } from "../pages/types";
import {  getRecipeById, updateRecipe } from "../utils/recipe.routes";
import './recipe.css';
import { useParams } from "react-router-dom";

const UpdateRecipe: React.FC = () => {
    const {recipeId} = useParams<{recipeId:string}> ();
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
useEffect (() => {
   
        if (recipeId)
        {
            getRecipeById(Number(recipeId))
        .then((existingRecipe) => {
          setFormData({
            title: existingRecipe.title,
            description: existingRecipe.description,
            ingredients: existingRecipe.ingredients,
            instructions: existingRecipe.instructions,
            image: existingRecipe.image || "",
            cookingTime: existingRecipe.cookingTime || "",
            serving: existingRecipe.serving || 0,
          });
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
          alert("Failed to fetch recipe.");
        });
    }
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
    if (recipeId) {
        updateRecipe(Number(recipeId), formData)
          .then((updatedRecipe) => {
            alert(`Recipe "${updatedRecipe.title}" updated successfully!`);
          })
          .catch((error) => {
            console.error("Error updating recipe:", error);
            alert("Failed to update recipe.");
          });
      }
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
       
        <button type="submit"> Create Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRecipe;
