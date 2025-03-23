import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Recipes from "./components/Recipes";
import CreateRecipe from "./components/CreateRecipe";
import UpdateRecipe from "./components/UpdateRecipe";
import Recipedetails from "./components/Recipedetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/recipes/:recipeId/update" element={<UpdateRecipe />} />
        <Route path="/recipes/:recipeId" element={<Recipedetails />} />
      </Routes>
    </>
  );
}

export default App;
