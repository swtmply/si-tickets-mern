import { Router } from "express";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import User from "../models/users-model";
const router = Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    // find({}) function on User model to get all data
    const users = await User.find({});

    // send data as json
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Cannot find data" });
  }
});

// Get user data
router.get("/:id", async (req, res) => {
  try {
    // findById(:id) function on User model to return user data
    const user = await User.findById(req.params.id);

    // send data as json
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// get tickets data
router.get("/:id/tickets", async (req, res) => {
  try {
    const tickets = await User.findById(req.params.id)
      .select("tickets")
      .populate("tickets")
      .exec();

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

// register user
router.post("/create", async (req, res) => {
  try {
    let errors = {};

    // check for duplicate username, email, and contact
    if (await User.findOne({ username: req.body.username }))
      errors.username = "Username is already taken";
    if (await User.findOne({ email: req.body.email }))
      errors.email = "Email is already taken";
    if (await User.findOne({ contact: req.body.contact }))
      errors.contact = "Contact is already taken";

    if (Object.entries(errors).length !== 0) {
      return res.status(400).json(errors);
    }
    // hash password
    req.body.password = await hash(req.body.password, 10);

    // create user and save to database
    const user = await User.create(req.body);
    // send data as json
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if user is registered
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    // compare password to hashed password
    if (!(await compare(password, user.password)))
      return res.status(400).json({ message: "Invalid Credentials" });
    // sign a jsonwebtoken to user ID
    const token = sign({ id: user._id }, process.env.TOKEN_SECRET);
    // send token as json
    res.json(token);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// update user
router.put("/:id/update", async (req, res) => {
  try {
    // check if password has changed
    if (req.body.password1 !== undefined) {
      req.body.password = await hash(req.body.password, 10);
    }
    // update user with new data
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // check if edit is successful
    if (!user) return res.status(400).json({ message: "Cannot update user" });
    // send data as json
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// delete user
router.delete("/:id/delete", async (req, res) => {
  try {
    // check and delete if user exists
    const user = await User.findByIdAndDelete(req.params.id);
    // check if deletion is successful
    if (!user) return res.status(400).json({ message: "Cannot delete user" });
    // send data as json
    res.json({});
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
