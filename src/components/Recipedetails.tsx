import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, getRecipeById } from "../utils/recipe.routes";
import { Recipe } from "../pages/types";
import Sidebar from "./Sidebar";
import { Navbar } from "./Navbar";

const Recipedetails: React.FC = () => {
  console.log("Rendering Recipes Component");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const params = useParams();
  console.log("useParams:", params);
  const { recipeId } = params;
  console.log("Recipe ID:", recipeId);
  const navigate = useNavigate();

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

  const handleDelete = async (recipeId: number) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await deleteRecipe(recipeId);
      alert("Recipe deleted successfully!");
      navigate("/recipes");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe.");
    }
  };

  return (
    <div>
      {/*<Sidebar />
      <Navbar />*/}
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipeObj) => (
          <label key={recipeObj.id}>
            {recipeObj.image ? (
              <img src={recipeObj.image} alt={recipeObj.title} width="150px" />
            ) : (
              <p>No image available</p>
            )}
            <h3>{recipeObj.title}</h3>
            <p>Description:{recipeObj.description}</p>
            <p>Ingredients: {recipeObj.ingredients}</p>
            <p>Instructions:{recipeObj.instructions}</p>
            <p>Cooking Time:{recipeObj.cookingTime} </p>
            <p>Serving:{recipeObj.serving}</p>
            <Link to={`/recipes/${recipeObj.id}/update`}>
              <button>Update Recipe</button>
            </Link>
            <button onClick={() => recipeId && handleDelete(Number(recipeId))}>
              Delete Recipe
            </button>
          </label>
        ))
      )}
    </div>
  );
};
export default Recipedetails;
