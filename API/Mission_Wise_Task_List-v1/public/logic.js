let isGrid = true;
let isLightMode = true;

function setLayout(isGrid) {
    const grid = document.querySelector(".grid");
    grid.style.display = isGrid ? "grid" : "flex";
    grid.style.flexDirection = isGrid ? null : "column";
    document.querySelector("#grid-layout").setAttribute("src", "/images/" + ((isGrid) ? "grid-2" : "grid-4") + ".svg");
}
function toggleLayout() {
    isGrid = !isGrid;
    setLayout(isGrid);
}

function setTheme(isLightMode) {
    const theme = document.querySelector("#theme-mode");
    if (!isLightMode) {
        theme.setAttribute("src", "/images/light-mode.svg");
        theme.setAttribute("value", "dark");
        document.querySelector(".profile-pic").setAttribute("src", "/images/task-logo-dark.svg")
    } else {
        theme.setAttribute("src", "/images/night-mode.svg");
        theme.setAttribute("value", "light");
        document.querySelector(".profile-pic").setAttribute("src", "/images/task-logo.svg")
    }
}
function toggleTheme() {
    isLightMode = !isLightMode;
    document.body.classList.toggle("dark");
    setTheme(isLightMode);
}

const spaces = document.querySelectorAll(".spaces");
for (let i = 0; i < spaces.length; i++) {
    spaces[i].addEventListener("click", async () => {
        const space = spaces[i].dataset.space;
        window.location.href = `/space?space=${space}`;
    });
}

const edit = document.querySelectorAll(".edit");
for (let i = 0; i < edit.length; i++) {
    edit[i].addEventListener("click", async () => {
        const id = edit[i].getAttribute("id");
        window.location.href = `/tasks/patch?id=${id}`;
    });
}

const deleteT = document.querySelectorAll(".delete");
for (let i = 0; i < deleteT.length; i++) {
    deleteT[i].addEventListener("click", async () => {
        const id = deleteT[i].getAttribute("id");
        window.location.href = `/tasks/delete?id=${id}`;
    });
}

document.getElementById("addTask").addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskText = document.getElementById("taskText").value;
    const dueDate = document.getElementById("dueDate").value;
    const quadrant = document.getElementById("taskQuadrant").value;

    const res = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: taskText,
            dueDate: dueDate,
            priority: quadrant
        })
    });

    if (res.ok) {
        location.reload();
    } else {
        alert("Failed to add task");
    }
});