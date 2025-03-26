import { Link } from "react-router-dom";
import "../components/button.css";
import Panda from "../assets/Panda.png";

import simplydelicious from "../assets/Simplydelicious.gif";

function Home() {
  return (
    <div className="bg-black text-white">
          <div className="gif-container mb-4 flex flex-row p-10 ps-10">
        <img
          className="w-50 h-50 object-cover rounded-2xl"
          src={simplydelicious} 
          alt="Sidebar Animation"
          onError={() => alert("Error loading GIF!")}
        />
    
      <h1 className="text-7xl pe-150 italic"> Simply Delicious </h1> 
      </div>
      <div className="flex flex-row ">
        <div className="w-400 p-10">
        <h2 className="text-3xl p-5 " > Welcome to Our Recipe Sharing Platform!</h2>
          <p className="text-lg p-2">
            Share your favorite recipes with the world or explore new ones from
            passionate chefs.{" "}
          </p>
          <p className="text-lg p-2">
            Whether you're a beginner or a seasoned cook, our platform has
            something to inspire everyone!.
          </p>
          <p className="text-lg p-2"> Join the Simply Delicious- Where Cooking Meets Joy.</p>
          <Link to="/recipes">
            <button className="moving-border-box">
           
              🎋 Let's Get Started
            </button>
          </Link>
        </div>
        <div className="shadow-lg p-10 rounded-xl">
          <img src={Panda} alt="Panda" />
        </div>
      </div>
    </div>
  );
}
export default Home;
