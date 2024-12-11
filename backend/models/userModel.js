const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    birthday: {
      type: Date,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    travelWith: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    facebook: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    googleId: {
      type: String, // Store Google ID for reference
      unique: true,
    },
    googleProfilePicture: {
      type: String, // Store Google profile picture URL
    },
  },
  {
    timestamps: true,
  }
);

// Create the model from the schema
const User = mongoose.model("User", userSchema);

// Export the model to use it in other parts of the app
module.exports = User;
