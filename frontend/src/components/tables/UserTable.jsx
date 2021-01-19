import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const UserTable = ({ setComponent }) => {
  const { data, isLoading, error } = useQuery("contents", async () => {
    return await axios.get(`/api/users`).then((res) => res.data);
  });
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching data</div>;

  return (
    <div className="table">
      <div className="search">
        <input
          type="text"
          placeholder="Search name..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <div className="row">
        <div className="column">
          <h3>Name</h3>
        </div>
        <div className="column">
          <h3>Username</h3>
        </div>
        <div className="column">
          <h3>Email</h3>
        </div>
        <div className="column">
          <h3>Contact</h3>
        </div>
        <div className="column">
          <h3>Role</h3>
        </div>
        <div className="column">
          <h3>Action</h3>
        </div>
      </div>

      {data
        .filter((user) => {
          if (searchTerm == "") {
            return user;
          } else if (
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return user;
          }
        })
        .map((user, index) => (
          <div key={index} className="row">
            <div className="column">
              <p>{user.name}</p>
            </div>
            <div className="column">
              <p>{user.username}</p>
            </div>
            <div className="column">
              <p>{user.email && user.email.substring(0, 10) + "..."}</p>
            </div>
            <div className="column">
              <p>{user.contact}</p>
            </div>
            <div className="column">
              <p>{user.role}</p>
            </div>
            <div className="column">
              <Link to={`/dashboard/user/${user._id}`}>
                <button className="primary">edit</button>
              </Link>
              <button
                className="outline-primary"
                onClick={async () => {
                  await axios.delete(`/api/users/${user._id}/delete`);
                  history.push("/dashboard/users");
                }}
              >
                delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserTable;
