import express from "express";
import bodyParser from "body-parser";
import turl from "turl";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 9000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/shrinkRoute", async (req, res) => {
    let { url } = req.body;
    let shrinkedLink;
    let linkValid = true;
    await turl.shorten(url).then((res) => { shrinkedLink = res; }).catch((err) => { linkValid = false; });
    res.render("index.ejs", { linkValid, shrinkedLink });
});

app.listen(port, (req, res) => {
    console.log(`Hosted on http://localhost:${port}`);
});