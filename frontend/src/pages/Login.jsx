import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import useForm from "../hooks/useForm";
import { validateLogin } from "../utils/FormValidation";

const Login = () => {
  const { handleChange, handleSubmit, errors, setErrors } = useForm(
    userLogin,
    validateLogin
  );
  const history = useHistory();

  async function userLogin(values) {
    try {
      const data = await axios
        .post("/api/users/login", values)
        .then((res) => res.data);

      localStorage.setItem("token", data);
      history.push("/dashboard");
    } catch (error) {
      setErrors({ ...errors, message: error.response.data.message });
    }
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
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
          <button type="submit">Log-in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
