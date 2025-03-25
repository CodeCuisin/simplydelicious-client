import { useState } from "react";
import { Cuisine, Recipe, Tag } from "../pages/types";
import { createRecipe } from "../utils/recipe.routes";
import "./recipe.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET
  );

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData
    );

    return data.secure_url; // Image URL for database
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Failed to upload image.");
  }
};
const TAGS: Tag[] = ["LUNCH", "BREAKFAST", "DINNER", "DESSERT", "SNACKS"];
const CUISINES: Cuisine[] = ["INDIAN", "ITALIAN", "MEXICAN", "FRENCH", "ARAB"];

const CreateRecipe: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const authorObj = user;
  console.log(authorObj);

  const [formData, setFormData] = useState<
    Omit<Recipe, "id" | "createdAt" | "updatedAt">
  >({
    title: "",
    description: "",
    ingredients: [""],
    instructions: [""],
    image: "",
    cookingTime: "",
    tags: [] as Tag[],
    cuisine: "" as Cuisine,
    serving: 0,
    author: authorObj,
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "serving") {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? parseInt(value) : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleIngredientsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      ingredients: value.split(",").map((ingredient) => ingredient.trim()), // Split ingredients by commas
    }));
  };

  const handleInstructionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      instructions: value.split("\n").map((instruction) => instruction.trim()), // Split instructions by newlines
    }));
  };

  const handleTagChange = (tag: Tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag) // Remove if exists
        : [...prev.tags, tag], // Add if not exists
    }));
  };

  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      cuisine: e.target.value as Cuisine,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("this is newrecipeeeeeeeee");
    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadToCloudinary(image);
      }

      const newRecipe = await createRecipe({
        ...formData,
        image: imageUrl,
        author: authorObj,
      });
      console.log("this is newrecipeeeeeeeee", newRecipe);
      alert(`Recipe ${newRecipe.title} created!`);
      setFormData({
        title: "",
        description: "",
        ingredients: [""],
        instructions: [""],
        image: "",
        cookingTime: "",
        serving: 0,
        tags: [],
        cuisine: "",
        author: authorObj,
      });
      setImage(null); // Reset image state
      navigate("/recipes");
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Failed to create recipe.");
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
            required
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
            value={formData.ingredients.join(", ")}
            onChange={handleIngredientsChange}
            placeholder="Recipe ingredients (comma separated)"
            required
          />
          <textarea
            name="instructions"
            value={formData.instructions.join("\n")}
            onChange={handleInstructionsChange}
            placeholder="Recipe instructions (newline separated)"
            required
          />
          <input
            type="file"
            name="image"
            value={formData.image || ""}
            onChange={handleImageChange}
            accept="image/*"
            placeholder="Image URL"
          />
          <input
            type="text"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            placeholder="Recipe Cooking Time"
            required
          />
          <input
            type="number"
            name="serving"
            value={formData.serving}
            onChange={handleChange}
            placeholder="Serving "
            required
          />
          <div>
            <p>
              <b>Select Tags:</b>
            </p>
            {TAGS.map((tag) => (
              <label key={tag}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={formData.tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                {tag}
              </label>
            ))}
          </div>

          <div>
            <p>
              <b>Select Cuisine:</b>
            </p>
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleCuisineChange}
              required
            >
              <option value="">Select Cuisine</option>
              {CUISINES.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>
          <button type="submit"> Create Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
