import { Router } from "express";

import Ticket from "../models/tickets-model";
import User from "../models/users-model";
const router = Router();

// get all tickets
router.get("/", async (req, res) => {
  try {
    // find({}) to find all tickets
    const tickets = await Ticket.find({});
    // send data as json
    res.json(tickets);
  } catch (error) {
    return res.status(500).json({ message: "Cannot find data" });
  }
});
// get one ticket
router.get("/:id", async (req, res) => {
  try {
    // findById(:id) function to find one ticket
    const ticket = await Ticket.findById(req.params.id);
    // send data as json
    res.json(ticket);
  } catch (error) {
    return res.status(500).json({ message: "Cannot find data" });
  }
});
// add tickets
router.post("/create/:userId", async (req, res) => {
  try {
    // TODO: documentation
    const user = await User.findById(req.params.userId);
    const ticket = await Ticket.create(req.body);

    await user.update({
      $push: { tickets: ticket._id },
    });

    res.json(ticket);
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
});
// TODO: documentation
router.post("/:userId/:ticketId", async (req, res) => {
  try {
    // TODO:
    const user = await User.findById(req.params.userId);

    await user.update({
      $pull: { tickets: req.params.ticketId },
    });

    res.json({ data: {} });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
});

export default router;
