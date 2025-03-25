import { useEffect, useState } from "react";
import { Recipe } from "../pages/types";
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
} from "../utils/recipe.routes";
import "./recipe.css";
import { useNavigate, useParams } from "react-router-dom";
import { uploadToCloudinary } from "./CreateRecipe";
import { useAuth } from "../context/auth.context";

const UpdateRecipe: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user)
  const authorId = user ? user.id : 0;
  console.log(authorId)
  const authorObj = user;
  console.log(authorObj)

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
    author: authorObj,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

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
          author: authorObj,
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

    setFormData((prev) => {
      if (name === "ingredients" || name === "instructions") {
        return { ...prev, [name]: value.split(",").map((item) => item.trim()) };
      }
  
      if (name === "serving") {
        const parsedValue = parseInt(value, 10);
        return { ...prev, [name]: isNaN(parsedValue) ? 0 : parsedValue };
      }
  
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
  console.log("Updated type of serving:", typeof formData.serving, formData.serving);
}, [formData.serving]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;

      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      const imageUrlWithTimestamp = `${imageUrl}?t=${new Date().getTime()}`;

      console.log("Final Image URL:", imageUrlWithTimestamp);
      console.log("Final Image URL:", imageUrl);
      const updatedData = { ...formData, image: imageUrl };
      console.log("Updated Data:", updatedData);
      if (recipeId) {
        const updatedRecipe = await updateRecipe(Number(recipeId), updatedData);
        alert(`Recipe "${updatedRecipe.title}" updated successfully!`);
      } else {
        const newRecipe = await createRecipe(updatedData);
        alert(`Recipe "${newRecipe.title}" created successfully!`);
      }
      navigate(`/recipes/${recipeId }`);
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
            value={formData.ingredients.join(", ")}
            onChange={handleChange}
            placeholder="Recipe ingredients (comma-separated)"
          />
          <textarea
            name="instructions"
            value={formData.instructions.join(", ")}
            onChange={handleChange}
            placeholder="Recipe instructions (comma-separated)"
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
          <label>Update Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image && (
            <div>
              <p>Current Image:</p>
              <img src={formData.image} alt="Current Recipe" width="200" />
            </div>
          )}

          <button type="submit"> Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRecipe;
