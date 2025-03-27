import { useState, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock, FaUserPlus, FaUser } from "react-icons/fa";
import bamboo from "../assets/bamboo.jpg";
import panda from "../assets/panda-sticker.png";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const handleSignupSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    axios.post(`${API_URL}/auth/signup`, { email, password, name })
      .then(() => {
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-cente  p-0 m-0"
    >
       <img
        src={bamboo}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full flex flex-col items-center ">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 ">
          <FaUserPlus /> Sign Up
        </h2>

        {errorMessage && <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>}

        <form onSubmit={handleSignupSubmit} className="mt-6 space-y-4 w-full">
          <div className="flex items-center border border-gray-300 p-2 rounded-lg bg-white/50">
            <FaUser className="text-gray-600" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleName}
              required
              className="w-full bg-transparent outline-none px-2"
            />
          </div>

          <div className="flex items-center border border-gray-300 p-2 rounded-lg bg-white/50">
            <FaEnvelope className="text-gray-600" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmail}
              required
              className="w-full bg-transparent outline-none px-2"
            />
          </div>

          <div className="flex items-center border border-gray-300 p-2 rounded-lg bg-white/50">
            <FaLock className="text-gray-600" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              required
              className="w-full bg-transparent outline-none px-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-bold"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-4">
          Already have an account? <Link to="/login" className="text-green-700 font-bold">Login</Link>
        </p>
      </div>
      <div
      className="absolute bottom-4 left-4 w-50 h-50 rounded-full"
      style={{ backgroundImage: "none" }}
       >
  <img
    src={panda}
    alt="Panda"
    className="w-full h-full object-cover rounded-full"
  />
</div>
    </div>
  );
}

export default Signup;
