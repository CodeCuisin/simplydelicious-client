import Sidebar from "./Sidebar";
import "../pages/style.css";
import { useEffect, useState } from "react";
import { Recipe } from "../pages/types";
import { getRecipes } from "../utils/recipe.routes";

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    const RecipeList = async () => {
      const data = await getRecipes();
      setRecipes(data);
    };
    RecipeList();
  }, []);

  return (
    <div className="recipe-page">
      <Sidebar />
      <h1> Available Recipes </h1>
      <ul>
        {recipes.map((recipeObj) => (
          <li key={recipeObj.id}>
            <h3>{recipeObj.title}</h3>
            <p>{recipeObj.image}</p>
            <p>{recipeObj.cookingTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Recipes;
