const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "src/views");

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY; // Replace with your actual API key from OpenWeatherMap
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const weather = response.data;
    res.render("index", { weather, error: null });
  } catch (error) {
    res.render("index", { weather: null, error: "Error, please try again" });
  }
});

// Catch-all route for handling undefined paths
app.get("*", (req, res) => {
  res.status(404).render("404");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
