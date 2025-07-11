const fs = require("fs");

const filePath = "./list.json";

function loadTasks() {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);                    // Converts json to js object
    } catch (e) {
        return [];
    }
}

function addTask(task) {
    let tasks = loadTasks();
    let taskJSON = JSON.parse(JSON.stringify({ [Date.now()]: task }));
    tasks.push(taskJSON);
    fs.writeFileSync(filePath, JSON.stringify(tasks));
}

function rmTask(task) {
    let tasks = loadTasks();
    tasks.forEach((curTask, index) => {
        for (let key in curTask) {
            if (curTask[key] === task) {
                tasks.splice(index, 1);
            }
        }
    });
    fs.writeFileSync(filePath, JSON.stringify(tasks));
}

function listTasks() {
    let tasks = loadTasks();
    tasks.forEach(task => {
        for (let key in task) {
            console.log(`${key} - ${task[key]}`);
        }
    });
}

const operation = process.argv[2];
const task = process.argv[3];

if (operation === "add") {
    addTask(task);
    console.log("Task added successfully");
} else if (operation === "remove") {
    rmTask(task);
    console.log("Task removed successfully");
} else if (operation === "list") {
    console.log("Tasks :");
    listTasks();
} else {
    console.log("Operation not serviceable")
}

/*

It uses:
- process.argv to get user input from the terminal.

- The fs module to append the input to a file (list.txt).

*/