import React from "react";
import { Link } from "react-router-dom";


type SidebarItem = {
  label: string;
  link: string;
};

const Sidebar: React.FC = () => {

  const sidebarItems: SidebarItem[] = [
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
        {sidebarItems.map((item, index) => (
          <button key={index} className="Recipe">
            {" "}
            <li className="sidebar-item">
              <Link to={item.link} className="sidebar-link">
                {item.label}
              </Link>
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
