import "dotenv/config";
import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const appExpress = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

appExpress.use(express.static(path.join(__dirname, "public")));

appExpress.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

appExpress.get("/weather", async (req, res) => {
    const city = req.query.city;
    let API_KEY = process.env.API_KEY;
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                units: "metric",
                appid: API_KEY
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ Error: "Failed to fetch weather data" });
    }
});

appExpress.listen(port, (req, res) => {
    console.log(`Server started at http://localhost:${port}`);
});