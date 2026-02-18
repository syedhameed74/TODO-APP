const input = document.getElementById("taskInput");
const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");
const addSound = document.getElementById("addSound");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function render() {
    list.innerHTML = "";
    tasks.forEach((task, i) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.done) li.classList.add("completed");

        li.onclick = () => {
            tasks[i].done = !tasks[i].done;
            save();
        };

        const del = document.createElement("span");
        del.textContent = "X";
        del.onclick = (e) => {
            e.stopPropagation();
            tasks.splice(i, 1);
            save();
        };

        li.appendChild(del);
        list.appendChild(li);
    });
}

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

addBtn.onclick = () => {
    if (input.value.trim() === "") return;
    tasks.push({ text: input.value, done: false });
    input.value = "";
    addSound.play();
    save();
};

render();