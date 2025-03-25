import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import "./sidebar.css";

type SidebarItem = {
  label: string;
  link: string;
  hideIfLoggedIn?: boolean;
  onClick?: () => void;
};



const Sidebar: React.FC = () => {
  const { isLoggedIn, logOutUser } = useAuth();
  const sidebarItems: SidebarItem[] = [

    { label: "Login 👤", link: "/login", hideIfLoggedIn: true },
    { label: "My Profile 👤", link: "/profile" },
    { label: "Categories", link: "/categories" },
    { label: "Popular Recipes 📓", link: "/popular" },
    { label: "Create Recipe ✚ ", link: "/create-recipe" },
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <Link to="/">
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
