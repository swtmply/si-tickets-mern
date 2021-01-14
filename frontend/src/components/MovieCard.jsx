import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="card">
      <img src={movie.imageURL} height="300px" width="200px" alt="Movie" />
      <h3>{movie.title}</h3>
      <p className="strong">{movie.movieDuration}</p>
      <p>Php {movie.price}</p>
    </div>
  );
};

export default MovieCard;
