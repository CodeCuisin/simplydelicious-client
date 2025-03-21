import { Link } from "react-router-dom";
import "../components/button.css";

function Home() {
  return (
    <div>
      <h1> Simply Delicious  </h1>
      <h3> Welcome to our recipe book</h3>
      <h4> Join the Simply Delicious- Where Cooking Meets Joy.</h4>

      <div><Link to = "/recipes">
        <button className="moving-border-box"> 🎋 Let's Get Started </button></Link>
      </div>
    </div>
  );
}
export default Home;
