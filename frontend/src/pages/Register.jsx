import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import useForm from "../hooks/useForm";
import { validateRegister } from "../utils/FormValidation";

const Register = () => {
  const { errors, setErrors, handleChange, handleSubmit } = useForm(
    register,
    validateRegister
  );
  const history = useHistory();

  async function register(values) {
    try {
      const response = await axios
        .post("/api/users/create", values)
        .then((res) => res.data);

      if (response) history.push("/home");
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <div className="container">
      <div className="">
        <h2>Register</h2>
        <form className="form-register" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Name:</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              className="form-input"
            />
            {(errors.name || errors.message) && (
              <pre>{errors.name || errors.message}</pre>
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Username:</label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              className="form-input"
            />
            {(errors.username || errors.message) && (
              <pre>{errors.username || errors.message}</pre>
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Email:</label>
            <input
              onChange={handleChange}
              type="text"
              name="email"
              className="form-input"
            />
            {(errors.email || errors.message) && (
              <pre>{errors.email || errors.message}</pre>
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Contact:</label>
            <input
              onChange={handleChange}
              type="text"
              name="contact"
              className="form-input"
            />
            {(errors.contact || errors.message) && (
              <pre>{errors.contact || errors.message}</pre>
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Password:</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              className="form-input"
            />
            {(errors.password || errors.message) && (
              <pre>{errors.password || errors.message}</pre>
            )}
          </div>
          <div className="form-field">
            <label className="form-label">Confirm Password:</label>
            <input
              onChange={handleChange}
              type="password"
              name="password1"
              className="form-input"
            />
            {(errors.password1 || errors.message) && (
              <pre>{errors.password1 || errors.message}</pre>
            )}
          </div>
          <div className="form-field">
            <button className="primary" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
