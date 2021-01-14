import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SELECTED = {
  background: "#1f1f1f",
};

const Seats = ({ id, occupied, price }) => {
  // TODO: post ticket to user
  const [seats, setSeats] = useState([]);
  const history = useHistory();

  const checkDisabled = (index) => {
    if (occupied.find((v) => v === index)) return true;

    return false;
  };

  const checkSelect = (index) => {
    if (seats.find((v) => v === index)) return SELECTED;

    return null;
  };

  const onSelect = (index) => {
    if (seats.find((v) => v === index)) {
      setSeats(seats.filter((s) => s !== index));
    } else {
      setSeats([...seats, index]);
    }
  };

  const checkout = async () => {
    try {
      const response = await axios.post(`/api/movies/${id}/seat`, { seats });
      if (response) history.push("/home");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="container">
        <div className="seat-container">
          <div className="seats">
            {[...Array(15)].map((_, index) => {
              return (
                <div key={index}>
                  <button
                    onClick={() => {
                      onSelect(index);
                    }}
                    disabled={checkDisabled(index)}
                    className="seat"
                    style={checkSelect(index)}
                  >
                    {index + 1}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="seats">
            {[...Array(15)].map((_, index) => {
              return (
                <div key={index + 15}>
                  <button
                    onClick={() => onSelect(index + 15)}
                    disabled={checkDisabled(index + 15)}
                    className="seat"
                    style={checkSelect(index + 15)}
                  >
                    {index + 16}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="tickets-container">
          <div className="title">
            <p className="pre-title">Tickets</p>
            <h3>Orders</h3>
          </div>
          {seats.map((seat, index) => (
            <div className="tickets" key={index}>
              <div className="flex">
                <p className="strong">Seat </p>
                <h3>{seat + 1}</h3>
              </div>

              <p className="strong">Php {price}</p>
              <button
                onClick={() => {
                  onSelect(seat);
                }}
                style={{ color: "#db5050" }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="button-container">
          <button className="primary" onClick={checkout}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Seats;