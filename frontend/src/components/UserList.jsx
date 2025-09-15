import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users, onDelete, loading }) => {
  if (loading) {
    return <div style={loadingStyle}>Loading users...</div>;
  }

  if (users.length === 0) {
    return <div style={noUsersStyle}>No users found.</div>;
  }

  return (
    <div style={tableContainerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={trStyle}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.phone}</td>
              <td style={tdStyle}>{user.address || "N/A"}</td>
              <td style={tdStyle}>
                <div style={actionsStyle}>
                  <Link to={`/edit-user/${user.id}`} style={editButtonStyle}>
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(user.id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableContainerStyle = {
  overflowX: "auto",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  overflow: "hidden",
};

const thStyle = {
  backgroundColor: "#f8f9fa",
  padding: "1rem",
  textAlign: "left",
  fontWeight: "600",
  color: "#2c3e50",
  borderBottom: "2px solid #e9ecef",
};

const trStyle = {
  borderBottom: "1px solid #e9ecef",
};

const tdStyle = {
  padding: "1rem",
  color: "#495057",
};

const actionsStyle = {
  display: "flex",
  gap: "0.5rem",
};

const editButtonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#17a2b8",
  color: "white",
  textDecoration: "none",
  borderRadius: "4px",
  fontSize: "0.875rem",
  border: "none",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "0.875rem",
  cursor: "pointer",
};

const loadingStyle = {
  textAlign: "center",
  padding: "2rem",
  fontSize: "1.2rem",
  color: "#6c757d",
};

const noUsersStyle = {
  textAlign: "center",
  padding: "2rem",
  fontSize: "1.2rem",
  color: "#6c757d",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

export default UserList;
