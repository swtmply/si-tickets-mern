import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const MovieTable = () => {
  const { data, isLoading, error } = useQuery("contents", async () => {
    return await axios.get(`/api/movies`).then((res) => res.data);
  });

  const [searchTerm, setSearchTerm] = useState('');

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

      <div className="search">
        <input 
          type="text" 
          placeholder="Search title..." 
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      <div className="row">
        <div className="column">
          <h3>Title</h3>
        </div>
        <div className="column">
          <h3>Cinema</h3>
        </div>
        <div className="column">
          <h3>Release Date</h3>
        </div>
        <div className="column">
          <h3>Price</h3>
        </div>
        <div className="column">
          <h3>Status</h3>
        </div>
        <div className="column">
          <h3>Action</h3>
        </div>
      </div>

      {data.filter((movie)=> {
        if (searchTerm == "") {
          return movie;
        } else if (movie.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return movie;
        }
      }).map((movie, index) => (
        <div key={index} className="row">
          <div className="column">
            <p>{movie.title}</p>
          </div>
          <div className="column">
            <p>{movie.cinema}</p>
          </div>
          <div className="column">
            <p>{moment(movie.release).format("MM/DD/YYYY")}</p>
          </div>
          <div className="column">
            <p>{movie.price}</p>
          </div>
          <div className="column">{status(movie.release, movie.end)}</div>
          <div className="column">
            <Link to={`/dashboard/movie/${movie._id}`}>
              <button className="primary">edit</button>
            </Link>
            <button
              className="outline-primary"
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
  );
};

export default MovieTable;
