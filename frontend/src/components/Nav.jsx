import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav">
        <h2>SI TICKETS</h2>
        <div className="menu">
          <Link to="/home">
            <button>home</button>
          </Link>
          <Link to="/movies">
            <button>movies</button>
          </Link>
          <button>tickets</button>
          <Link to="/">
            <button>logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
