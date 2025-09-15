import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserListPage from "./components/UserListPage";
import UserFormPage from "./components/UserFormPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/add-user" element={<UserFormPage />} />
          <Route path="/edit-user/:id" element={<UserFormPage />} />
        </Routes>
      </main>
    </div>
  );
}

const mainStyle = {
  minHeight: "calc(100vh - 80px)",
  backgroundColor: "#f8f9fa",
  padding: "2rem 0",
};

export default App;
