# Simply-Delicious 👨‍🍳🥘🥗👩‍🍳
 
## Description:
Simply-Delicious is a user-friendly recipe-sharing platform where food lovers can explore, share, and discover new dishes from around the world. Users can browse a diverse collection of recipes, each featuring cooking time, serving size, ingredients, step-by-step instructions, relevant tags, and cuisine type.


### Key Features:

1. **User Profiles**: Users can create and manage their profiles, including personal information and their shared recipes.
2. **Recipes**: All users can view recipes, but only registered users can create them. Recipe authors have exclusive rights to update and delete their own recipes.
3. **Categories**: Organize recipes by categories like Breakfast, Lunch, Dinner, Desserts and Snacks.
4. **Chatbot**: Users can interact with a chatbot to ask questions about recipes, nutrition, and more.


## Repository Overview:
This repository contains the **Frontend** for the Simply Delicious project, built with **React and TypeScript**. It manages the user interface and client-side interactions, allowing users to seamlessly search for recipes and manage their profiles.

The **Backend**, developed using **TypeScript, PostgreSQL, and Prisma,** is maintained in a separate repository. It handles server-side operations, including user authentication, recipe management, and data handling.

- **Frontend**: This repository contains the UI components, routes, and logic that runs on the client-side, interacting with the backend API to fetch data and display it to users.

- **Backend**: The backend repository (located at (https://github.com/CodeCuisin/simplydelicious-client)) contains the server-side logic, database interactions, and API endpoints that power the features in the frontend.

## Instructions:

1. Clone the Repository using :git clone --respository--
2. Navigate into the project directory: cd simplydelicious-client
3. Install Dependencies: npm install
4. Set up Environment Variables: You will need to create a .env file in the root of your project directory to configure environment variables for the app. This is where you will store sensitive information like database credentials, API keys, and other necessary configuration.
   - To create the .env file:
      * In the project folder, create a new file named .env.
      * Add Environment Variables
        - **PORT**: The port your backend will run on (default is 3000 for React)
          PORT=5003
        - **TOKEN_SECRET**: Secret key used for JWT authentication (same as the backend secret)
          TOKEN_SECRET= yummy or newidea
        - **VITE_API_URL**: The URL of the backend API (where your Express server is running)
          VITE_API_URL="http://localhost:5003"
    - Save and close .env File:
5. Run the Application: npm run dev

## Important Notes:
* If you need to update these values (e.g., change the backend URL or port), simply modify the .env file.
* React will automatically pick up the environment variables and use them when running the app in development.

## Technologies Used:
* React 
* Typescript
* Tailwind CSS
* Prisma
* Postgresql
* Express
* Node.js

## Resources:
- Freepik  images
- Google recipes
- chatbot

## Demo:
https://simply-delicious-recipes.netlify.app/