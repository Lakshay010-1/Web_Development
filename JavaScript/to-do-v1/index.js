document.addEventListener("DOMContentLoaded", () => {

    const addBtn = document.querySelector("#add-task-btn");
    const addTaskText = document.querySelector("#add-task-text");
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let guide = ["<p>The new task will appear under the To-Start column, ready to be started.<br>When you’re ready to begin work, double-click the task card in the To-Start column.The task will move to the Ongoing column, indicating it’s now in progress.</p >", "<p>Find the task you’ve finished working on.<br/>Double-click the task card, this action will automatically move the task to the Complete column.</p>", "<p>Find the task that’s ready to be removed.<br/>Double-click the task card, this will remove the task from the Completed column.</p>"];
    tasks.forEach(task => displayTasks(task));
    renderProgressBar();

    let tooltips = document.querySelectorAll(".tool-tip-text");
    for (let i = 0; i < tooltips.length; i++) {
        tooltips[i].innerHTML = guide[i];
    }


    addBtn.addEventListener("click",
        function () {
            addBtn.classList.toggle("btn-unpressed");
            addBtn.classList.toggle("btn-pressed");
            setTimeout(() => {
                addBtn.classList.toggle("btn-unpressed");
                addBtn.classList.toggle("btn-pressed");
            }, 100);
            addTask();
        }
    );
    document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            console.log("Enter pressed");
            addTask();
        }
    });

    function displayTasks(task) {
        let taskContainer = document.createElement("div");
        taskContainer.classList.add("task");

        let taskContent = document.createElement("p");
        taskContent.textContent = task.value;

        let taskTitle = document.createElement("div");
        taskTitle.classList.add("task-title");
        let taskDate = document.createElement("h3");
        taskDate.classList.add("task-date");
        taskDate.textContent = new Intl.DateTimeFormat("en-US").format(new Date());

        let taskBtn = document.createElement("button");
        taskBtn.classList.add("task-btn");
        taskBtn.textContent = ((task.toStart === true) ? "Start" : ((task.ongoing === true) ? "Ongoing" : "Remove"));

        taskTitle.appendChild(taskDate);
        taskTitle.appendChild(taskBtn);

        taskContainer.appendChild(taskContent);
        taskContainer.appendChild(taskTitle);

        document.querySelector(((task.toStart === true) ? ".start-con" : ((task.ongoing === true) ? ".ongoing-con" : ".completed-con"))).appendChild(taskContainer);

        taskBtn.addEventListener("click", () => {
            updateTask(task);
        });

        taskContainer.addEventListener("dblclick", () => {
            updateTask(task);
        });
    }

    function updateTask(task) {
        console.log("Clicked");
        if (task.completed === true) {
            task.completed = false;
            let id = task.id;
            console.log(id);
            tasks = tasks.filter((curTask) => curTask.id !== id);
        } else if (task.ongoing === true) {
            task.completed = true;
            task.ongoing = false;
            console.log("ongoing " + task.completed);
        } else if (task.toStart === true) {
            task.ongoing = true;
            task.toStart = false;
            console.log("toStart -" + task.ongoing);
        }
        document.querySelectorAll(".tasks-container").forEach((container) => {
            container.innerHTML = "";
        });
        tasks.forEach((taskD) => displayTasks(taskD));
        renderProgressBar();
        saveData();
    }

    function addTask() {
        if (addTaskText.value.trim() === "") {
            return;
        }
        let task = {
            id: Date.now(),
            value: addTaskText.value.trim(),
            completed: false,
            ongoing: false,
            toStart: true
        }
        addTaskText.value = "";
        tasks.unshift(task);
        saveData();
        document.querySelectorAll(".tasks-container").forEach((container) => {
            container.innerHTML = "";
        });
        tasks.forEach((task) => displayTasks(task));
        renderProgressBar();
    }

    function saveData() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    function renderProgressBar() {
        let totalTasks = tasks.length;
        let toStartTasks = 0, ongoingTasks = 0, completedTasks = 0;
        if (totalTasks > 0) {
            for (let i = 0; i < totalTasks; i++) {
                if (tasks[i].toStart === true) {
                    toStartTasks++;
                } else if (tasks[i].ongoing === true) {
                    ongoingTasks++;
                } else if (tasks[i].completed === true) {
                    completedTasks++;
                }
            }
        }
        console.log("start " + toStartTasks);
        console.log("ongoing " + ongoingTasks);
        console.log("completed " + completedTasks);
        totalTasks = (totalTasks <= 0) ? 1 : totalTasks;
        let startProgressBar = document.querySelector("#start-progress");
        let ongoingProgressBar = document.querySelector("#ongoing-progress");
        let completedProgressBar = document.querySelector("#completed-progress");
        startProgressBar.style.width = (100 * (toStartTasks / totalTasks)) + "%";
        ongoingProgressBar.style.width = (100 * (ongoingTasks / totalTasks)) + "%";
        completedProgressBar.style.width = (100 * (completedTasks / totalTasks)) + "%";
    }
});