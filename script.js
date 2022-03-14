"use strict";
const taskText = document.querySelector(".task--text");
const taskList = document.querySelector(".tasks--list");
const taskUndoneList = document.querySelector(".tasks--undone--list");
const taskUndone = document.querySelector(".tasks--undone");
const taskDoneList = document.querySelector(".tasks--done--list");
const taskDone = document.querySelector(".tasks--done");
let checkboxs = document.querySelectorAll(".checkbox");
const btnSubTask = document.querySelector(".sub--task");
const del = document.querySelector(".del");
const deltask = document.querySelector(".deltask");
const calendar = document.querySelector(".calendar");
const taskdate = document.querySelector(".taskdate");
let idNum = 1;
let idCounter = 0;
let taskId;
const UndoneTasks = [];
let allTasks = [];
let idArr = [];

// check cookie is available
function checkCookie() {
  let t;
  let lastTask = getCookie("lastTask");
  for (t = 0; t < lastTask; ++t) {
    if (getCookie(t) !== "") {
      const gettask = getCookie(t).split(",");
      allTasks.push({
        id: t,
        title: gettask[1],
        date: gettask[2],
        done: gettask[3][0] == "f" ? false : true,
      });
    } else {
      continue;
    }
  }
  if (t == 0) {
    idNum = 1;
  } else {
    idNum = allTasks.length;
  }
  showAllTasks();
}
// get cookies numbرer
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

const Newtask = function (title, date = 0) {
  this.title = title;
  this.id = idNum;
  this.date = date;
  this.done = false;
  allTasks.push(this);
  setCookie(idNum, [idNum, title, date, false], 30);
  idNum++;
  setCookie("lastTask", idNum, 30);
};

const showAllTasks = function () {
  taskUndone.textContent = taskDone.textContent = "";

  allTasks.forEach(function (task) {
    const taskIsDone = task.done ? true : false;
    const taskRow = `
        <div data-id="${
          task.id
        }" class="taskRow flex flex-row items-center gap-2 mx-4 mt-1">
        <input type="checkbox" ${
          taskIsDone ? `checked = "true"` : ""
        } class="checkbox w-5 h-5 rounded-full">
        <input value="${
          task.title
        }" class="task-title grow pl-1 bg-transparent focus-visible:outline-1 outline-cyan-500 ${
      taskIsDone ? `text-gray-500 line-through` : ""
    }"></span><span class="taskrowdate text-sm text-gray-500" >${
      task.date
    }</span>
    <span class="deltask cursor-pointer opacity-30">🗑</span>
        </div>`;
    const chooseList = task.done ? taskDone : taskUndone;
    chooseList.insertAdjacentHTML("beforeend", taskRow);
  });
};
const checkTask = function (idNum, task) {
  allTasks[idNum].done = true;
  // setCookie("tasks", allTasks, 30);
  taskDone.insertAdjacentElement("beforeend", task);
  task.style.color = "#777";
  task.style.textDecoration = "line-through";
};
const deleteCookie = function () {
  for (let i = 0; i < 100; i++) {
    setCookie(i, "", -10);
  }
  setCookie("lastTask", "", -10);
  idNum = idCounter = 0;
  allTasks = [];
  showAllTasks();
};

// event handlers
btnSubTask.addEventListener("click", function (e) {
  e.preventDefault();
  if (taskText.value !== "") {
    taskId = `t-${idNum}`;
    const task_text = taskText.value;
    const task_date = taskdate.value;
    window[taskId] = new Newtask(task_text, task_date);
    taskText.value = "";
    showAllTasks();
  }
});
taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("checkbox")) {
    const curTaskTitle = e.target
      .closest(".taskRow")
      .querySelector(".task-title");
    const curTaskId = e.target.closest(".taskRow").dataset.id;

    const curId = allTasks.findIndex((task) => task.id == curTaskId);
    allTasks[curId].done = !allTasks[curId].done;
    setCookie(
      curTaskId,
      [
        curTaskId,
        curTaskTitle.value,
        allTasks[curId].date,
        allTasks[curId].done,
      ],
      30
    );
    showAllTasks();
  }
  if (e.target.classList.contains("deltask")) {
    const curTaskId = e.target.closest(".taskRow").dataset.id;
    setCookie(curTaskId, "", -10);
    const delId = allTasks.findIndex((task) => task.id == curTaskId);
    allTasks.splice(delId, 1);

    showAllTasks();
  }
  if (e.target.classList.contains("task-title")) {
    e.target.addEventListener("input", function () {
      const curTaskTitle = e.target
        .closest(".taskRow")
        .querySelector(".task-title");

      const curTaskId = e.target.closest(".taskRow").dataset.id;
      const arrId = allTasks.findIndex((task) => task.id == curTaskId);
      allTasks[arrId].title = curTaskTitle.value;
      setCookie(
        curTaskId,
        [
          curTaskId,
          curTaskTitle.value,
          allTasks[arrId].date,
          allTasks[arrId].done,
        ],
        30
      );
    });
  }
});
window.addEventListener("load", function () {
  setTimeout(checkCookie, 5);
});
del.addEventListener("click", deleteCookie);

// calendar.addEventListener("click", function (e) {
//   taskdate.classList.toggle("hidden");
// });
