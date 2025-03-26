import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import "./sidebar.css";
import simplydelicious from "../assets/Simplydelicious.gif";

type SidebarItem = {
  label: string;
  link: string;
  hideIfLoggedIn?: boolean;
  onClick?: () => void;
};


const Sidebar: React.FC = () => {
  const {userId} = useParams();
  const { isLoggedIn, logOutUser } = useAuth();
  console.log(userId);
  const sidebarItems: SidebarItem[] = [

    { label: "Login 👤", link: "/login", hideIfLoggedIn: true },
    { label: "My Profile 👤", link: `/users/${userId}` },
    { label: "Categories", link: "/categories" },
    { label: "Popular Recipes 📓", link: "/popular" },
    { label: "Create Recipe ✚ ", link: "/create-recipe" },
  ];


  return (
    <div className="bg-green-950 w-80 ">
        <div className="gif-container mb-4 m-6">
        <img
          className="w-58 h-60 object-cover rounded-2xl"
          src={simplydelicious} 
          alt="Sidebar Animation"
          onError={() => alert("Error loading GIF!")}
        />
      </div>
      <ul className="m-8 ">
        <Link to="/recipes">
          <button className="main"> Home 🏠︎</button>
        </Link>
        {sidebarItems.filter((item) => !(isLoggedIn && item.hideIfLoggedIn)).map((item, index) => (
          <button key={index} className="Recipe">
            {" "}
              <Link className="sidebar-item" to={item.link} >
                {item.label}
              </Link>
          </button>
        ))}
       {isLoggedIn && (
          <li>
            <button className="Recipe" onClick={logOutUser}>
              Logout 👤
            </button>
          </li>
        )}
      </ul>
    </div>
  
  );
};

export default Sidebar;
