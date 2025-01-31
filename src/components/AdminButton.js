import React from "react";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${(props) => (props.isAdmin ? "#007bff" : "#ff6600")};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
`;

const AdminButton = ({ isAdmin, onClick }) => {
  return (
    <Button isAdmin={isAdmin} onClick={onClick}>
      {isAdmin ? "Toggle User" : "Toggle Admin"}
    </Button>
  );
};

export default AdminButton;
