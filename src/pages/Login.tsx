import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/auth.context"; 
const API_URL = import.meta.env.VITE_API_URL;

function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const requestBody = { email, password };

    try {
      const response = await axios.post(`${API_URL}/auth/login`, requestBody);
      storeToken(response.data.authToken);
      navigate("/recipes");
    } catch (error: any) {
      setLoading(false);
      const errorDescription = error.response?.data?.message || "Invalid email or password. Please try again.";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center p-0 m-0"
      style={{ backgroundImage: `url('/src/assets/bamboo.jpg')` }}
    >
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaSignInAlt /> Login
        </h2>

        {errorMessage && <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>}

        <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4 w-full">
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
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-4">
          Don't have an account? <Link to="/signup" className="text-green-700 font-bold">Sign Up</Link>
        </p>
      </div>
      <div
      className="absolute bottom-4 left-4 w-50 h-50 rounded-full"
      style={{ backgroundImage: "none" }}
       >
  <img
    src="src/assets/panda-sticker.png" // Path to your panda image
    alt="Panda"
    className="w-full h-full object-cover rounded-full"
  />
</div>
    </div>
  );
}

export default Signin;
