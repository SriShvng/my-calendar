import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import "../styles/LoginPage.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("User registered successfully!");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <h2 className="login-title">Sign Up</h2>
          <div className="login">
            <div className="login__field">
              <FaEnvelope className="login__icon" />
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
            <div className="login__field">
              <FaLock className="login__icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="login__input"
              />
            </div>
            <button className="login__submit" onClick={handleSignUp}>
              SIGN UP NOW <FaArrowRight className="button__icon" />
            </button>
            <p
              style={{
                color: "#000000",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Already have an account?{" "}
              <a href="/" style={{ color: "#000000" }}>
                Log In
              </a>
            </p>
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

export default SignUpPage;
