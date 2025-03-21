import { Link } from "react-router-dom";
import "../components/button.css";
import Panda from "../assets/Panda.png";
import "./style.css";

function Home() {
  return (
    <div className="homepage">
      <h1> Simply Delicious </h1>
      <h2> Welcome to Our Recipe Sharing Platform!</h2>
      <div className="flex">
      <div className="content">
      <p>Share your favorite recipes with the world or explore new ones from passionate chefs. </p>
        <p>Whether you're a beginner or a seasoned cook, our platform has something to inspire everyone!.</p>
        <p> Join the Simply Delicious- Where Cooking Meets Joy.</p>
        <Link to="/recipes">
          <button className="moving-border-box"> 🎋 Let's Get Started </button>
        </Link>

      </div>
      <div className="hero">
  <img src={Panda} alt="Panda" />
</div>
</div>
    </div>
  );
}
export default Home;
