import { Schema, model } from "mongoose";

// create schema for ticket
const ticketSchema = new Schema(
  {
    movie: String,
    date: String,
    time: String,
    seats: [String],
  },
  { timestamps: true }
);

// export schema as mongoose model
export default model("Ticket", ticketSchema);
