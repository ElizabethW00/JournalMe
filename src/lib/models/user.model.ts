import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  user_id: { type: String, required: true },
  journal_ids: [
    {
      type: Schema.ObjectId,
      ref: "Journal",
    },
  ],
});

const User = models.User ?? model("User", userSchema);
export default User;
