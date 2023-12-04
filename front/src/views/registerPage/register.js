import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
        { withCredentials: false }
      );
      console.log("Registered succefully:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error Register:", error);
    }
  };

  return (
    <div className="m-auto">
      <div className="mb-5">
        <h2>Create a new acount</h2>
        <hr />
      </div>
      <div className="loggin_container  ">
        <div className="field">
          <label>First Name</label>
          <input
            type="text"
            placeholder=""
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            type="text"
            placeholder=""
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder=""
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder=""
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="field">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder=""
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button className="mt-5 loggin-btn" onClick={handleSignUp}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
