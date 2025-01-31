import React from "react";
import InputField from "./InputField";

const SignUpForm = () => {
  return (
    <div style={{ margin: "auto", maxWidth: "400px", textAlign: "center" }}>
      <h2>Create an Account</h2>
      <InputField type="text" placeholder="Full Name" />
      <InputField type="email" placeholder="Email" />
      <InputField type="password" placeholder="Password" />
      <button
        style={{
          padding: "10px 20px",
          margin: "10px 0",
          background: "#28a745",
          color: "#fff",
          border: "none",
        }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUpForm;
