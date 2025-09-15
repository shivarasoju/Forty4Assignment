import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav style={navbarStyle}>
      <div style={navContainerStyle}>
        <h1 style={logoStyle}>User Management</h1>
        <div style={navLinksStyle}>
          <Link
            to="/"
            style={{
              ...navLinkStyle,
              ...(location.pathname === "/" ? activeLinkStyle : {}),
            }}
          >
            Users List
          </Link>
          <Link
            to="/add-user"
            style={{
              ...navLinkStyle,
              ...(location.pathname === "/add-user" ? activeLinkStyle : {}),
            }}
          >
            Add User
          </Link>
        </div>
      </div>
    </nav>
  );
};

const navbarStyle = {
  backgroundColor: "#2c3e50",
  color: "white",
  padding: "1rem 0",
  marginBottom: "2rem",
};

const navContainerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 1rem",
};

const logoStyle = {
  margin: 0,
  fontSize: "1.8rem",
};

const navLinksStyle = {
  display: "flex",
  gap: "1.5rem",
};

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  transition: "background-color 0.3s",
};

const activeLinkStyle = {
  backgroundColor: "#34495e",
};

export default Navbar;
