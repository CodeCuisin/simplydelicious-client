export type Recipe = {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image?: string;
    cookingTime?: number;
    servings?: number;
    createdAt: Date;
    updatedAt: Date;
  }