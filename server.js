import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/get-address", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).send("Latitude and Longitude are required.");
  }

  try {
    const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDwKz6onwGarjw-KS-QSBxNaeEYXHQrQqM`;
    const response = await axios.get(API_URL);
    if (response.data.status === "OK" && response.data.results.length > 0) {
      const address = response.data.results[0].formatted_address;
      res.json({ address });
    } else {
      res.status(404).json({ error: "No address found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching address" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// API Key: AIzaSyDwKz6onwGarjw-KS-QSBxNaeEYXHQrQqM
