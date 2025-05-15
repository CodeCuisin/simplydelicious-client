import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, getRecipeById } from "../utils/recipe.routes";
import { Recipe } from "../pages/types";
import Sidebar from "./Sidebar";
import { Navbar } from "./Navbar";
import "./recipedetails.css";
import { useAuth } from "../context/auth.context";
import "tailwindcss";
import redbtn from "../assets/redbtn.png";
import bluebtn from "../assets/bluebtn.png";

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
    <div className="flex w-500 h-260 overflow-auto">
      <Sidebar />
      <div className="w-345">
        <Navbar />

        <div className="bg-pink-50 p-10 w-full h-full overflow-auto">
          {recipes.length === 0 ? (
            <p>No recipes found.</p>
          ) : (
            recipes.map((recipeObj) => {
              console.log("User:", user)
                console.log("Recipe Author:", recipeObj.author);
                 return( 
              <div key={recipeObj.id} className="recipe-cards">
               
                {user && recipeObj.author?.id === user.id && (
                  <div className="flex flex-row-reverse mt-2 mr-8 gap-5 ">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(recipeObj.id)}
                    >
                      <img className="w-15 " src={redbtn} />{" "}
                    </button>
                    <Link to={`/recipes/${recipeObj.id}/update`}>
                      <button>
                        {" "}
                        <img className="w-15 " src={bluebtn} />{" "}
                      </button>
                    </Link>
                  </div>
                )}

                <div className="flex ">
                  <div className="flex flex-col w-180 ml-10">
                    <div className=" ">
                      {recipeObj.image ? (
                        <img className= "w-80 rounded-lg" src={recipeObj.image} alt={recipeObj.title} />
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
                    <div className="w-100 p-4">
                      <p>
                        <b>Ingredients:</b>
                      </p>
                      <ol className="list-(--my-marker) font-semibold">
                        {recipeObj.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="flex flex-col w-400">
                    <h1 className="text-4xl font-bold pb-4 ">
                    {recipeObj.title}
                    </h1>
                    <p className="text-xl font-bold pb-2">
                      Description: </p><p className="pb-2 font-semibold w-235"> {recipeObj.description}</p>
                   
                    <p className="font-bold pb-2">
                       ⏳ Cooking Time: {recipeObj.cookingTime}
                    </p>
                    <p className="font-bold pb-2">
                     🍽️ Serving: {recipeObj.serving}
                    </p>

                    <div className="font-semibold p-2">
                      {recipeObj.tags.map((tag, index) => (
                        <label  className="bg-fuchsia-200 p-2 m-4 rounded-lg" key={index}>
                          {tag}
                        </label>
                      ))}
                      <label className="bg-indigo-200 p-2 m-2 rounded-lg">{recipeObj.cuisine}</label>
                    </div>

                    <p className="font-bold p-2">
                       🧑‍🍳 Instructions:
                    </p>
                    <ul className="list-decimal flex flex-col gap-2">
                      {recipeObj.instructions.map((instruction, index) => (
                        <li className="p-2 font-semibold bg-sky-50 w-fit rounded-lg shadow-xl "key={index}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipedetails;
