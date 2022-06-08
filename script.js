"use strict";

const catSelectList = document.querySelector(".cat-select-list");
const fNCat = document.querySelector(".f-n-cat");
const fNCatB = document.querySelector(".f-n-cat-b");
const fNCatI = document.querySelector(".f-n-cat-i");

const tabs = document.querySelector(".tabs");

const tasksLists = document.querySelector(".tasks-lists");
const tasksListUndone = document.querySelector(".tasks-list-undone");
const tasksListDone = document.querySelector(".tasks-list-done");

const boxNTask = document.querySelector(".box-n-task");
const fNTaskS = document.querySelector(".f-n-task-s");

const fNTaskC = document.querySelector(".f-n-task-c");
const fNTaskICat = document.querySelector(".f-n-task-i-cat");

const boxEtask = document.querySelector(".box-e-task");
const fETaskC = document.querySelector(".f-e-task-c");
const btnSaveEdit = document.querySelector(".f-e-task-save");
const btnDel = document.querySelector(".f-e-task-del");

const controlBtns = document.querySelector(".control-btns");
const btnNew = document.querySelector(".btn-new");
const btnSort = document.querySelector(".btn-sort");

class Task {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  doneDate;
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
  #currentId;
  #currentCat;

  constructor() {
    this._getLocalStorage();

    btnNew.addEventListener("click", this._hideNShowForm.bind(this));
    btnNew.addEventListener("click", this._createCatsList(fNTaskICat));

    tabs.addEventListener("click", this._changeTab);

    fNTaskS.addEventListener("click", this._newTask.bind(this));
    fNTaskC.addEventListener("click", this._hideNShowForm);

    fETaskC.addEventListener("click", this._hideNShowEditForm);

    tasksLists.addEventListener("click", this._checkTask.bind(this));
    btnSort.addEventListener("click", this._sortList.bind(this));
    fNCatB.addEventListener("click", this._hideNShowCatForm.bind(this));
    fNCat.addEventListener("submit", this._newCat.bind(this));
    catSelectList.addEventListener("change", this._changeCat.bind(this));
    btnSaveEdit.addEventListener("click", this._saveEdit.bind(this));
    btnDel.addEventListener("click", this._delTask.bind(this));
  }

  // _checkTitle(mode) {
  //   if (`document.querySelector(".f-${mode}-task-title").value === ''`)
  //     return false;
  // }

  _createCatsList(place) {
    place.innerHTML = "";
    let html;
    if (this.allCats === []) return;
    this.allCats.forEach(
      (cat) =>
        (html += `
    <option class="cat-option" value="${cat}">${cat}</option>
`)
    );

    place.insertAdjacentHTML("beforeend", html);
  }
  _hideNShowCatForm(e) {
    e.preventDefault();
    fNCatB.classList.toggle("btn-cancel");

    catSelectList.classList.toggle("hidden");
    document.querySelector(".f-n-cat").classList.toggle("hidden");
    document.querySelector(".f-n-cat-i").value = "";
  }
  _newCat(e) {
    e.preventDefault();
    const newCat = document.querySelector(".f-n-cat-i").value;
    if (!newCat) return;
    this.allCats.push(newCat);
    this._hideNShowCatForm(e);
    this._setLocalStorage();
    this._createCatsList(catSelectList);
    this._createCatsList(fNTaskICat);
    catSelectList.value = newCat;
  }
  _changeCat(e) {
    e.preventDefault();
    catSelectList.blur();
    this.#currentCat = catSelectList.value;
    this._renderAllTasks(false, this.#currentCat);
  }
  _hideNShowEditForm(e) {
    e.preventDefault();
    tasksLists.classList.toggle("hidden");
    tabs.classList.toggle("hidden");
    controlBtns.classList.toggle("hidden");
    boxEtask.classList.toggle("hidden");
  }
  _saveEdit(e) {
    e.preventDefault();

    const task = this.#allTasks.find((task) => task.id === this.#currentId);
    task.title = document.querySelector(".f-e-task-title").value;
    task.date = document.querySelector(".f-e-task-date").value;
    task.cat = document.querySelector(".f-e-task-cat").value;
    task.description = document.querySelector(".f-e-task-des").value;
    this._setLocalStorage();
    this._renderAllTasks(false, this.#currentCat);
    this._hideNShowEditForm(e);
  }
  _delTask(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this task")) {
      this.#allTasks.splice(
        this.#allTasks.findIndex((task) => task.id === this.#currentId),
        1
      );
      this._setLocalStorage();
      this._renderAllTasks(false, this.#currentCat);
      this._hideNShowEditForm(e);
    }
  }

  _checkTask(e) {
    const taskEl = e.target.closest(".task-box");
    if (!taskEl) return;
    const task = this.#allTasks.find((task) => task.id === taskEl.dataset.id);

    if (e.target.classList.contains("task-checkbox")) {
      task.status = !task.status;
      task.doneDate = new Date();
      this._setLocalStorage();
      this._renderAllTasks(false, this.#currentCat);
      console.log(task);
    } else {
      this._hideNShowEditForm(e);
      const catInput = document.querySelector(".f-e-task-cat");
      this._createCatsList(catInput);
      document.querySelector(".f-e-task-title").value = task.title;
      document.querySelector(".f-e-task-date").value = task.date;
      catInput.value = task.cat;
      document.querySelector(".f-e-task-des").value = task.description;
      this.#currentId = task.id;
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
    if (!data2) return;

    // save data
    this.allCats = data2;
    this.#allTasks = data;

    // load localStorage
    this._createCatsList(catSelectList);
    this._renderAllTasks(false, this.allCats[0]);
  }
  _renderTask(task, status = false) {
    let html = `
      <div class="task-box" data-id="${task.id}">
        <input type="checkbox" ${
          status === false ? "" : "checked"
        } class="task-checkbox">
        <div class="task-title">${task.title}</div>
        <div class="task-date">${task.date}</div>
        
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
    controlBtns.classList.toggle("hidden");
    boxNTask.classList.toggle("hidden");
    document.querySelector(".f-n-task-i-title").focus();
  }
  _changeTab(e) {
    if (!e.target.classList.contains("tab-active")) {
      // active current tab
      document
        .querySelectorAll(".tab")
        .forEach((tab) => tab.classList.remove("tab-active"));
      e.target.classList.add("tab-active");

      // show active list
      document
        .querySelectorAll(".tasks-list")
        .forEach((list) => list.classList.toggle("hidden"));
    }
  }
  _newTask(e) {
    e.preventDefault();
    const newTaskTitle = document.querySelector(".f-n-task-i-title").value;
    const newTaskDate = document.querySelector(".f-n-task-i-date").value;
    const newTaskCat = document.querySelector(".f-n-task-i-cat").value;
    const newTaskDescription = document.querySelector(".f-n-task-i-des").value;

    let task = new Task(
      newTaskTitle,
      newTaskDate,
      newTaskCat,
      newTaskDescription
    );
    this._renderTask(task);
    this.#allTasks.push(task);

    document.querySelector(".f-n-task-i-title").value =
      document.querySelector(".f-n-task-i-date").value =
      document.querySelector(".f-n-task-i-cat").value =
      document.querySelector(".f-n-task-i-des").value =
        "";

    this._hideNShowForm(e);
    this._setLocalStorage();
  }
  _renderAllTasks(sorted = false, cat = "") {
    // clean 2 tabs
    document
      .querySelectorAll(".tasks-list")
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
    this._renderAllTasks(this.#sorted, this.#currentCat);
  }
}

const app = new App();
