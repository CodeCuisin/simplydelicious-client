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
};
