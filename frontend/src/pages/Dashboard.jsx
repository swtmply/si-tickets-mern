import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ children }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-menu">
        <Link to="/dashboard/users">
          <div className="btn">
            <h3 className="subtitle dashboard-btn">Users</h3>
          </div>
        </Link>
        <Link to="/dashboard/movies">
          <div className="btn">
            <h3 className="subtitle dashboard-btn">Movies</h3>
          </div>
        </Link>
      </div>
      <div className="dashboard-content">{children}</div>
    </div>
  );
};

export default Dashboard;
