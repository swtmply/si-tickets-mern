import React from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import { validateLogin } from "../../utils/FormValidation";

// error style for catch error
const ERROR_STYLE = {
  border: "2px solid #db5050",
};

// Login form
const LoginForm = () => {
  const {
    isSubmitting,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
  } = useForm(userLogin, validateLogin);

  // useHistory of pages
  const history = useHistory();

  // submit function of the form
  async function userLogin(values) {
    try {
      // using axios to access the backend
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
    <div className="form-container">
      <h2>SIGN-IN</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label strong">USERNAME:</label>
          <input
            placeholder="Username"
            onChange={handleChange}
            type="text"
            name="username"
            className="form-input"
            style={(errors.username || errors.message) && ERROR_STYLE}
          />
          {(errors.username || errors.message) && (
            <pre>{errors.username || errors.message}</pre>
          )}
        </div>
        <div className="form-field">
          <label className="form-label strong">PASSWORD:</label>
          <input
            placeholder="Password"
            onChange={handleChange}
            type="password"
            name="password"
            className="form-input"
            style={(errors.username || errors.message) && ERROR_STYLE}
          />
          {(errors.password || errors.message) && (
            <pre>{errors.password || errors.message}</pre>
          )}
        </div>
        <div className="form-field">
          <button
            disabled={isSubmitting}
            className="primary login"
            type="submit"
          >
            Log-in
          </button>
        </div>
      </form>
      <Link to="/register">
        <p className="strong">CREATE ACCOUNT NOW</p>
      </Link>
      <p className="strong">CANNOT SIGN-IN?</p>
    </div>
  );
};

export default LoginForm;
