import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const UserTable = () => {
  const { data, isLoading, error } = useQuery("contents", async () => {
    return await axios.get(`/api/users`).then((res) => res.data);
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching data</div>;

  return (
    <div className="table">
      <div className="row">
        <div className="columnn">
          <h1>Name</h1>
        </div>
        <div className="columnn">
          <h1>Username</h1>
        </div>
        <div className="columnn">
          <h1>Email</h1>
        </div>
        <div className="columnn">
          <h1>Contact</h1>
        </div>
        <div className="columnn">
          <h1>Role</h1>
        </div>
        <div className="columnn">
          <h1>Action</h1>
        </div>
      </div>

      <div className="row">
        {data.map((user, index) => (
          <div key={index}>
            <div className="column">
              <p>{user.name}</p>
            </div>
            <div className="column">
              <p>{user.username}</p>
            </div>
            <div className="column">
              <p>{user.email}</p>
            </div>
            <div className="column">
              <p>{user.contact}</p>
            </div>
            <div className="column">
              <p>{user.role}</p>
            </div>
            <div className="column">
              <Link to={`/dashboard/user/${user._id}`}>
                <button>edit</button>
              </Link>
              <button
                onClick={async () => {
                  await axios.delete(`/api/users/${user._id}/delete`);
                }}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
