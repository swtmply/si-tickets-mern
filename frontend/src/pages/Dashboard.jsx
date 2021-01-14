import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ children }) => {
  return (
    <div>
      <Link to="/dashboard/users">Users</Link>
      <Link to="/dashboard/movies">Movies</Link>
      {children}
    </div>
  );
};

export default Dashboard;
