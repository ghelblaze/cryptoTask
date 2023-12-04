import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import backGroung from "../../assets/loggin_backgrnd.jpeg";

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
    <div>
      <h2>Welcome to the Crypto Hub</h2>
      <hr />
      <div className="loggin_container">
        <div className="field">
          <input
            type="email"
            placeholder=""
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label>E-mail</label>
        </div>

        <div className="field">
          <input
            type="password"
            placeholder=""
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label>Password</label>
        </div>

        <button className="loggin-btn" onClick={handleLogin}>
          Login
        </button>
        <div>
          <p>
            Don't have an account yet???
            <br />
            <button
              className="create_acc_btn"
              onClick={() => navigate("/register")}
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
