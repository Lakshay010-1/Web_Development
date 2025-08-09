import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

const port = 9989;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

const API_LINK = "http://localhost:8898";

function toDatetimeLocalString(dateInput) {
    const date = new Date(dateInput);
    if (isNaN(date)) return "";
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
}

app.get("/", async (req, res) => {
    try {
        const { data: spaces } = await axios.get(`${API_LINK}/spaces`);
        const { data: currentSpace } = await axios.get(`${API_LINK}/curSpace`);
        const { data: tasks } = await axios.get(`${API_LINK}/tasks/space/${currentSpace}`);
        for (let task of tasks) {
            task.dueDate = toDatetimeLocalString(task.dueDate);
        }
        res.render("index.ejs", { tasks, spaces, currentSpace });
    } catch (e) {
        res.status(500).json({ "message": `Error fetching tasks` });
    }
});

app.get("/space", async (req, res) => {
    const { space } = req.query;
    try {
        await axios.post(`${API_LINK}/spaces`, { space });
        res.redirect("/");
    } catch (e) {
        res.status(500).json({ "message": `Error fetching space` });
    }
});

app.get("/toggleLayout", async (req, res) => {
    try {
        const { data: isGrid } = await axios.get(`${API_LINK}/toggleGrid`);
        res.json(isGrid);
    } catch (e) {
        res.json({ "message": "Error toggling layout" });
    }
});
app.get("/curGridLayout", async (req, res) => {
    try {
        const { data: isGrid } = await axios.get(`${API_LINK}/curGridLayout`);
        res.json(isGrid);
    } catch (e) {
        res.json({ "message": "Error fetching layout" });
    }
});
app.get("/toggleTheme", async (req, res) => {
    try {
        const { data: isLightMode } = await axios.get(`${API_LINK}/toggleLightMode`);
        res.json(isLightMode);
    } catch (e) {
        res.json({ "message": "Error toggling theme" });
    }
});
app.get("/curLightTheme", async (req, res) => {
    try {
        const { data: isLightMode } = await axios.get(`${API_LINK}/curThemeMode`);
        res.json(isLightMode);
    } catch (e) {
        res.json({ "message": "Error fetching theme" });
    }
});

app.post("/space", async (req, res) => {
    const { space } = req.body;
    try {
        await axios.post(`${API_LINK}/spaces`, { space });
        res.redirect("/");
    } catch (e) {
        res.status(500).json({ "message": `Error creating space` });
    }
});

app.post("/tasks", async (req, res) => {
    const { title, dueDate, priority } = req.body;
    try {
        await axios.post(`${API_LINK}/tasks`, { title, dueDate, priority });
        res.redirect("/");
    } catch (e) {
        res.status(500).json({ "message": `Error creating tasks` });
    }
});
app.get("/tasks/patch", async (req, res) => {
    const { id } = req.query;
    try {
        let { data: task } = await axios.get(`${API_LINK}/tasks/id/${id}`);
        task.dueDate = toDatetimeLocalString(task.dueDate);
        res.render("editTask.ejs", { task });
    } catch (e) {
        res.status(500).json({ "message": `Error fetching task` });
    }
});

app.post("/tasks/patch", async (req, res) => {
    const { id, text, duedate, priority } = req.body;
    try {
        await axios.patch(`${API_LINK}/tasks/id/${id}`, { title: text, dueDate: duedate, priority });
        res.redirect("/");
    } catch (e) {
        res.status(500).json({ "message": `Error patching task` });
    }
});

app.get("/tasks/delete", async (req, res) => {
    const { id } = req.query;
    try {
        const { data: message } = await axios.delete(`${API_LINK}/tasks/id/${id}`);
        res.redirect("/");
    } catch (e) {
        res.status(500).json({ "message": `Error deleting tasks` });
    }
});


app.listen(port, () => {
    console.log(`Hosted at http://localhost:${port}`);
});