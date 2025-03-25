import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, getRecipeById } from "../utils/recipe.routes";
import { Recipe } from "../pages/types";
import Sidebar from "./Sidebar";
import { Navbar } from "./Navbar";
import "./recipedetails.css";
import { useAuth } from "../context/auth.context";

const Recipedetails: React.FC = () => {
  console.log("Rendering Recipes Component");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

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
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="recipe-containers">
          {recipes.length === 0 ? (
            <p>No recipes found.</p>
          ) : (
            recipes.map((recipeObj) => (
              <div key={recipeObj.id} className="recipe-cards">
                <div className="recipe-images">
                  {recipeObj.image ? (
                    <img
                      src={recipeObj.image}
                      alt={recipeObj.title}
                      width="250px"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className="recipe-contents">
                  <h1>
                    <strong>{recipeObj.title}</strong>
                  </h1>
                  <p>
                    <b>Description:</b> {recipeObj.description}
                  </p>
                  <p>
                    <b>Ingredients:</b>{" "}
                  </p>
                  <ul>
                    {recipeObj.ingredients.map(
                      (ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                      )
                    )}
                  </ul>
                  <p>
                    <b>Instructions:</b>
                  </p>
                  <ul className="instructions-lists">
                    {recipeObj.instructions.map(
                      (instruction: string, index: number) => (
                        <li key={index}>{instruction}</li>
                      )
                    )}
                  </ul>
                  <p>
                    <b>Cooking Time:</b>
                    {recipeObj.cookingTime}{" "}
                  </p>
                  <p>
                    <b>Serving:</b> {recipeObj.serving}
                  </p>
{/* Debugging to check the `user` and `recipeObj.author` 
<p>Current User ID: {user?.id}</p>
                  <p>Author ID: {recipeObj.author?.id}</p>*/}

                  {user && recipeObj.author && recipeObj.author.id === user.id && (
                    <div>
                      <Link to={`/recipes/${recipeObj.id}/update`}>
                        <button className="update-btn">Update Recipe</button>
                      </Link>
                      <button className="delete-btn" onClick={() => handleDelete(recipeObj.id)}>
                        Delete Recipe
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Recipedetails;
