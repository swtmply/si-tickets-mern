import { Schema, model } from "mongoose";

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

export default model("Movie", movieSchema);
