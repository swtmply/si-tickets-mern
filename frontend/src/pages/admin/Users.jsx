import React, { useState } from "react";

import Dashboard from "../Dashboard";
import UserTable from "../../components/tables/UserTable";
import UserForm from "../../components/forms/UserCreateForm";

const Users = () => {
  const [component, setComponent] = useState(0);

  return (
    <Dashboard>
      <h2>Users Page</h2>

      <button onClick={() => setComponent(0)}>Users List</button>
      <button onClick={() => setComponent(1)}>Add New User</button>

      {component ? <UserForm /> : <UserTable />}
    </Dashboard>
  );
};

export default Users;
