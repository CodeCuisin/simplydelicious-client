import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import simplydelicious from "../assets/Simplydelicious.gif";

type SidebarItem = {
  label: string;
  link: string;
  hideIfLoggedIn?: boolean;
  onClick?: () => void;
};

const Sidebar: React.FC = () => {
  const { userId } = useParams();
  const { isLoggedIn, logOutUser } = useAuth();
  console.log(userId);
  const sidebarItems: SidebarItem[] = [
    { label: "Home   🏠︎ ", link: "/recipes" },
    { label: "Login  👤", link: "/login", hideIfLoggedIn: true },
    { label: "Categories  📋", link: "/categories" },
    { label: "Popular Recipes 🔥", link: "/popular" },
    { label: "Create Recipe ✚ ", link: "/create-recipe" },
  ];

  return (
    <div className="bg-green-950 w-80 text-white p-2">
      <div className="gif-container  m-4">
        <img
          className="w-58 h-58 object-cover rounded-2xl"
          src={simplydelicious}
          alt="Sidebar Animation"
          onError={() => alert("Error loading GIF!")}
        />
      </div>
      <ul className="flex flex-col m-3 drop-shadow-md gap-10 ">
        <Link to="">
          <button> </button>
        </Link>
        {sidebarItems
          .filter((item) => !(isLoggedIn && item.hideIfLoggedIn))
          .map((item, index) => (
            <button className="bg-slate-900 p-2 rounded-lg" key={index}>
              {" "}
              <Link  to={item.link}>
                {item.label}
              </Link>
            </button>
          ))}
        {isLoggedIn && (
        
            <div >
              <li className="flex flex-col bg-slate-900 p-2 rounded-lg text-center">
            <Link  to ={`/users/${userId}`}>
              <button onClick={logOutUser}>My Profile 👤</button>
              </Link>
              </li>
             
            <li>
              <button className="flex flex-col bg-slate-900 p-2  mt-10 rounded-lg w-70" onClick={logOutUser}>Logout ⏻</button>
              </li>
              </div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
