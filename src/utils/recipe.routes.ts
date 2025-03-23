import axios from "axios";
import { Recipe } from "../pages/types";

const API_URL = "http://localhost:5005";

export const getRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get<Recipe[]>(`${API_URL}/recipes`);
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
  const response = await axios.post(`${API_URL}/create-recipe`, newRecipe);
  return response.data;
};

export const getRecipeById = async (recipeId: number): Promise<Recipe> => {
  const response = await axios.get(`${API_URL}/recipes/${recipeId}`);
  return response.data;
};

export const updateRecipe = async (
  recipeId: number,
  updatedRecipe: Partial<Omit<Recipe, "id" | "createdAt" | "updatedAt">>
): Promise<Recipe> => {
  const response = await axios.put(`${API_URL}/recipes/${recipeId}`, updatedRecipe);
  return response.data;
};

export const deleteRecipe = async (recipeId: number): Promise<Recipe> => {
  const response = await axios.delete(`${API_URL}/recipes/${recipeId}`);
  return response.data;
};
