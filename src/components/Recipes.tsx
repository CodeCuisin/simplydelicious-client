//import "../pages/style.css";
import { useEffect, useState } from "react";
import { Recipe } from "../pages/types";
import { getRecipes } from "../utils/recipe.routes";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const RecipeList = async () => {
      try {
        const data = await getRecipes();
        console.log("Fetched Recipes:", data);
        console.log("Type of Fetched Data:", Array.isArray(data) ? 'Array' : typeof data);
        if (Array.isArray(data)) {
          setRecipes(data);
          setFilteredRecipes(data);
        } else {
          console.warn("No recipes found, state not updating.");
          setRecipes([]);
          setFilteredRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching recipes", error);
        setError("Failed to fetch recipes.");
      } finally {
        setLoading(false);
      }
    };
    RecipeList();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some((ingredient: string) =>
          ingredient.toLowerCase().includes(query.toLowerCase())
        )
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="flex bg-pink-50 w-500 ">
      <Sidebar />
      <div className="flex flex-col ">
        <Navbar />
        <Searchbar searchQuery={searchQuery} setSearchQuery={handleSearch} />
        <div className="ml-5 h-200 ">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="grid grid-cols-4 gap-5 w-300 h-200">
              {filteredRecipes.length === 0 ? (
                <p>No recipes found.</p>
              ) : (
                filteredRecipes.map((recipeObj) => {
                  console.log("Recipe Image URL: ", recipeObj.image);
                  return (
                    <div
                      className="max-w-sm border-black  rounded-xl  overflow-hidden shadow-2xl p-5 "
                      key={recipeObj.id}
                    >
                      <h3 className="text-xl font-serif font-semibold text-center">
                        {recipeObj.title}
                      </h3>
                      {recipeObj.image ? (
                        <img
                          className="w-full h-60 object-cover rounded-sm shadow-lg"
                          src={recipeObj.image}
                          alt={recipeObj.title}
                          width="300"
                          key={recipeObj.image}
                          onError={(e) => {
                            e.currentTarget.src = "/default-image.jpg"; // Fallback image if image fails to load
                          }}
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                      <p className="text-center font-medium">
                        ⏳ {recipeObj.cookingTime}
                      </p>
                      <div className="flex gap-3 m-2">
                        {recipeObj.tags && Array.isArray(recipeObj.tags) ? (
                          recipeObj.tags.map((tag: string, index: number) => (
                            <label
                              className="bg-fuchsia-200 p-1 rounded-lg"
                              key={index}
                            >
                              {tag}
                            </label>
                          ))
                        ) : (
                          <p>No tags available</p>
                        )}
                        <label className="bg-indigo-200 p-1 rounded-lg">
                          {recipeObj.cuisine}
                        </label>
                      </div>
                      <div className="flex justify-center ">
                        <Link to={`/recipes/${recipeObj.id}`}>
                          <button className="bg-black text-stone-50 m-3 w-20 p-2 rounded-lg text-center">
                            More
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
