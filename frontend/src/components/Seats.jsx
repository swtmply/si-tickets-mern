import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Modal from "./Modal";

const SELECTED = {
  background: "#1f1f1f",
};

const Seats = ({ id, occupied, price }) => {
  // TODO: post ticket to user
  const [seats, setSeats] = useState([]);
  const [modal, setModal] = useState(false);
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
                      onSelect(index + 1);
                    }}
                    disabled={checkDisabled(index + 1)}
                    className="seat"
                    style={checkSelect(index + 1)}
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
                    onClick={() => onSelect(index + 16)}
                    disabled={checkDisabled(index + 16)}
                    className="seat"
                    style={checkSelect(index + 16)}
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
                <h3>{seat}</h3>
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
          <button className="primary" onClick={() => setModal(true)}>
            Checkout
          </button>
        </div>
      </div>

      <Modal isOpen={modal} isClose={() => setModal(false)}>
        <div className="ticket-info">
          <div className="ticket-title">
            <div className="title">
              <p className="pre-title">Ordered</p>
              <h3>Seats</h3>
            </div>
          </div>
          <div className="tickets">
            {seats.map((s, i) => {
              return (
                <p className="strong" key={i}>
                  Seat {s}
                </p>
              );
            })}
          </div>

          {seats.map((s, i) => {
            if (i === seats.length - 1)
              return (
                <div className="ticket-title">
                  <div className="title">
                    <p className="pre-title">Total</p>
                    <h3>Price: </h3>
                  </div>

                  <h2 className="price">{price * seats.length}</h2>
                </div>
              );
          })}
          <button
            disabled={seats.length === 0 ? true : false}
            className="primary"
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Seats;
