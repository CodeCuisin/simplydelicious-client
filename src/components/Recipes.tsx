import Sidebar from "./Sidebar";
import "../pages/style.css";
import { useEffect, useState } from "react";
import { Recipe } from "../pages/types";
import { getRecipes } from "../utils/recipe.routes";
import { Link} from "react-router-dom";

const Recipes: React.FC = () => {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    const RecipeList = async () => {
      const data = await getRecipes();
      console.log("Fetched Recipes:", data);
      if (data.length > 0) {
        setRecipes(data);
      } else {
        console.warn("No recipes found, state not updating.");
      }
    };
    RecipeList();
  }, []);

  return (
    <div className="recipe-page">
      <Sidebar /> 
      <h1 className="recipe-title"> Available Recipes </h1>
    
      <div className="dishes">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipeObj) => (
            <label className="recipe-label" key={recipeObj.id}>
              <h3>{recipeObj.title}</h3>
              {recipeObj.image ? (
            <img src={recipeObj.image} alt={recipeObj.title} width="150px" />
          ) : (
            <p>No image available</p>
          )}
              <p>Cooking Time:{recipeObj.cookingTime} </p>
              <Link to ={`/recipes/${recipeObj.id}`}><button>More</button></Link>
            </label>
          ))
        )}
      </div>
    </div>
  );
};
export default Recipes;
