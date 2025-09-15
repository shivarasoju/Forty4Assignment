import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "../components/UserForm";

const UserFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchUser();
    }
  }, [id, isEditMode]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${id}`);
      setUser(response.data.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setMessage("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setErrors({});
    setMessage("");

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:8080/api/users/${id}`, formData);
        setMessage("User updated successfully!");
      } else {
        await axios.post("http://localhost:8080/api/users", formData);
        setMessage("User created successfully!");
      }

      // Redirect to user list after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Error saving user:", err);

      if (err.response && err.response.data && err.response.data.error) {
        const errorMessage = err.response.data.error;

        // Handle specific error cases
        if (errorMessage.includes("Email already exists")) {
          setErrors({ email: "Email already exists" });
        } else if (errorMessage.includes("required")) {
          // Extract field-specific errors from the message
          const fieldErrors = {};
          if (errorMessage.includes("Name"))
            fieldErrors.name = "Name is required";
          if (errorMessage.includes("Email"))
            fieldErrors.email = "Email is required";
          if (errorMessage.includes("Phone"))
            fieldErrors.phone = "Phone is required";
          setErrors(fieldErrors);
        } else {
          setMessage(errorMessage);
        }
      } else {
        setMessage("Failed to save user. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>Loading user details...</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{isEditMode ? "Edit User" : "Add New User"}</h2>

      {message && (
        <div
          style={{
            ...alertStyle,
            ...(message.includes("success")
              ? successAlertStyle
              : errorAlertStyle),
          }}
        >
          {message}
        </div>
      )}

      <UserForm
        user={user}
        onSubmit={handleSubmit}
        loading={submitting}
        errors={errors}
      />
    </div>
  );
};

const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "0 1rem",
};

const titleStyle = {
  color: "#2c3e50",
  marginBottom: "2rem",
};

const alertStyle = {
  padding: "1rem",
  borderRadius: "4px",
  marginBottom: "1.5rem",
};

const successAlertStyle = {
  backgroundColor: "#d4edda",
  color: "#155724",
  border: "1px solid #c3e6cb",
};

const errorAlertStyle = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  border: "1px solid #f5c6cb",
};

const loadingStyle = {
  textAlign: "center",
  padding: "2rem",
  fontSize: "1.2rem",
  color: "#6c757d",
};

export default UserFormPage;
