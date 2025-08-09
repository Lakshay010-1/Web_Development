import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import "dotenv/config";

const db = new pg.Client({
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
    host: process.env.db_host,
    port: process.env.db_port
});
db.connect();

const port = 8889;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

let isGrid;
let isLightMode;
let currentSpace;
const tasks = [];
let spaces = [];

async function loadLayout() {
    try {
        const result = await db.query("SELECT isgrid FROM ui_state where id=1");
        isGrid = result.rows[0].isgrid;
    } catch (e) {
        res.status(404).json({ "message": "Error fetching layout" });
        console.error(e);
    }
}

async function loadTheme() {
    try {
        const result = await db.query("SELECT islighttheme FROM ui_state where id=1");
        isLightMode = result.rows[0].islighttheme;
    } catch (e) {
        res.status(404).json({ "message": "Error fetching theme" });
        console.error(e);
    }
}

async function loadCurSpace() {
    try {
        const result = await db.query("SELECT currentSpace FROM ui_state where id=1");
        currentSpace = result.rows[0].currentspace;
    } catch (e) {
        res.status(404).json({ "message": "Error fetching current space" });
        console.error(e);
    }
}

async function loadTasks() {
    for (let i = 0; i < tasks.length; i++) {
        tasks.pop();
    }
    try {
        const result = await db.query("SELECT tasks.id,title,dueDate,priority,spaces.space FROM spaces JOIN tasks ON spaces.id = tasks.space_id");
        result.rows.forEach((task) => { tasks.push(task); });
    } catch (e) {
        res.status(404).json({ "message": "Error fetching tasks" });
        console.error(e);
    }
}

async function loadSpaces() {
    spaces = [];
    try {
        const result = await db.query("SELECT space FROM spaces");
        result.rows.forEach((spaceOb) => spaces.push(spaceOb.space));
    } catch (e) {
        res.status(404).json({ "message": "Error fetching spaces" });
        console.error(e);
    }
}

loadCurSpace();
loadLayout();
loadTheme();
loadTasks();
loadSpaces();



app.get("/tasks", async (req, res) => {
    await loadTasks();
    res.json(tasks);
});
app.get("/curSpace", async (req, res) => {
    await loadCurSpace();
    res.json(currentSpace);
});
app.get("/spaces", async (req, res) => {
    await loadSpaces();
    res.json(spaces);
});
app.get("/toggleGrid", async (req, res) => {
    await loadLayout();
    try {
        const result = await db.query("UPDATE ui_state SET isgrid=$1 WHERE id=1", [!isGrid]);
        res.redirect("/curGridLayout");
    } catch (e) {
        res.status(500).json({ "message": "Error toggling layout" });
        console.error(e);
    }
});
app.get("/toggleLightMode", async (req, res) => {
    await loadTheme();
    try {
        const result = await db.query("UPDATE ui_state SET islighttheme=$1 WHERE id=1", [!isLightMode]);
        res.redirect("curThemeMode");
    } catch (e) {
        res.status(500).json({ "message": "Error toggling theme" });
        console.error(e);
    }
});
app.get("/curGridLayout", async (req, res) => {
    await loadLayout();
    res.json(isGrid);
});
app.get("/curThemeMode", async (req, res) => {
    await loadTheme();
    res.json(isLightMode);
});
app.get("/tasks/priority/:priority", async (req, res) => {
    const priority = req.params.priority;
    try {
        const result = await db.query("SELECT tasks.id,title,dueDate,priority,spaces.space FROM tasks JOIN spaces ON tasks.space_id = spaces.id WHERE tasks.priority = $1 AND spaces.space = $2;", [priority, currentSpace]);
        res.json(result.rows);
    } catch (e) {
        res.status(500).json({ "message": `Error fetching priority-${priority} tasks` });
        console.error(e);
    }
});
app.get("/tasks/id/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("SELECT tasks.id,title,dueDate,priority,spaces.space FROM tasks JOIN spaces ON tasks.space_id = spaces.id WHERE tasks.id = $1", [id]);
        const task = result.rows[0];
        res.json(task);
    } catch (e) {
        res.status(500).json({ "message": `Error fetching id task` });
        console.error(e);
    }
});
app.get("/tasks/space/:space", async (req, res) => {
    const space = req.params.space;
    try {
        const result = await db.query("SELECT tasks.id,title,dueDate,priority,spaces.space FROM spaces JOIN tasks ON spaces.id = tasks.space_id WHERE space=$1", [space]);
        res.json(result.rows);
    } catch (e) {
        res.status(500).json({ "message": `Error fetching space-${space} tasks` });
        console.error(e);
    }
});


app.post("/tasks", async (req, res) => {
    const { title, dueDate, priority } = req.body;
    const id = Date.now();
    const space = currentSpace;
    try {
        const dbSpaceId = await db.query("SELECT id FROM spaces WHERE space=$1", [space]);
        const spaceId = dbSpaceId.rows[0].id;
        try {
            const dbPostTask = await db.query("INSERT INTO tasks (id,title,duedate,priority,space_id) values ($1,$2,$3,$4,$5)", [id, title, dueDate, priority, spaceId]);
        } catch (e) {
            res.status(500).json({ "message": "Error Posting task" });
            console.error(e);
        }
        res.redirect(`/tasks/id/${id}`);
    } catch (e) {
        res.status(404).json({ "message": "Error fetching current space" });
        console.error(e);
    }
});
app.post("/spaces", async (req, res) => {
    const { space } = req.body;
    try {
        await db.query("UPDATE ui_state SET currentspace=$1 where id=1", [space]);
        try {
            const dbSpaceId = await db.query("SELECT id FROM spaces WHERE space=$1", [space]);
            if (dbSpaceId.rows.length == 0) {
                try {
                    await db.query("INSERT INTO spaces (space) values ($1)", [space]);
                } catch (e) {
                    res.status(500).json({ "message": "Error inserting new space" });
                    console.error(e);
                }
            }
            res.redirect("/curSpace");
        } catch (e) {
            res.status(500).json({ "message": "Error checking if new space exist in database" });
            console.error(e);
        }
    } catch (e) {
        res.status(500).json({ "message": "Error updating current space" });
        console.error(e);
    }
});

app.patch("/tasks/id/:id", async (req, res) => {
    const id = req.params.id;
    let { title, dueDate, priority } = req.body;
    try {
        const dbTask = await db.query("SELECT tasks.id,title,dueDate,priority,spaces.space FROM tasks JOIN spaces ON tasks.space_id = spaces.id WHERE tasks.id = $1", [id]);
        title = title || dbTask.rows[0].title;
        dueDate = dueDate || dbTask.rows[0].duedate;
        priority = priority || dbTask.rows[0].priority;
        try {
            const dbPatchTask = await db.query("UPDATE tasks SET title=$1, duedate=$2, priority=$3 WHERE id=$4", [title, dueDate, priority, id]);
        } catch (e) {
            console.error(e);
            res.status(500).json({ "message": "Error patching task" });
        }
        try {
            const dbNewTask = await db.query("Select tasks.id,title,dueDate,priority,spaces.space FROM tasks JOIN spaces ON tasks.space_id = spaces.id where tasks.id=$1", [id]);
            res.json(dbNewTask.rows[0]);
        } catch (e) {
            console.error(e);
            res.status(500).json({ "message": "Error fetching task" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ "message": "Error fetching task to patch" });
    }
});

app.delete("/tasks/id/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const dbDeleteTask = await db.query("DELETE FROM tasks WHERE id=$1", [id]);
    } catch (e) {
        res.status(500).json({ "message": "Error deleting task" });
        console.error(e);
    }
    return res.status(200).json({ "message": "Task successfully deleted" });
});


app.listen(port, () => {
    console.log(`Hosted at http://localhost:${port}`);
});