import { match } from "assert";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"],
  },
  image:{
    type: String,    
  }
});

// models.User will be used if it is already defined, since this is a serverless function it will get called multiple times and create multiple schema, so to prevent that we are checking if the model is already defined or not through models.User and if its not defined then we are creating a new model through model("User", userSchema)

const User = models.User || model("User", userSchema);

export default User;