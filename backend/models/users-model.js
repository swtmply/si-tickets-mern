import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    username: String,
    contact: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: "user",
    },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket", default: [] }],
  },
  { timestamps: true }
);

export default model("User", userSchema);
