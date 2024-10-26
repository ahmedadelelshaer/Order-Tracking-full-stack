import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(''); // State for message
  const [messageType, setMessageType] = useState(''); // State for message type

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:8000/login", { email, password });
    setMessageType("success");
    setMessage("Login successful!");
  } catch (error) {
    const errorMessage = error.response?.data?.msg || "Login failed! Please try again.";
    setMessageType("error");
    setMessage(Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage);
  }
};


  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Login
        </button>

        {/* Display Popup Message */}
        {message && (
          <div className={`popup-message ${messageType === 'success' ? 'popup-success' : 'popup-error'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;