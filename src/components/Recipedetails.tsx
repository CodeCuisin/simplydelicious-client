import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, getRecipeById } from "../utils/recipe.routes";
import { Recipe } from "../pages/types";
import Sidebar from "./Sidebar";
import { Navbar } from "./Navbar";
import "./recipedetails.css";
import { useAuth } from "../context/auth.context";
import "tailwindcss";



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
    <div className="layouts">
    <Sidebar />
    <div className="containers">
      <Navbar />

      <div className="bg-Fuchsia-200">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipeObj) => (
            <div key={recipeObj.id} className="recipe-cards">
              {user && recipeObj.author?.id === user.id && (
                <div className="action-buttons">
                  <Link to={`/recipes/${recipeObj.id}/update`}>
                    <button className="bg-green-600">Update Recipe</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(recipeObj.id)}
                  >
                    Delete Recipe
                  </button>
                </div>
              )}

              <div className="recipe-body">
                <div className="left-section">
                  <div className="recipe-images">
                    {recipeObj.image ? (
                      <img
                        src={recipeObj.image}
                        alt={recipeObj.title}
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                 
                 </div>
                  <div className="ingredients">
                    <p><b>Ingredients:</b></p>
                    <ol className="list-(--my-marker) ...">
                      {recipeObj.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ol>
                    </div>
                 
                </div>

                <div className="right-section">
                  <h1><strong>{recipeObj.title}</strong></h1>
                  <p><b>Description:</b> {recipeObj.description}</p>
                  <p><b>Cooking Time:</b> {recipeObj.cookingTime}</p>
                  <p><b> 🍽️ Serving:</b> {recipeObj.serving}</p>

                  <div className="label-containers">
                    {recipeObj.tags.map((tag, index) => (
                      <label className="label" key={index}>{tag}</label>
                    ))}
                    <label className="label">{recipeObj.cuisine}</label>
                  </div>

                  <p><b> 🧑‍🍳 Instructions:</b></p>
                  <ul className="list-decimal">
                    {recipeObj.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
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
