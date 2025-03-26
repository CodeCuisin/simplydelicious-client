import { useEffect, useState } from "react";
import { Recipe } from "./types";
import { getRecipes } from "../utils/recipe.routes";



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
      <h1 className="text-2xl font-bold mb-4">Popular Recipes</h1>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Popular Picks</h2>
          <ul className="list-disc pl-6">
            {popularRecipes.map((recipeObj) => (
              <li key={recipeObj.id} className="p-2 border-b">
                {recipeObj.title}
                <img src={recipeObj.image ?? "https://via.placeholder.com/150"} alt={recipeObj.title} className= "w-50 rounded-lg"/>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default PopularRecipes;