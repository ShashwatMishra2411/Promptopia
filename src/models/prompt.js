import mongoose, { Schema, model, models } from "mongoose";
import { type } from "os";

const PromptSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
  response:{
    type: String,
    required: [true, "Response is required"],
  }
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
