import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Movie from "./pages/Movie";
import UsersPage from "./pages/admin/Users";
import MoviesPage from "./pages/admin/Movies";

//components
import AdminRoute from "./components/routes/Admin";
import UserRoute from "./components/routes/User";
import MovieEditForm from "./components/forms/MovieEditForm";
import UserEditForm from "./components/forms/UserEditForm";
import MovieCreateForm from "./components/forms/MovieCreateForm";
import UserCreateForm from "./components/forms/UserCreateForm";

const App = () => {
  return (
    // using react-router-dom router and route component
    // we have the ability to change routes using components
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <UserRoute exact path="/home" component={Home} />
        <UserRoute exact path="/movies" component={Movies} />
        <UserRoute exact path="/movie/:id" component={Movie} />
        <AdminRoute exact path="/dashboard" component={Dashboard} />
        <AdminRoute
          exact
          path="/dashboard/movie/:id"
          component={MovieEditForm}
        />
        <AdminRoute exact path="/dashboard/user/:id" component={UserEditForm} />
        <AdminRoute
          exact
          path="/dashboard/create/movie"
          component={MovieCreateForm}
        />
        <AdminRoute
          exact
          path="/dashboard/create/user"
          component={UserCreateForm}
        />
        <AdminRoute exact path="/dashboard/users" component={UsersPage} />
        <AdminRoute exact path="/dashboard/movies" component={MoviesPage} />
      </Switch>
    </Router>
  );
};

export default App;
