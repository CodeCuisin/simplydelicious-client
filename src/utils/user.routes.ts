import axios from "axios";
import { User } from "../pages/types";

const API_URL = "http://localhost:5005"; 

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUserById = async (userId: number | string): Promise<User | null> => {
  try {
    const response = await axios.get<User>(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

export const updateUser = async (
  userId: number,
  updatedUser: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
): Promise<User> => {
  try {
    const token = localStorage.getItem("authToken"); // Get the token

    if (!token) {
      console.error("No token found in localStorage");
      throw new Error("No authentication token found");
    }

    const response = await axios.put(
      `${API_URL}/users/${userId}`,
      updatedUser,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // ensuring that the token is included in the Auth header
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Unable to update user.");
  }
};


export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Unable to delete user.");
  }
};
