import express from "express";
import bodyParser from "body-parser";
import mongoose, { Schema, Types } from "mongoose";
import "dotenv/config";

const port = 8898;
const app = express();
let isGrid;
let isLightMode;
let tasks = [];
let spaces = [];
let currentSpace;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(`${process.env.uri}/${process.env.db}`);

// Tasks
const taskCollection = "Task";
const taskSchme = new mongoose.Schema({
    title: { type: String, required: [true, "Task title unavailable"] },
    dueDate: { type: Date, required: [true, "Task due date unavailable"] },
    priority: { type: String, required: [true, "Task priority unavailable"] },
    spaceId: { type: Schema.Types.ObjectId, ref: "Space", required: [true, "refered space id unavailable"] },
});
const Task = mongoose.model(taskCollection, taskSchme);

// Spaces
const spaceCollection = "Space";
const spaceSchema = new mongoose.Schema({
    space: { type: String, required: [true, "space name unavailable"], unique: true }
});
const Space = mongoose.model(spaceCollection, spaceSchema);

// UI_State
const uiState_Collection = "UI_State";
const uiState_Schema = new mongoose.Schema({
    _id: { type: Number, required: [true, "UI State id unavailable"] },
    isGridLayout: { type: Boolean, required: [true, "UI State layout unavailable"] },
    isLightTheme: { type: Boolean, required: [true, "UI State theme unavailable"] },
    currentSpace: { type: Schema.Types.ObjectId, ref: "Space", required: [true, "UI State current space unavailable"] }
});
const UI_State = mongoose.model(uiState_Collection, uiState_Schema);

// Documents
// Spaces
const primarySpace = new Space({
    space: "Primary"
});
// UI_State
const defaultUIState = new UI_State({
    _id: 1,
    isGridLayout: true,
    isLightTheme: true,
    currentSpace: primarySpace._id
});


async function insertOne(doc, collection) {
    let result;
    if (collection == "ui_state" || collection == "space") {
        if (collection == "ui_state") {
            try {
                result = await UI_State.findOne({ _id: 1 });
            } catch (e) {
                throw new Error(`Error fetching ui_state,${e}`);
            }
        } else {
            try {
                result = await Space.findOne({ space: doc.space });
            } catch (e) {
                throw new Error(`Error fetching space,${e}`);
            }
        }
        if (result !== null) {
            return result;
        }
    }
    try {
        result = await doc.save();
        return result;
    } catch (e) {
        console.error("Error inserting document", e);
    }
}
async function loadLayout() {
    try {
        const result = await UI_State.findOne({ _id: 1 });
        return result.isGridLayout;
    } catch (e) {
        throw e;
    }
};
async function loadTheme() {
    try {
        const result = await UI_State.findOne({ _id: 1 });
        return result.isLightTheme;
    } catch (e) {
        throw e;
    }
};
async function loadCurSpace() {
    try {
        const result = await UI_State.findOne({ _id: 1 });
        const curSpace = await Space.findOne({ _id: result.currentSpace });
        return curSpace.space;
    } catch (e) {
        throw e;
    }
};
async function loadTasks(condition) {
    try {
        const result = await Task.find(condition, { __v: 0 });
        return result;
    } catch (e) {
        throw e;
    }
};
async function loadSpaces() {
    try {
        const result = await Space.find({}, { __v: 0, _id: 0 });
        spaces = result.map((s) => s.space);
        return spaces;
    } catch (e) {
        throw e;
    }
};
async function loadSpaceId(condition) {
    try {
        const result = await Space.findOne(condition);
        return result._id;
    } catch (e) {
        throw e;
    }
}
async function toggleLayout() {
    try {
        isGrid = await loadLayout();
        const result = await UI_State.updateOne({ _id: 1 }, { $set: { isGridLayout: !isGrid } });
        return await loadLayout();
    } catch (e) {
        throw e;
    }
}
async function toggleTheme() {
    try {
        isLightMode = await loadTheme();
        const result = await UI_State.updateOne({ _id: 1 }, { $set: { isLightTheme: !isLightMode } });
        return await loadTheme();
    } catch (e) {
        throw e;
    }
}

await insertOne(primarySpace, "space");
await insertOne(defaultUIState, "ui_state");

app.get("/tasks", async (req, res) => {
    tasks = await loadTasks({});
    res.json(tasks);
});
app.get("/curSpace", async (req, res) => {
    currentSpace = await loadCurSpace();
    res.json(currentSpace);
});
app.get("/spaces", async (req, res) => {
    spaces = await loadSpaces();
    res.json(spaces);
});
app.get("/curGridLayout", async (req, res) => {
    isGrid = await loadLayout();
    res.json(isGrid);
});
app.get("/curThemeMode", async (req, res) => {
    isLightMode = await loadTheme();
    res.json(isLightMode);
});
app.get("/toggleGrid", async (req, res) => {
    isGrid = await toggleLayout();
    res.json(isGrid);
});
app.get("/toggleLightMode", async (req, res) => {
    isLightMode = await toggleTheme();
    res.json(isLightMode);
});
app.get("/tasks/priority/:priority", async (req, res) => {
    const priority = req.params.priority;
    const priorityTask = await loadTasks({ priority: priority });
    res.json(priorityTask);
});

app.get("/tasks/id/:id", async (req, res) => {
    const id = req.params.id;
    const idTask = await loadTasks({ _id: id });
    if (idTask.length == 0) {
        return res.status(404).json({ "message": "task not found" });
    }
    res.json(idTask[0]);
});
app.get("/tasks/space/:space", async (req, res) => {
    const space = req.params.space;
    const spaceId = await loadSpaceId({ space: space });
    const spaceTasks = await loadTasks({ spaceId: spaceId });
    res.json(spaceTasks);
});

app.post("/tasks", async (req, res) => {
    const curSpace = await loadCurSpace();
    const spaceId = await loadSpaceId({ space: curSpace });
    const { title, dueDate, priority } = req.body;
    const t = new Task({
        title: title,
        dueDate: dueDate,
        priority: priority,
        spaceId: spaceId
    });
    const result = await insertOne(t, "task");
    res.redirect(`/tasks/id/${result._id}`);
});
app.post("/spaces", async (req, res) => {
    const { space } = req.body;

    const s = new Space({
        space: space
    });
    const result = await insertOne(s, "space");
    try {
        const updateCurSpace = await UI_State.updateOne({ _id: 1 }, { currentSpace: result._id });
        return res.status(201).json({ "message": "space created" });
    } catch (e) {
        throw e;
    }
});

app.patch("/tasks/id/:id", async (req, res) => {
    const id = req.params.id;
    const task = await loadTasks({ _id: id });
    const title = req.body.title || task[0].title;
    const dueDate = req.body.dueDate || task[0].dueDate;
    const priority = req.body.priority || task[0].priority;
    try {
        const result = await Task.updateOne({ _id: id }, { $set: { title: title, dueDate: dueDate, priority: priority } });
    } catch (e) {
        throw e;
    }
    const patchedTask = await loadTasks({ _id: id });
    res.status(200).json(patchedTask[0]);
});

app.delete("/tasks/id/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Task.deleteOne({ _id: id });
    } catch (e) {
        throw e;
    }
    res.status(200).json({ "message": "task deleted successfully" })
});


app.listen(port, () => {
    console.log(`Hosted at http://localhost:${port}`);
});