import React, { useState } from "react";
import InputField from "./InputField";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: auto;
  max-width: 400px;
  text-align: center;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
`;

const LoginForm = ({ isAdmin, onSubmit, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Wrapper>
      <h2>{isAdmin ? "Admin Login" : "User Login"}</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <LoginButton type="submit">
          {isAdmin ? "Login as Admin" : "Login as User"}
        </LoginButton>
      </form>
    </Wrapper>
  );
};

export default LoginForm;
