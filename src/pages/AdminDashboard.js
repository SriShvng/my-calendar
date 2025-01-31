import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const goToCalendar = () => {
    navigate("/calendar");
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={goToCalendar}>Go to Calendar</button>
      <button onClick={() => navigate("/manage-events")}>Manage Events</button>
      <button onClick={() => navigate("/manage-users")}>Manage Users</button>
      <button onClick={() => navigate("/settings")}>Settings</button>
      <button onClick={handleLogoutClick} style={{ backgroundColor: "red" }}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
