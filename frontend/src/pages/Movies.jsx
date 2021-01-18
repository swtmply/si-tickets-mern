import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

import Nav from "../components/Nav";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const { data, isLoading, error } = useQuery("movies", async () => {
    return await axios.get("/api/movies").then((res) => res.data);
  });

  if (isLoading) return <div>Loading...</div>;

  const dateNow = moment(Date.now()).format("YYYY-MM-DD");

  const showing = data.filter((movie) => {
    return (
      moment(dateNow).isBetween(movie.release, movie.end) ||
      moment(dateNow).isSame(movie.release)
    );
  });

  const incoming = data.filter((movie) => {
    return moment(dateNow).isBefore(movie.release);
  });

  return (
    <>
      <Nav />

      <div className="container">
        <div className="showing">
          <div className="title">
            <p className="pre-title">showing</p>
            <h3>Don’t miss this movies now</h3>
          </div>
          <div className="movies">
            {showing.map((movie, index) => (
              <Link className="link" to={`/movie/${movie._id}`}>
                <MovieCard key={index} movie={movie} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="incoming">
          <div className="title">
            <p className="pre-title">incoming</p>
            <h3>Ready your money for this movies.</h3>
          </div>
          <div className="movies">
            {incoming.map((movie, index) => (
              <Link className="link" to={`/movie/${movie._id}`}>
                <MovieCard key={index} movie={movie} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
