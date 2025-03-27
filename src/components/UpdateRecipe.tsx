import { useEffect, useState } from "react";
import { Cuisine, Recipe, Tag } from "../pages/types";
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
} from "../utils/recipe.routes";
import { useNavigate, useParams } from "react-router-dom";
import { uploadToCloudinary } from "./CreateRecipe";
import { useAuth } from "../context/auth.context";
import Sidebar from "./Sidebar";
import { Navbar } from "./Navbar";

const UpdateRecipe: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const authorObj = user;
  const TAGS: Tag[] = ["Lunch" , "Breakfast" , "Dinner" , "Dessert" , "Snacks"];
  const CUISINES: Cuisine[] = ["Indian" , "Arabic" ,"Mexican" , "Italian" , "French","American" , "German" ,"" ];

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
          tags: existingRecipe.tags || [],
          cuisine: existingRecipe.cuisine || "",
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
    console.log(
      "Updated type of serving:",
      typeof formData.serving,
      formData.serving
    );
  }, [formData.serving]);

  const handleTagChange = (tag: Tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag) // Remove tag if it's already selected
        : [...prev.tags, tag], 
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

      const updatedData = { ...formData, image: imageUrl,tags: formData.tags, };
      console.log("Updated Data:", updatedData);

      if (recipeId) {
        const updatedRecipe = await updateRecipe(Number(recipeId), updatedData);
        alert(`Recipe "${updatedRecipe.title}" updated successfully!`);
      } else {
        const newRecipe = await createRecipe(updatedData);
        alert(`Recipe "${newRecipe.title}" created successfully!`);
      }
      navigate(`/recipes/${recipeId}`);
    } catch (error) {
      console.error("Error updating recipe:", error );
      alert("Failed to update recipe.");
    }
  };

  return (
    <div className="bg-pink-50 flex w-500 h-260 overflow-auto ">
      <Sidebar />
      <div className="font-semibold text-center ">
      <Navbar />
      <h1 className="text-3xl font-semibold text-center mt-2"> Update Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex ml-30">
        <div className="flex flex-col justify-items-center items-center text-center gap-5 m-15 ">
          <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Recipe Title"
          />
          <textarea
          className="shadow appearance-none border rounded w-96 h-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Recipe description"
          />
          <textarea
          className="shadow appearance-none border rounded w-96 h-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="ingredients"
            value={formData.ingredients.join(", ")}
            onChange={handleChange}
            placeholder="Recipe ingredients (comma-separated)"
          />
          <textarea
          className="shadow appearance-none border rounded w-96 h-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="instructions"
            value={formData.instructions.join(", ")}
            onChange={handleChange}
            placeholder="Recipe instructions (comma-separated)"
          />
           </div>
           <div className="flex flex-col justify-items-center items-center text-center gap-5 m-10 mt-15">
          <input
          className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            placeholder="Recipe Cooking Time"
          />
          <input
          className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="serving"
            value={formData.serving}
            onChange={handleChange}
            placeholder="Serving "
          />
         
          <div>
            <p className="text-xl font-semibold ">
              Select Tags:
            </p>
            {TAGS.map((tag) => (
              <label className="text-xl m-5 " key={tag}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={formData.tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  className="m-2"
                />
                {tag}
              </label>
            ))}
          </div>

          <div>
            <p className="text-xl font-semibold">
              Select Cuisine:
            </p>
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleSelectChange}
            
            >
              <option value="">Select Cuisine</option>
              {CUISINES.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
            <label>Update Image:</label>
          <input 
           className="shadow appearance-none border rounded w-96 m-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          type="file" accept="image/*" onChange={handleImageChange} />
          {formData.image && (
            <div>
              <p>Current Image:</p>
              <img src={formData.image} alt="Current Recipe" width="200" />
            </div>
          )}
          </div>
          <button className="bg-green-200 rounded-lg m-2 p-2 text-xl font-semibold" type="submit"> Update</button>
        </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateRecipe;
