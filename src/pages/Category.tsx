import { useEffect, useState } from "react";
import { Recipe, Tag } from "./types";
import { getRecipes } from "../utils/recipe.routes";



const Category: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (err) {
        setError("Failed to load recipes. Please try again.");
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  const groupRecipesByTags = (): Record<Tag, Recipe[]> => {
    const grouped: Record<Tag, Recipe[]> = {
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      Dessert: [],
      Snacks: [],
    };

    recipes.forEach((recipe) => {
      recipe.tags.forEach((tag) => {
        if (grouped[tag]) {
          grouped[tag].push(recipe);
        }
      });
    });

    return grouped;
  };

  const groupedRecipes = groupRecipesByTags();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipes Categorized by Tags</h1>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading &&
        !error &&
        Object.entries(groupedRecipes).map(([tag, recipes]) => (
          recipes.length > 0 && (
            <div key={tag} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{tag}</h2>
              <ul className="list-disc pl-6">
                {recipes.map((recipe) => (
                  <li key={recipe.id} className="p-2 border-b">
                    {recipe.title}
                  </li>
                ))}
              </ul>
            </div>
          )
        ))}
    </div>
  );
};

export default Category;