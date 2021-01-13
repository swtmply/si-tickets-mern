import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const MovieTable = () => {
  const { data, isLoading, error } = useQuery("contents", async () => {
    return await axios.get(`/api/movies`).then((res) => res.data);
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching data</div>;

  const status = (release, end) => {
    const now = Date.now();

    if (moment(now).isBefore(release)) return <p>Incoming</p>;
    if (moment(now).isAfter(end)) return <p>Ended</p>;

    return <p>Showing</p>;
  };

  return (
    <div className="table">
      <div className="row">
        <div className="columnn">
          <h1>Title</h1>
        </div>
        <div className="columnn">
          <h1>Cinema</h1>
        </div>
        <div className="columnn">
          <h1>Release Date</h1>
        </div>
        <div className="columnn">
          <h1>Price</h1>
        </div>
        <div className="columnn">
          <h1>Status</h1>
        </div>
        <div className="columnn">
          <h1>Action</h1>
        </div>
      </div>

      <div className="row">
        {data.map((movie, index) => (
          <div key={index}>
            <div className="column">
              <p>{movie.title}</p>
            </div>
            <div className="column">
              <p>{movie.cinema}</p>
            </div>
            <div className="column">
              <p>{movie.release}</p>
            </div>
            <div className="column">
              <p>{movie.price}</p>
            </div>
            <div className="column">{status(movie.release, movie.end)}</div>
            <div className="column">
              <Link to={`/dashboard/movie/${movie._id}`}>
                <button>edit</button>
              </Link>
              <button
                onClick={async () => {
                  await axios.delete(`/api/movies/${movie._id}/delete`);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieTable;
