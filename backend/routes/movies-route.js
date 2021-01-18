import { Router } from "express";

import { cloudinary } from "../utils/cloudinary";
import Movie from "../models/movies-model";
const router = Router();

// get all movies
router.get("/", async (req, res) => {
  try {
    // find({}) function to return all existing data
    const movies = await Movie.find({});
    // send data as json
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Cannot find data" });
  }
});

// get one movie
router.get("/:id", async (req, res) => {
  try {
    // findById(:id) function to request one movie
    const movie = await Movie.findById(req.params.id);
    // send data as json
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Cannot find data" });
  }
});

// add seat
router.post("/:id/seat", async (req, res) => {
  try {
    // update add seats to movie
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
      $addToSet: { occupied: req.body.seats },
    });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Cannot find data" });
  }
});

//remove seat
router.post("/:id/remove/seat", async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { title: req.params.id },
      {
        $pullAll: { occupied: req.body.seats },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// upload photo
router.post("/upload", async (req, res) => {
  try {
    // upload image file to cloudinary
    const response = await cloudinary.uploader.upload(req.body.image);

    // send data as website link
    res.json({ url: response.url });
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
});

// create movie
router.post("/create", async (req, res) => {
  try {
    // create movie and save to database
    const movie = await Movie.create(req.body);
    // send data as json
    res.json(movie);
  } catch (error) {
    return res.status(500).json({ message: `${error.message}` });
  }
});

// edit movie
router.put("/:id/update", async (req, res) => {
  try {
    // update movie with new data
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // check if update is successful
    if (!movie) return res.json({ message: "Cannot update movie" });

    // send data as json
    res.json(movie);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// delete movie
router.delete("/:id/delete", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) return res.json({ message: "Cannot delete movie" });

    res.json({ data: {} });
  } catch (error) {
    res.status(500).json({ message: "Cannot find movie" });
  }
});

export default router;
