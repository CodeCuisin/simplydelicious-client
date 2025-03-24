import Sidebar from "./Sidebar";
import "../pages/style.css";
import { useEffect, useState } from "react";
import { Recipe } from "../pages/types";
import { getRecipes } from "../utils/recipe.routes";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string>("");
  
  useEffect(() => {
    const RecipeList = async () => {
      try{
      const data = await getRecipes();
      console.log("Fetched Recipes:", data);
      if (data.length > 0) {
        setRecipes(data);
      } else {
        console.warn("No recipes found, state not updating.");
      }
    } catch (error){
      console.error("Error fetching recipes", error);
      setError("Failed to fetch recipes.");
          } finally {
            setLoading(false);
          }
        };
    RecipeList();
  }, []);

  return (
    <div className="recipe-page">
    
      <Sidebar />
      <div className="content-container">
        <Navbar />

  
        <div className="recipe-content">
      <h1 className="recipe-title"> Available Recipes </h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="dishes">
          {recipes.length === 0 ? (
            <p>No recipes found.</p>
          ) : (
            recipes.map((recipeObj) => (
              <div className="recipe-card" key={recipeObj.id}>
                <h3><b>{recipeObj.title}</b></h3>
                {recipeObj.image ? (
                  <img
                    src={recipeObj.image}
                    alt={recipeObj.title}
                    width="300"
                    onError={(e) => {
                      e.currentTarget.src = "/default-image.jpg"; // Fallback image if the image fails to load
                    }}
                  />
                ) : (
                  <p>No image available</p>
                )}
                <p>Cooking Time: {recipeObj.cookingTime}</p>
                <Link to={`/recipes/${recipeObj.id}`}>
                  <button>More</button>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default Recipes;
