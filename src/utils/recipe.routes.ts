import axios from "axios";
import { Recipe } from "../pages/types";

//const API_URL = "http://localhost:5005";
const storedToken = localStorage.getItem("authToken");
export const getRecipes = async (): Promise<Recipe[]> => {
  try {
    
    const response = await axios.get<Recipe[]>(`${import.meta.env.VITE_API_URL}/recipes`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
export const createRecipe = async (
  newRecipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">
): Promise<Recipe> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/create-recipe`, newRecipe,{ headers: { Authorization: `Bearer ${storedToken}` } });
  return response.data;
};

export const getRecipeById = async (recipeId: number): Promise<Recipe> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/${recipeId}`);
  console.log("Fetched Recipe:", response.data);
  return response.data;
};

export const updateRecipe = async (
  recipeId: number,
  updatedRecipe: Partial<Omit<Recipe, "id" | "createdAt" | "updatedAt">>
): Promise<Recipe> => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/recipes/${recipeId}`,
    updatedRecipe
  );
  return response.data;
};

export const deleteRecipe = async (recipeId: number): Promise<Recipe> => {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/recipes/${recipeId}`);
  return response.data;
};
