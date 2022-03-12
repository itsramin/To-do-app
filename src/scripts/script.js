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
let idNum = 1;
let idCounter = 0;
let taskId;
const UndoneTasks = [];
let allTasks = [];
let idArr = [];

// check cookie is available
function checkCookie() {
  // if (getCookie(idCounter) != "") {
  //   do {
  //     const gettask = getCookie(idCounter).split(",");
  //     allTasks.push({
  //       id: idCounter,
  //       title: gettask[1],
  //       done: gettask[2][0] == "f" ? false : true,
  //     });
  //     idCounter++;
  //   } while (getCookie(idCounter));
  // }
  let t;
  let lastTask = getCookie("lastTask");
  console.log(lastTask);
  for (t = 0; t < 100; ++t) {
    if (getCookie(t) !== "") {
      const gettask = getCookie(t).split(",");
      allTasks.push({
        id: t,
        title: gettask[1],
        done: gettask[2][0] == "f" ? false : true,
      });
      console.log(allTasks);
    } else {
      console.log("ther is no task");
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

const Newtask = function (title) {
  this.title = title;
  this.id = idNum;
  this.done = false;
  allTasks.push(this);
  setCookie(idNum, [idNum, title, false], 30);
  idNum++;
};

const showAllTasks = function () {
  taskUndone.textContent = taskDone.textContent = "";

  allTasks.forEach(function (task) {
    const taskIsDone = task.done ? true : false;
    const taskRow = `
        <div data-id="${
          task.id
        }" class="taskRow flex flex-row items-center gap-2 mx-4">
        <input type="checkbox" ${
          taskIsDone ? `checked = "true"` : ""
        } class="checkbox w-5 h-5 rounded-full">
        <input value="${
          task.title
        }" class="task-title grow bg-transparent focus-visible:outline-1 outline-cyan-500 ${
      taskIsDone ? `text-gray-500 line-through` : ""
    }"></span>
    <span class="deltask cursor-pointer">🗑</span>
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
    window[taskId] = new Newtask(task_text);
    taskText.value = "";
    showAllTasks();
  }
});
taskList.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target.classList.contains("checkbox")) {
    const curTaskTitle = e.target
      .closest(".taskRow")
      .querySelector(".task-title");
    const curTaskId = e.target.closest(".taskRow").dataset.id;

    const curId = allTasks.findIndex((task) => task.id == curTaskId);
    // allTasks[curId].title = curTaskTitle.value;
    allTasks[curId].done = !allTasks[curId].done;
    setCookie(
      curTaskId,
      [curTaskId, curTaskTitle.value, allTasks[curId].done],
      30
    );
    showAllTasks();
  }
  if (e.target.classList.contains("deltask")) {
    const curTaskId = e.target.closest(".taskRow").dataset.id;
    setCookie(curTaskId, "", -10);
    const delId = allTasks.findIndex((task) => task.id == curTaskId);
    allTasks.splice(delId, 1);
    console.log(allTasks);
    setCookie("lastTask", idNum, 30);

    showAllTasks();
  }
});
window.addEventListener("load", function () {
  setTimeout(checkCookie, 5);
});
del.addEventListener("click", deleteCookie);
