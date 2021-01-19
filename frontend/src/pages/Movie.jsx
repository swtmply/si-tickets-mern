import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";

import Nav from "../components/Nav";
import Seats from "../components/Seats";

const Movie = ({ match }) => {
  const { id } = match.params;

  const { data, isLoading, error } = useQuery("movie", async () => {
    return await axios.get(`/api/movies/${id}`).then((res) => res.data);
  });

  const now = Date.now();

  if (isLoading) return <div className="loading">Loading...</div>;

  if (error) return <div className="error">Error fetching data</div>;

  return (
    <>
      <Nav />

      <div className="movie-container">
        <div className="movie">
          <div className="movie-info">
            <div className="title">
              <p className="pre-title">cinema {data.cinema}</p>
              <h2>{data.title}</h2>
            </div>
            <p>{data.description}</p>
            <div className="production">
              <h3>Production</h3>
              <div className="group">
                <div className="member">
                  <p className="strong">DIRECTOR</p>
                  <p>{data.director}</p>
                </div>
                <div className="member">
                  <p className="strong">CASTS</p>
                  <p>{data.casts}</p>
                </div>
              </div>
            </div>
            <div className="schedule">
              <h3>Schedule</h3>
              <div className="group">
                <div className="member">
                  <p className="strong">RELEASE</p>
                  <p>{data.release}</p>
                </div>
                <div className="member">
                  <p className="strong">TIME</p>
                  <p>1:00PM-7:00PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="image">
            <img src={data.imageURL} height="500px" width="350px" alt="Movie" />
          </div>
        </div>
      </div>

      {moment(now).isBetween(moment(data.release), moment(data.end)) && (
        <>
          <div className="container">
            <div className="cinema">
              <div className="title">
                <p className="pre-title">Schedule</p>
                <h3>Seats</h3>
              </div>
              <div className="legend">
                <span className="seat">Available</span>
                <span className="seat" style={{ background: "#db5050" }}>
                  Taken
                </span>
                <span className="seat" style={{ background: "#1f1f1f" }}>
                  Selected
                </span>
              </div>
            </div>
          </div>
          <Seats
            id={data._id}
            price={data.price}
            occupied={data.occupied}
            name={data.title}
          />
        </>
      )}
    </>
  );
};

export default Movie;
