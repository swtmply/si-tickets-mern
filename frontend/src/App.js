import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

//components
import AdminRoute from "./components/routes/Admin";
import UserRoute from "./components/routes/User";
import MovieEditForm from "./components/forms/MovieEditForm";
import MovieCreateForm from "./components/forms/MovieCreateForm";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <UserRoute exact path="/home" component={Home} />
        <AdminRoute exact path="/dashboard" component={Dashboard} />
        <AdminRoute
          exact
          path="/dashboard/movie/:id"
          component={MovieEditForm}
        />
        <AdminRoute
          exact
          path="/dashboard/create/movie"
          component={MovieCreateForm}
        />
      </Switch>
    </Router>
  );
};

export default App;
