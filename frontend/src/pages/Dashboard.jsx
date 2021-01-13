import React from "react";
import { Link } from "react-router-dom";

import MovieTable from "../components/tables/MovieTable";
// import UserTable from "../components/tables/UserTable";

const Dashboard = () => {
  return (
    <div>
      <Link to="/dashboard/create/movie">
        <button>New Movie</button>
      </Link>
      <MovieTable />
    </div>
  );
};

export default Dashboard;
