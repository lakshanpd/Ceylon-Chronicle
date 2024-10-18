// controllers/userController.js

const User = require("../models/userModel"); // assuming you have user model in models folder
const bcrypt = require("bcryptjs");

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

exports.validateUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
