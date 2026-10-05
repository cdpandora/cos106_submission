// The Academic planner - add, complete and delete tasks

var taskForm = document.getElementById("taskForm");
var taskInput = document.getElementById("taskInput");
var taskCourse = document.getElementById("taskCourse");
var taskDate = document.getElementById("taskDate");
var taskList = document.getElementById("taskList");
var taskStats = document.getElementById("taskStats");

// an array that will hold all the tasks
var tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
  taskList.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    var li = document.createElement("li");
    if (task.done) {
      li.className = "done";
    }

    var dateText = task.date ? "Due: " + task.date : "No due date";

    li.innerHTML =
      '<div class="task-text">' + task.text +
      '<small>' + task.course + ' &bull; ' + dateText + '</small></div>' +
      '<div class="task-actions">' +
      '<button class="done-btn" onclick="toggleTask(' + i + ')">' + (task.done ? "Undo" : "Done") + '</button>' +
      '<button class="delete-btn" onclick="deleteTask(' + i + ')">Delete</button>' +
      '</div>';

    taskList.appendChild(li);
  }

  updateStats();
}

function updateStats() {
  if (tasks.length == 0) {
    taskStats.textContent = "No tasks yet.";
    return;
  }

  var completed = 0;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].done) completed++;
  }

  taskStats.textContent = completed + " of " + tasks.length + " tasks completed";
}

function addTask(e) {
  e.preventDefault();

  var text = taskInput.value.trim();

  if (text === "") {
    alert("Please type a task first");
    return;
  }

  tasks.push({
    text: text,
    course: taskCourse.value,
    date: taskDate.value,
    done: false
  });

  saveTasks();
  showTasks();

  // clear the inputs
  taskInput.value = "";
  taskDate.value = "";
  taskInput.focus();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  showTasks();
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    showTasks();
  }
}

taskForm.addEventListener("submit", addTask);

showTasks();
