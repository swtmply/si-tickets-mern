import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";

import useForm from "../../hooks/useForm";
import { validateEditUser } from "../../utils/FormValidation";

import Dashboard from "../../pages/Dashboard";

const UserCreateForm = ({ match }) => {
  const { id } = match.params;
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useForm(register, validateEditUser);
  const history = useHistory();

  const { data, isLoading, error } = useQuery("info", async () => {
    return await axios.get(`/api/users/${id}`).then((res) => res.data);
  });

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  async function register(values) {
    try {
      const response = await axios
        .put(`/api/users/${data._id}/update`, values)
        .then((res) => res.data);

      if (response) history.push("/dashboard/users");
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  if (isLoading) return <div className="">Loading...</div>;

  if (error) return <div className="">Error Fetching data</div>;

  return (
    <Dashboard>
      <div className="dashboard-title">
        <h2>Users Page</h2>
      </div>

      <div className="dashboard-component">
        <div className="admin-form">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-field">
                <label className="form-label">Name:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  className="form-input"
                  value={values.name || ""}
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
                  value={values.username || ""}
                />
                {(errors.username || errors.message) && (
                  <pre>{errors.username || errors.message}</pre>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="form-field">
                <label className="form-label">Email:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="email"
                  className="form-input"
                  value={values.email || ""}
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
                  value={values.contact || ""}
                />
                {(errors.contact || errors.message) && (
                  <pre>{errors.contact || errors.message}</pre>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="form-field">
                <label className="form-label">Password:</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  className="form-input"
                  value={values.password || ""}
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
            </div>
            <div className="form-field">
              <label className="form-label">Role</label>
              <select
                value={values.role || "user"}
                onChange={handleChange}
                name="role"
              >
                <option value="">Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="form-field">
              <button
                disabled={isSubmitting}
                className="primary createBtn"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
};

export default UserCreateForm;
