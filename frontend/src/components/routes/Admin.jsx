import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

import decode from "jwt-decode";

const AdminRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const { id } = decode(token, "3ghbYRrGvLTunrPeQ3Pk");

  const { data, isLoading } = useQuery("user", async () => {
    return await axios.get(`/api/users/${id}`).then((res) => res.data);
  });

  if (isLoading) return <div>loading...</div>;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (data.role === "admin") {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default AdminRoute;
