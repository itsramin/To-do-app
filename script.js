"use strict";

const tabs = document.querySelector(".tabs");
const btnNew = document.querySelector(".btn--new");
const btnSort = document.querySelector(".btn--sort");
const tasksLists = document.querySelector(".tasks--lists");
const formNew = document.querySelector(".new--task--form");
const listGroup = document.querySelector(".list-group");
const buttons = document.querySelector(".buttons");
const btnSubmitForm = document.querySelector(".form--sub");
const tasksListUndone = document.querySelector(".tasks--list--undone");
const tasksListDone = document.querySelector(".tasks--list--done");
const closeNewForm = document.querySelector(".close--new--form");

class App {
  #allTasks = [];
  #sorted = false;
  constructor() {
    this._getLocalStorage();

    btnNew.addEventListener("click", this._hideNShowForm);
    tabs.addEventListener("click", this._changeTab);
    btnSubmitForm.addEventListener("click", this._newTask.bind(this));
    closeNewForm.addEventListener("click", this._hideNShowForm);
    tasksLists.addEventListener("click", this._checkTask.bind(this));
    btnSort.addEventListener("click", this._sortList.bind(this));
  }

  _checkTask(e) {
    // const target = e.target.closest("task--box");
    // const task = this.#allTasks.find((task) => task.id === target.dataset.id);
    // console.log(task);

    if (e.target.classList.contains("task--checkbox")) {
      const taskEl = e.target.closest(".task--box");
      const task = this.#allTasks.find((task) => task.id === taskEl.dataset.id);
      task.status = !task.status;
      console.log(task);
      console.log(this.#allTasks);
      // this.#allTasks.push(task);
      this._setLocalStorage();
      this._renderAllTasks();
    }
  }
  _setLocalStorage() {
    localStorage.setItem("allTasks", JSON.stringify(this.#allTasks));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("allTasks"));

    if (!data) return;

    this.#allTasks = data;
    this._renderAllTasks();
  }
  _renderTask(task, status = false) {
    let html = `
      <div class="task--box" data-id="${task.id}">
        <input type="checkbox" ${
          status === false ? "" : "checked"
        } class="task--checkbox">
        <div class="task--title">${task.title}</div>
        <div class="task--date">${task.date}</div>
        
      </div>
    `;
    status === false
      ? tasksListUndone.insertAdjacentHTML("beforeend", html)
      : tasksListDone.insertAdjacentHTML("beforeend", html);
  }
  _hideNShowForm(e) {
    e.preventDefault();
    tasksLists.classList.toggle("hidden");
    tabs.classList.toggle("hidden");
    buttons.classList.toggle("hidden");
    formNew.classList.toggle("hidden");
  }
  _changeTab(e) {
    // active current tab
    document
      .querySelectorAll(".tab")
      .forEach((tab) => tab.classList.remove("tab--active"));
    e.target.classList.add("tab--active");

    // show active list
    document
      .querySelectorAll(".tasks--list")
      .forEach((list) => list.classList.toggle("hidden"));
  }
  _newTask(e) {
    e.preventDefault();
    const newTaskTitle = document.querySelector(".form--input--title").value;
    const newTaskDate = document.querySelector(".form--input--date").value;
    const newTaskList = document.querySelector(".form--input--list").value;
    const newTaskDescription = document.querySelector(
      ".form--input--description"
    ).value;

    let task = new Task(
      newTaskTitle,
      newTaskDate,
      newTaskList,
      newTaskDescription
    );
    this._renderTask(task);
    this.#allTasks.push(task);

    document.querySelector(".form--input--title").value =
      document.querySelector(".form--input--date").value =
      document.querySelector(".form--input--list").value =
      document.querySelector(".form--input--description").value =
        "";

    this._hideNShowForm(e);
    this._setLocalStorage();
  }
  _renderAllTasks(sorted = false) {
    // clean 2 tabs
    document
      .querySelectorAll(".tasks--list")
      .forEach((list) => (list.innerHTML = ""));

    // sort lists
    let allTasks = sorted
      ? this.#allTasks
          .slice()
          .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
      : this.#allTasks;

    // render all tasks
    allTasks.forEach((task) => this._renderTask(task, task.status));
  }
  _sortList() {
    this.#sorted = !this.#sorted;
    this._renderAllTasks(this.#sorted);
  }
}

const app = new App();

class Task {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(title, date, list, description = "") {
    this.title = title;
    this.date = +date;
    this.list = list;
    this.description = description;
    this.status = false;
  }
}
