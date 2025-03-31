import { useEffect, useState } from "react";
import { Recipe, Tag } from "./types";
import { getRecipes } from "../utils/recipe.routes";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Navbar } from "../components/Navbar";

const Category: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<Tag | "All">("All");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (err) {
        setError("Failed to load recipes. Please try again.");
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  const allTags: Tag[] = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks"];

  const filteredRecipes =
    selectedTag === "All"
      ? recipes
      : recipes.filter((recipe) => recipe.tags.includes(selectedTag));

  return (
    <div className="flex bg-pink-50 w-500 h-320 ">
      <Sidebar />
      <div className="flex flex-col ">
      <Navbar />
      <h1 className="text-4xl text-center font-bold mb-4 ">Recipes Category</h1>
      <div className="m-5 flex gap-2">
        <button
          onClick={() => setSelectedTag("All")}
          className={`px-4 py-2 rounded-md ${
            selectedTag === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-md ${
              selectedTag === tag ? "bg-blue-500 text-white" : "bg-green-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {loading && <div className="flex mt-50 justify-center content-center"><span className="loader"></span></div>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && filteredRecipes.length === 0 && (
        <p>No recipes found for {selectedTag}.</p>
      )}

      {!loading && !error && filteredRecipes.length > 0 && (
        <div className="grid grid-cols-4 gap-5 w-350 h-50 text-center ml-10">
          {filteredRecipes.map((recipeObj) => (
            <div key={recipeObj.id} className="flex flex-col p-2 gap-8 border rounded-lg shadow-md">
              <img
                src={recipeObj.image ?? "https://via.placeholder.com/150"}
                alt={recipeObj.title}
                className="w-80 p-1 h-70 object-cover rounded-md "
              />
              <h3 className="text-xl font-semibold">{recipeObj.title}</h3>
              <label className="bg-indigo-200 text-center p-1 rounded-lg">{recipeObj.cuisine}</label>
              <Link to={`/recipes/${recipeObj.id}`}>
              <button  className="bg-black text-stone-50 m-3 w-20 p-1 rounded-lg text-center">More</button>
              </Link>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Category;
