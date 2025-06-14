// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- START CHANGES HERE ---

// Explicitly serve home.html when the root URL is accessed
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Serve static files from the 'public' directory for other requests
// This should come AFTER the specific route for '/' if you want home.html to be the default
app.use(express.static(path.join(__dirname, "public")));

// --- END CHANGES HERE ---


// Connect to MongoDB
mongoose.connect("mongodb+srv://Chirag_Patel:Itlzq62tUKqiNSUN@ecommorce-website.y5hae.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
// Defining a flexible schema to accept various survey data
const formSchema = new mongoose.Schema({}, { strict: false });
const Form = mongoose.model("Form", formSchema);

// Submit endpoint - Corrected to match the frontend (index.html)
app.post("/api/submit-survey", async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error); // Log the error for debugging
    res.status(500).json({ error: "Error saving form data.", details: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});