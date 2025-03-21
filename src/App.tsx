import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Recipes from "./components/Recipes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/recipes" element={<Recipes />} />
      </Routes>
    </>
  );
}

export default App;
