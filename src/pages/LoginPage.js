import "../styles/LoginPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Define admin and normal user credentials
  const adminEmail = "shvngsri@umd.edu";
  const adminPassword = "6998@Shvng";
  const normalUserEmail = "shvngsri@gmail.com";
  const normalUserPassword = "6998@Shvng";

  const handleLogin = () => {
    if (isAdmin) {
      if (email === adminEmail && password === adminPassword) {
        onLogin(true); // Set user as admin
        navigate("/calendar"); // Navigate to the admin dashboard
      } else {
        alert("Unauthorized access as admin. Please check your credentials.");
      }
    } else {
      if (email === normalUserEmail && password === normalUserPassword) {
        onLogin(false); // Set user as normal user
        navigate("/calendar"); // Navigate to the calendar for normal users
      } else {
        alert("Invalid credentials. Please try again.");
      }
    }
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <h2 className="login-title">
            {isAdmin ? "Admin Login" : "User Login"}
          </h2>
          <div className="login">
            <div className="login__field">
              <FaUser className="login__icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login__input"
              />
            </div>
            <div className="login__field">
              <FaLock className="login__icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login__input"
              />
            </div>
            <button onClick={handleLogin} className="login__submit">
              LOG IN NOW <FaArrowRight className="button__icon" />
            </button>
            <p
              style={{
                color: "#000000",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              New here?{" "}
              <a href="/signup" style={{ color: "#000000" }}>
                Sign Up
              </a>
            </p>
            <button
              onClick={toggleAdminMode}
              className="switch-button"
              style={{ margin: "20px auto" }}
            >
              {isAdmin ? "Switch to User Login" : "Switch to Admin Login"}
            </button>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape1"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape4"></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
