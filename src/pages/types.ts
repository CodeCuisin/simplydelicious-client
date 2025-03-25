export type Recipe = {
  id: number ;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image?: string | null;
  cookingTime?: string;
  serving?: number;
  createdAt: Date;
  updatedAt: Date;
  author:  User ;
};

export type User = {
  id: number ;
  name: string;
  email: string;
  password: string;
  bio?: string | null; 
  image?: string | null;
  recipes: Recipe[];
};