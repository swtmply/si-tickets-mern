import { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    movie: String,
    date: String,
    time: String,
    seats: String,
  },
  { timestamps: true }
);

export default model("Ticket", ticketSchema);
