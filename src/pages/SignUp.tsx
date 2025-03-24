import { useState, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock, FaUserPlus, FaUser } from "react-icons/fa";

type ErrorMessage = string | undefined;

function Signup() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const handleSignupSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = { email, password, name };

    axios
      .post(`http://localhost:5005/auth/signup`, requestBody)
      .then(() => {
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        const errorDescription =
          error.response?.data?.message || "Signup failed. Please try again.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2><FaUserPlus /> Sign Up</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSignupSubmit}>
          <div className="form-group">
            <label><FaUser /> Name:</label>
            <input 
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={name}
              onChange={handleName}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Link to login page */}
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
