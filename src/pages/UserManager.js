import React, { useState, useEffect } from "react";

const UserManager = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDisableUser = async (id) => {
    await fetch(`/api/users/${id}/disable`, { method: "PUT" });
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, disabled: !user.disabled } : user
      )
    );
  };

  return (
    <div>
      <h2>User Management</h2>
      {users.map((user) => (
        <div key={user.id}>
          <span>
            {user.email} - {user.disabled ? "Disabled" : "Active"}
          </span>
          <button onClick={() => handleDisableUser(user.id)}>
            {user.disabled ? "Enable" : "Disable"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserManager;
