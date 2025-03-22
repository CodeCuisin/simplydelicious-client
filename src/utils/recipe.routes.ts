import axios from "axios";
import { Recipe } from "../pages/types";

const API_URL = "http://localhost:5005/api/recipes";

export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createRecipe = async (
  newRecipe: Omit<Recipe, "id" | "createdAt" | "updatedAt">
): Promise<Recipe> => {
  const response = await axios.post(`${API_URL}/create-recipe`, newRecipe);
  return response.data;
};

export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateRecipe = async (
  id: number,
  updatedRecipe: Partial<Omit<Recipe, "id" | "createdAt" | "updatedAt">>
): Promise<Recipe> => {
  const response = await axios.put(`${API_URL}/${id}`, updatedRecipe);
  return response.data;
};

export const deleteRecipe = async (id: number): Promise<Recipe> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
