export type Recipe = {
  id: number | string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image?: string | null;
  cookingTime?: string;
  serving?: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: number | string | null;
};
export type User = {
  id: number | String;
  name: string;
  email: string;
  password: string;
  bio?: string | null; 
  image?: string | null; 
};