import React from "react";

import LoginForm from "../components/forms/LoginForm";

const Landing = () => {
  return (
    <div className="background">
      <div className="info">
        <div className="paragraph">
          <h2>Help yourself up.</h2>
          <p>
            Never miss your long-awaited movie and get the best seat in the
            cinema.
          </p>
          <p>
            Choose the best movies and reserve a seat for you and your friends.
          </p>
        </div>
        <h2>Enjoy your popcorn.</h2>
      </div>
      <LoginForm />
    </div>
  );
};

export default Landing;
