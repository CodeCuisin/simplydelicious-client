import { useEffect, useState } from "react";
import { Recipe } from "./types";
import { getRecipes } from "../utils/recipe.routes";
import { Link } from "react-router-dom";



const PopularRecipes: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRecipes();
        setRecipes(data);

        // Select 2 random recipes
        if (data.length > 0) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setPopularRecipes(shuffled.slice(0, 2));
        }
      } catch (err) {
        setError("Failed to load recipes. Please try again.");
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Popular Picks</h1>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="m-10 ">
          <ul className="grid grid-cols-4 gap-5 w-300 h-100 text-center ">
            {popularRecipes.map((recipeObj) => (
              <li key={recipeObj.id} className="text-xl font-semibold border-2">
                {recipeObj.title}
                <img src={recipeObj.image ?? "https://via.placeholder.com/150"} alt={recipeObj.title} className= "w-50 rounded-lg m-2"/>
                <Link to={`/recipes/${recipeObj.id}`}>
              <button  className="bg-black text-stone-50 m-3 w-20 p-2 rounded-lg text-center">More</button>
              </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default PopularRecipes;