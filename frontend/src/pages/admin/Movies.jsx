import React, { useState } from "react";

import Dashboard from "../Dashboard";
import MovieTable from "../../components/tables/MovieTable";
import MovieForm from "../../components/forms/MovieCreateForm";

const Movies = () => {
  const [component, setComponent] = useState(0);

  return (
    <Dashboard>
      <h2>Movies Page</h2>

      <button onClick={() => setComponent(0)}>Movies List</button>
      <button onClick={() => setComponent(1)}>Add New User</button>

      {component ? <MovieForm /> : <MovieTable />}
    </Dashboard>
  );
};

export default Movies;
