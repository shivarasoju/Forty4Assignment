import React, { useState, useEffect } from "react";

const UserForm = ({ user, onSubmit, loading, errors: propErrors }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (propErrors) {
      setErrors(propErrors);
    }
  }, [propErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="name" style={labelStyle}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              ...inputStyle,
              ...(errors.name ? inputErrorStyle : {}),
            }}
            placeholder="Enter full name"
          />
          {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              ...inputStyle,
              ...(errors.email ? inputErrorStyle : {}),
            }}
            placeholder="Enter email address"
          />
          {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="phone" style={labelStyle}>
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              ...inputStyle,
              ...(errors.phone ? inputErrorStyle : {}),
            }}
            placeholder="Enter phone number"
          />
          {errors.phone && <span style={errorTextStyle}>{errors.phone}</span>}
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="address" style={labelStyle}>
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={textareaStyle}
            placeholder="Enter address"
            rows="3"
          />
        </div>

        <div style={formActionsStyle}>
          <button type="submit" disabled={loading} style={submitButtonStyle}>
            {loading ? "Processing..." : user ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

const formContainerStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const formStyle = {
  maxWidth: "600px",
  margin: "0 auto",
};

const formGroupStyle = {
  marginBottom: "1.5rem",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontWeight: "600",
  color: "#2c3e50",
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: "1px solid #ced4da",
  borderRadius: "4px",
  fontSize: "1rem",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  minHeight: "80px",
};

const inputErrorStyle = {
  borderColor: "#dc3545",
};

const errorTextStyle = {
  color: "#dc3545",
  fontSize: "0.875rem",
  marginTop: "0.25rem",
  display: "block",
};

const formActionsStyle = {
  marginTop: "2rem",
  textAlign: "right",
};

const submitButtonStyle = {
  padding: "0.75rem 2rem",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

export default UserForm;
