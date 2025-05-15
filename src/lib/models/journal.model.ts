import { Schema, model, models } from "mongoose";

const journalSchema = new Schema({
  date_created: { type: Date, required: true },
  text: { type: String, required: true },
  user_id: { type: String, required: true },
  locked: { type: Boolean, required: true },
  last_edited: { type: Date, required: true },
  color: { type: String, required: true },
});

const Journal = models.Journal ?? model("Journal", journalSchema);
export default Journal;
