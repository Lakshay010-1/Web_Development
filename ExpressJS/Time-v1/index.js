import moment from "moment-timezone";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import express from "express";
import ct from "countries-and-timezones";

const appEx = express();
const port = 9000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

appEx.use(bodyParser.urlencoded({ extended: true }));
appEx.use(express.json());
appEx.use(express.static(path.join(__dirname, 'public')));

appEx.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

appEx.post("/from-to-date", (req, res) => {
    const fromDate = moment(req.body.fromDate);
    const toDate = moment(req.body.toDate);

    if (fromDate.isAfter(toDate)) {
        return res.status(404).send("Start date must be before end date");
    }
    const tempDate = fromDate.clone();

    const resYears = toDate.diff(tempDate, "years");
    tempDate.add(resYears, "years");

    const resMonths = toDate.diff(tempDate, "months");
    tempDate.add(resMonths, "months");

    const resDays = toDate.diff(tempDate, "days");

    res.json({ years: resYears, months: resMonths, days: resDays });
});

appEx.post("/country-timeZ", async (req, res) => {
    let country = req.body.country;
    let ctTimeZone = await ct.getCountry(country);
    res.json(ctTimeZone.timezones);
});

appEx.post("/get-tz-time", async (req, res) => {
    let time = moment.tz(req.body.timezone);
    res.json({
        time: time.format("HH:mm:ss"),
        hour: time.hour(),
        minute: time.minute(),
        second: time.second(),
        millisecond: time.millisecond(),
        fullDate: time.format("DD:MM:YYYY"),
        year: time.year(),
        month: time.month() + 1,
        day: time.date(),
        weekday: time.format("dddd")
    });
});

appEx.listen(port, () => {
    console.log(`Port hosted on http://localhost:${port}`);
});