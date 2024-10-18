const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Import the user controller

// POST route to create a new user
router.post("/register", userController.createUser);
router.post("/login", userController.validateUser);

module.exports = router;
