import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("login successfully:", response.data);
      navigate("/Home");
    } catch (error) {
      console.error("Error loggin:", error);
    }
  };

  return (
    <div >
      <h2>Welcome to the Crypto Hub</h2>
      <hr />
      <div>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
          
        />
      </div>
      <div>
        
      </div>
      <div >
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          required
          
        />
      </div>
      
      <button onClick={handleLogin}>
        Login
      </button>
      <div>
        <p>
          Don't have an account yet???{" "}
          <button onClick={() => navigate("/register")}>
            Create account
          </button>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
