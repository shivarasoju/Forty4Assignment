import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserList from "../components/UserList";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users`
      );

      setUsers(response.data.data);
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`);

      // Refresh the user list after deletion
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>User Management</h2>
        <button onClick={() => navigate("/add-user")} style={addButtonStyle}>
          Add New User
        </button>
      </div>

      {error && (
        <div style={errorAlertStyle}>
          {error}
          <button onClick={fetchUsers} style={retryButtonStyle}>
            Retry
          </button>
        </div>
      )}

      <UserList users={users} onDelete={handleDelete} loading={loading} />
    </div>
  );
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1rem",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
};

const titleStyle = {
  color: "#2c3e50",
  margin: 0,
};

const addButtonStyle = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

const errorAlertStyle = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "1rem",
  borderRadius: "4px",
  marginBottom: "1.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const retryButtonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default UserListPage;
