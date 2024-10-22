// controllers/userController.js

const User = require("../models/userModel"); // assuming you have user model in models folder
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      birthday,
      email,
      travelWith,
      username,
      password,
    } = req.body;

    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password

    const userData = {
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      email: email,
      travelWith: travelWith,
      username: username,
      password: hashedPassword,
    };

    const newUser = new User(userData); // Create a new user from request body
    await newUser.save(); // Save the new user to the database
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Secret key for signing the JWT (store it in environment variables in production)
const SECRET_KEY = "your_secret_key";
exports.validateUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // If the password is correct, generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username }, // Payload
      SECRET_KEY, // Secret key
      { expiresIn: "10m" } // Token expiration (10 minutes)
    );

    // Prepare user data to send in response
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      email: user.email,
      travelWith: user.travelWith,
      username: user.username,
    };

    // Return the token and user data to the client
    res.status(200).json({
      message: "Login successfully",
      token, // Include the token in the response
      data: userData, // Include user details in the response
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyInfo = async (req, res) => {
  try {
    const { id } = req.user; // `req.user` is set in the middleware after token verification

    // Find user in the database by ID
    const user = await User.findById(id).select("username email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user's information
    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
