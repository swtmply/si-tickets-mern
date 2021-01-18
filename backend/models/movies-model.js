import { Schema, model } from "mongoose";

// create schema for movie
const movieSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    director: String,
    casts: String,
    category: String,
    cinema: Number,
    occupied: { type: [Number], default: [] },
    movieDuration: String,
    release: String,
    end: String,
    showDuration: Number,
    imageURL: String,
  },
  { timestamps: true }
);

// export schema as mongoose model
export default model("Movie", movieSchema);
