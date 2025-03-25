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
  tags: Tag[]; 
  cuisine: Cuisine; 
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
export type Tag = "Lunch" | "Breakfast" | "Dinner" | "Dessert" | "Snacks";
export type Cuisine = "Indian" | "Arabic" | "Mexican" | "Italian" | "French"|"American" | "German" |"";  