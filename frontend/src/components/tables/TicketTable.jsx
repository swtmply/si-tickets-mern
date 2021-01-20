import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useHistory } from "react-router-dom";

import useUser from "../../hooks/useUser";

// ticket table component
const TicketTable = () => {
  const { data: user } = useUser();
  
  // useHistory for pages
  const history = useHistory();

  const { data, error, isLoading } = useQuery("tickets", async () => {
    // using axios to access the backend
    return await axios
      .get(`/api/users/${user._id}/tickets`)
      .then((res) => res.data);
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="r">
      <div className="container ticket-container">
        {data.tickets.map((ticket, index) => (
          <div className="ticket-list" key={index}>
            <div className="">
              <div className="pre-title">title</div>
              <h3>{ticket.movie}</h3>
            </div>
            <div className="">
              <div className="pre-title">date</div>
              <p>{ticket.date}</p>
            </div>
            <div className="">
              <div className="pre-title">time</div>
              <p>{ticket.time}</p>
            </div>
            <div className="">
              <div className="pre-title">seats</div>
              {ticket.seats.map((seat, index) => (
                <p key={index}>{seat},</p>
              ))}
            </div>

            <button
              className="primary"
              onClick={async () => {
                await axios
                  .post(`/api/tickets/${user._id}/${ticket._id}`)
                  .then((res) => console.log(res.data));

                await axios.post(`/api/movies/${ticket.movie}/remove/seat`, {
                  seats: ticket.seats,
                });
                history.push("/home");
              }}
              // movies/id/remove/seat
            >
              Cancel Reservation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketTable;
