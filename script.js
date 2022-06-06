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
const catgroup = document.querySelector(".cat-group");
const btnNewCat = document.querySelector(".btn--new--cat");
const formNewCat = document.querySelector(".form--new--cat");
const formInputCat = document.querySelector(".form--input--cat");

class Task {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(title, date, cat, description = "") {
    this.title = title;
    this.date = date;
    this.cat = cat;
    this.description = description;
    this.status = false;
  }
}

class App {
  #allTasks = [];
  #sorted = false;
  allCats = [];
  constructor() {
    this._getLocalStorage();
    this._createCatsList(catgroup);

    btnNew.addEventListener("click", this._hideNShowForm.bind(this));
    btnNew.addEventListener("click", this._createCatsList(formInputCat));
    tabs.addEventListener("click", this._changeTab);
    btnSubmitForm.addEventListener("click", this._newTask.bind(this));
    closeNewForm.addEventListener("click", this._hideNShowForm);
    tasksLists.addEventListener("click", this._checkTask.bind(this));
    btnSort.addEventListener("click", this._sortList.bind(this));
    btnNewCat.addEventListener("click", this._hideNShowCatForm.bind(this));
    formNewCat.addEventListener("submit", this._newCat.bind(this));
    catgroup.addEventListener("change", this._changeCat.bind(this));
  }

  _createCatsList(place) {
    place.innerHTML = "";
    let html;
    this.allCats.forEach(
      (cat) =>
        (html += `
    <option class="cat-option" value="${cat}">${cat}</option>
`)
    );

    place.insertAdjacentHTML("beforeend", html);
  }
  _hideNShowCatForm(e) {
    btnNewCat.classList.toggle("btn-cancel");
    e.preventDefault();
    document.querySelector(".new--cat").value = "";
    document.querySelector(".form--new--cat").classList.toggle("hidden");
    catgroup.classList.toggle("hidden");
  }
  _newCat(e) {
    e.preventDefault();
    const newCat = document.querySelector(".new--cat").value;
    this.allCats.push(newCat);
    this._hideNShowCatForm(e);
    this._setLocalStorage();
    this._createCatsList(catgroup);
  }
  _changeCat(e) {
    e.preventDefault();
    catgroup.blur();
    this._renderAllTasks(false, catgroup.value);
  }

  _checkTask(e) {
    if (e.target.classList.contains("task--checkbox")) {
      const taskEl = e.target.closest(".task--box");
      const task = this.#allTasks.find((task) => task.id === taskEl.dataset.id);
      task.status = !task.status;
      this._setLocalStorage();
      this._renderAllTasks();
    }
  }
  _setLocalStorage() {
    localStorage.setItem("allTasks", JSON.stringify(this.#allTasks));
    localStorage.setItem("allCats", JSON.stringify(this.allCats));
  }
  _getLocalStorage() {
    // recive all tasks
    const data = JSON.parse(localStorage.getItem("allTasks"));
    if (!data) return;
    // recive all cats
    const data2 = JSON.parse(localStorage.getItem("allCats"));
    if (!data2) return [];

    // save data
    this.allCats = data2;
    this.#allTasks = data;

    // load localStorage
    this._createCatsList(catgroup);
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

    // this._createCatsList(formInputCat);
  }
  _changeTab(e) {
    if (!e.target.classList.contains("tab--active")) {
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
  }
  _newTask(e) {
    e.preventDefault();
    const newTaskTitle = document.querySelector(".form--input--title").value;
    const newTaskDate = document.querySelector(".form--input--date").value;
    const newTaskCat = document.querySelector(".form--input--cat").value;
    const newTaskDescription = document.querySelector(
      ".form--input--description"
    ).value;

    let task = new Task(
      newTaskTitle,
      newTaskDate,
      newTaskCat,
      newTaskDescription
    );
    this._renderTask(task);
    this.#allTasks.push(task);

    document.querySelector(".form--input--title").value =
      document.querySelector(".form--input--date").value =
      document.querySelector(".form--input--cat").value =
      document.querySelector(".form--input--description").value =
        "";

    this._hideNShowForm(e);
    this._setLocalStorage();
  }
  _renderAllTasks(sorted = false, cat = "") {
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

    allTasks = cat ? allTasks.filter((task) => task.cat === cat) : allTasks;

    // render all tasks
    allTasks.forEach((task) => this._renderTask(task, task.status));
  }
  _sortList() {
    this.#sorted = !this.#sorted;
    this._renderAllTasks(this.#sorted);
  }
}

const app = new App();
