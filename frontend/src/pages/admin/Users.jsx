import React, { useState } from "react";

import Dashboard from "../Dashboard";
import UserTable from "../../components/tables/UserTable";
import UserForm from "../../components/forms/UserCreateForm";

const Users = () => {
  const [component, setComponent] = useState(0);

  return (
    <Dashboard>
      <div className="dashboard-title">
        <h2>Users Page</h2>
      </div>

      <div className="dashboard-button">
        <div className="buttons">
          <button
            className={component === 0 ? "primary" : "outline-primary"}
            onClick={() => setComponent(0)}
          >
            Users List
          </button>
          <button
            className={component === 1 ? "primary" : "outline-primary"}
            onClick={() => setComponent(1)}
          >
            Add New User
          </button>
        </div>
      </div>

      <div className="dashboard-component">
        {component ? <UserForm /> : <UserTable />}
      </div>
    </Dashboard>
  );
};

export default Users;
