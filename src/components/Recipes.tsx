import Sidebar from "./Sidebar";
import "../pages/style.css";
import { useEffect, useState } from "react";
import { Recipe } from "../pages/types";
import { getRecipes } from "../utils/recipe.routes";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import Searchbar from "./Searchbar";


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
        if (data.length > 0) {
          setRecipes(data);
          setFilteredRecipes(data);
        } else {
          console.warn("No recipes found, state not updating.");
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
    <div className="recipe-page">
      <Sidebar />
      <div className="content-container">
        <Navbar />
        <Searchbar searchQuery={searchQuery} setSearchQuery={handleSearch}/>
       <div className="recipe-content">
          <h1 className="recipe-title"> Available Recipes </h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="dishes">
               {filteredRecipes.length === 0 ? (
                <p>No recipes found.</p>
              ) : (
                filteredRecipes.map((recipeObj) => {
                  console.log("Recipe Image URL: ", recipeObj.image);
                  return (
                    <div className="recipe-card" key={recipeObj.id}>
                      <h3>
                        <b>{recipeObj.title}</b>
                      </h3>
                      {recipeObj.image ? (
                        <img
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
                      <p>Cooking Time: {recipeObj.cookingTime}</p>
                      <div className="label-container"> {recipeObj.tags.map(
                      (tags: string, index: number) => (
                        <label className= "label" key={index}>{tags}</label>
                      )
                    )}
                  <label  className= "label">{recipeObj.cuisine}</label></div>
                     
                      <Link to={`/recipes/${recipeObj.id}`}>
                        <button>More</button>
                      </Link>
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
