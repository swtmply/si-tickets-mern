import React from "react";

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav">
        <h2>SI TICKETS</h2>
        <div className="menu">
          <button>home</button>
          <button>movies</button>
          <button>tickets</button>
          <button>logout</button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
