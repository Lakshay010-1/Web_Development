import express from "express";
import morgan from "morgan";
import logger from "./utilities/logger.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT;
app.use(express.json());

const morganLoggerFormat = ":method :url :status :response-time ms";
app.use(morgan(morganLoggerFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTiem: message.split(' ')[3]
            };
            logger.info(JSON.stringify(logObject));
        }
    }
}));

app.get("/", (req, res) => {
    res.json({ "message": "Home endpoint called" });
});
app.get("/about", (req, res) => {
    res.json({ "message": "About endpoint called" });
});
app.get("/contact", (req, res) => {
    res.json({ "message": "Contact endpoint called" });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});