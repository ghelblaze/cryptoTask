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
      </div>
      <div className="container  ">
        <div className="row col-md-4 ">
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div className="row col-md-4">
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div className="row col-md-4">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="row col-md-4">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="row col-md-4">
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button className="mt-5" onClick={handleSignUp}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
