import { useState,  ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/auth.context"; 


function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = { email, password };

    try {
      const response = await axios.post(`http://localhost:5005/auth/login`, requestBody);
      console.log("JWT token", response.data.authToken);
      storeToken(response.data.authToken);
      navigate("/");
    } catch (error: any) {
      const errorDescription = error.response?.data?.message || "Invalid email or password. Please try again.";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1><FaSignInAlt /> Login</h1>

        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label><FaEnvelope /> Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>

          <div className="form-group">
            <label><FaLock /> Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            <FaSignInAlt /> Login
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Don't have an account yet?</p>
        <Link to="/signup" className="signup-link">Sign Up</Link>
      </div>
    </div>
  );
}

export default Signin;
