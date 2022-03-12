"use strict";
const taskText = document.querySelector(".task--text");
const taskList = document.querySelector(".tasks--list");
const taskUndoneList = document.querySelector(".tasks--undone--list");
const taskUndone = document.querySelector(".tasks--undone");
const taskDoneList = document.querySelector(".tasks--done--list");
const taskDone = document.querySelector(".tasks--done");
let checkboxs = document.querySelectorAll(".checkbox");
const btnSubTask = document.querySelector(".sub--task");
let idNum = 0;
let taskId;
const UndoneTasks = [];
const allTasks = [];

// check cookie is available
function checkCookie() {
  let allTasks = getCookie("tasks");
  console.log(allTasks);
  if (allTasks != "") {
    showUndoneTasks();
    showDoneTasks();
  }
}
// get cookies number
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// set cookies
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const Newtask = function (title) {
  this.title = title;
  // this.date = date;
  this.id = idNum;
  this.done = false;
  idNum++;
};
const showUndoneTasks = function () {
  taskUndone.textContent = "";
  allTasks.forEach(function (task) {
    if (!task.done) {
      const taskRow = `
        <div data-id="${task.id}" class="taskRow flex flex-row items-center gap-2">
        <input type="checkbox" class="checkbox w-5 h-5 rounded-full">
        <span class="task-title">${task.title}</span>
        </div>`;
      taskUndone.insertAdjacentHTML("beforeend", taskRow);
    }
  });
  console.log(allTasks);
  setCookie("tasks", [allTasks], 30);
};
const showDoneTasks = function () {
  taskDone.textContent = "";
  allTasks.forEach(function (task) {
    if (task.done) {
      const taskRow = `
        <div data-id="${task.id}" class="taskRow flex flex-row items-center gap-2">
        <input type="checkbox" class="checkbox w-5 h-5 rounded-full">
        <span class="task-title">${task.title}</span>
        </div>`;
      taskDone.insertAdjacentHTML("beforeend", taskRow);
    }
  });
};
const checkTask = function (idNum, task) {
  allTasks[idNum].done = true;
  setCookie("tasks", allTasks, 30);
  taskDone.insertAdjacentElement("beforeend", task);
  task.style.color = "#777";
  task.style.textDecoration = "line-through";
};
btnSubTask.addEventListener("click", function (e) {
  e.preventDefault();
  if (taskText.value !== "") {
    taskId = `t-${idNum}`;
    window[taskId] = new Newtask(taskText.value);
    allTasks.push(window[taskId]);
    taskText.value = "";

    showUndoneTasks();
  }
});
taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("checkbox")) {
    const curTask = e.target.closest(".taskRow");
    // const curTaskText = e.target
    //   .closest(".taskRow")
    //   .querySelector(".task-title");
    const curTaskId = e.target.closest(".taskRow").dataset.id;
    if (!allTasks[curTaskId].done) {
      checkTask(curTaskId, curTask);
    } else {
      allTasks[curTaskId].done = false;
      setCookie("tasks", allTasks, 30);
      taskDone.querySelector(`[data-id='${curTaskId}']`).remove();
      showUndoneTasks();
    }
  }
});
window.addEventListener("load", function () {
  setTimeout(checkCookie, 5);
});
