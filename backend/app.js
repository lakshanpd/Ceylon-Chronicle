const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes"); // Import user routes
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const dbURI =
  "mongodb+srv://lakshanpdcse21:ceylonchronicle123@ceylonchroniclecluster.gschn.mongodb.net/ceylon_chronicle?retryWrites=true&w=majority&appName=CeylonChronicleCluster"; // Replace with your MongoDB connection string

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Use user routes
app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
