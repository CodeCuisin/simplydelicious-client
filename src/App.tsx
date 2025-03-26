import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Recipes from "./components/Recipes";
import CreateRecipe from "./components/CreateRecipe";
import UpdateRecipe from "./components/UpdateRecipe";
import Recipedetails from "./components/Recipedetails";
import UserProfile from"./components/UserProfile.tsx";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Category from "./pages/Category.tsx";
import PopularRecipes from "./pages/PopularRecipe.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/recipes/:recipeId/update" element={<UpdateRecipe />} />
        <Route path="/recipes/:recipeId" element={<Recipedetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/users/:userId" element={<UserProfile/>} />
        <Route path="/categories" element={<Category/>} />
        <Route path="/popular" element={<PopularRecipes/>} />
      </Routes>
    </>
  );
}

export default App;
