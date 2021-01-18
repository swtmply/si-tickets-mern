import React, { useState } from "react";

import Dashboard from "../Dashboard";
import MovieTable from "../../components/tables/MovieTable";
import MovieForm from "../../components/forms/MovieCreateForm";

const Movies = () => {
  const [component, setComponent] = useState(0);

  return (
    <Dashboard>
      <div className="dashboard-title">
        <h2>Movies Page</h2>
      </div>

      <div className="dashboard-button">
        <div className="buttons">
          <button
            className={component === 0 ? "primary" : "outline-primary"}
            onClick={() => setComponent(0)}
          >
            Movies List
          </button>
          <button
            className={component === 1 ? "primary" : "outline-primary"}
            onClick={() => setComponent(1)}
          >
            Add New Movie
          </button>
        </div>
      </div>

      <div className="dashboard-component">
        {component ? <MovieForm /> : <MovieTable />}
      </div>
    </Dashboard>
  );
};

export default Movies;
