import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../utils/recipe.routes";
import { Recipe } from "../pages/types";


const Recipedetails: React.FC = () => {
    console.log("Rendering Recipes Component");
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const params = useParams();
    console.log("useParams:", params);
    const { recipeId } = params;
    console.log("Recipe ID:", recipeId);

    useEffect(() => {
  console.log("Recipe ID:", recipeId);
      const RecipeList = async () => {
        const data = await getRecipeById(Number(recipeId));
        console.log("Fetched Recipes:", data);
        if (data) {
          setRecipes([data]);
        } else {
          console.warn("No recipes found, state not updating.");
        }
      };
      RecipeList();
    }, [recipeId]);
  
    return (
      <div >
          {recipes.length === 0 ? (
            <p>No recipes found.</p>
          ) : (
            recipes.map((recipeObj) => (
              <label  key={recipeObj.id}>
                {recipeObj.image ? (
              <img src={recipeObj.image} alt={recipeObj.title} width="150px" />
            ) : (
              <p>No image available</p>
            )}
                <h3>{recipeObj.title}</h3>
                <p>Description:{recipeObj.description}</p>
                <p>Ingredients: {recipeObj.ingredients}</p>
                <p>Instructions:{recipeObj.instructions}</p>
                <p>Cooking Time:{recipeObj.cookingTime} min</p>
                <p>Serving:{recipeObj.serving}</p>
                <button>Update Recipe</button>
                <button>Delete Recipe</button>
              </label>
            ))
          )}
        </div>
     
    );
  };
  export default Recipedetails;
  