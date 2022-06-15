"use strict";

const selectCategory = document.querySelector(".select--category");
const boxCat = document.querySelector(".box--cat");
const formCategory = document.querySelector(".form--category");
const btnCategoryAdd = document.querySelector(".button--category-add");
const btnCategoryDel = document.querySelector(".button--category-del");

const tabs = document.querySelector(".tabs");
const tabsList = document.querySelector(".tabs__list");
const tabsDoneCount = document.querySelector(".tabs--done-count");
const tabsUndoneCount = document.querySelector(".tabs--undone-count");

const tabsBodyTasksLists = document.querySelector(".tabs__body--tasks-lists");
const tabsBodyTasksUndone = document.querySelector(".tabs__body--tasks-undone");
const tabsBodyTasksDone = document.querySelector(".tabs__body--tasks-done");

const tabsSection = document.querySelector(".tabs__section");
const tabsBodySearch = document.querySelector(".tabs__body--search");

const tabsBodyNew = document.querySelector(".tabs__body--new");
const btnNewSave = document.querySelector(".button--new-save");

const btnNewClose = document.querySelector(".button--new-close");
const inputNewCat = document.querySelector(".input--new-cat");

const tabsBodyEdit = document.querySelector(".tabs__body--edit");
const btnEditClose = document.querySelector(".button--edit-close");
const inputEditCat = document.querySelector(".input--edit-cat");
const btnEditSave = document.querySelector(".button--edit-save");
const btnEditDel = document.querySelector(".button--edit-del");

const buttons = document.querySelector(".buttons");
const btnNew = document.querySelector(".button--new");
const btnSort = document.querySelector(".button--sort");
const btnSearch = document.querySelector(".button--search");

const btnNewRep = document.querySelector(".button--new-rep");
const btnEditRep = document.querySelector(".button--edit-rep");

const btnThemeToggle = document.querySelector(".button--theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");

const inputSearch = document.querySelector(".input--search");
const btnSearchClose = document.querySelector(".button--search-close");
const tabsBodySearchRes = document.querySelector(".tabs__body--search-res");

const btnMessageClose = document.querySelector(".button--message-close");

class Task {
  id = (Date.now() + "").slice(-10);
  doneDate;
  constructor(title, date, cat, description = "", repeatCount = 0) {
    this.title = title;
    this.date = date;
    this.cat = cat;
    this.description = description;
    this.status = false;
    this.repeatCount = repeatCount;
  }
}

class App {
  #allTasks = [];
  #sorted = false;
  #allCats = [];
  #currentId;
  #currentCat;

  constructor() {
    this._getLocalStorage();

    formCategory.addEventListener("submit", this._newCat.bind(this));
    btnCategoryAdd.addEventListener("click", this._hideShowCatForm.bind(this));
    btnCategoryDel.addEventListener("click", this._delCat.bind(this));
    selectCategory.addEventListener("change", this._changeCat.bind(this));

    tabsList.addEventListener("click", this._changeTab.bind(this));

    btnNewClose.addEventListener("click", this._hideShowFormNew.bind(this));
    btnNewSave.addEventListener("click", this._newTask.bind(this));

    tabsBodyTasksLists.addEventListener("click", this._checkTask.bind(this));
    tabsBodySearchRes.addEventListener("click", this._checkTask.bind(this));

    btnSort.addEventListener("click", this._sortList.bind(this));
    btnSearch.addEventListener("click", this._hideShowSearchForm.bind(this));
    btnNew.addEventListener("click", this._hideShowFormNew.bind(this));

    btnEditClose.addEventListener("click", this._hideShowEditForm);
    btnEditDel.addEventListener("click", this._delTask.bind(this));
    btnEditSave.addEventListener("click", this._saveEdit.bind(this));

    //theme
    btnThemeToggle.addEventListener("click", this._changeTheme);

    //
    btnNewRep.addEventListener("click", this._addNRepeatation);
    btnEditRep.addEventListener("click", this._addERepeatation.bind(""));

    //
    btnSearchClose.addEventListener(
      "click",
      this._hideShowSearchForm.bind(this)
    );
    inputSearch.oninput = this._searchTask.bind(this);

    btnMessageClose.addEventListener("click", this._closeMessage);
  }

  _setLocalStorage() {
    localStorage.setItem("allTasks", JSON.stringify(this.#allTasks));
    localStorage.setItem("allCats", JSON.stringify(this.#allCats));
  }
  _getLocalStorage() {
    //theme
    if (currentTheme === "dark") {
      document.body.classList.toggle("dark-theme");
      document.querySelector(".fa-moon").classList.add("hidden");
      document.querySelector(".fa-sun").classList.remove("hidden");
    } else if (currentTheme === "light") {
      document.body.classList.toggle("light-theme");
      document.querySelector(".fa-sun").classList.add("hidden");
      document.querySelector(".fa-moon").classList.remove("hidden");
    }

    // recive all tasks
    const data = JSON.parse(localStorage.getItem("allTasks"));
    if (!data) return;
    // recive all cats
    const data2 = JSON.parse(localStorage.getItem("allCats"));
    // if (!data2) return;

    // save data
    this.#allCats = data2;
    this.#allTasks = data;

    // load localStorage

    this._createCatsList(selectCategory);
    this.#currentCat = selectCategory.value;
    this._renderAllTasks(false, this.#allCats[0]);
  }

  _newCat(e) {
    e.preventDefault();
    const newCat = document.querySelector(".input--category-title").value;
    if (!newCat) return;
    this.#allCats.push(newCat);
    this._hideShowCatForm(e);
    this._setLocalStorage();
    this._createCatsList(selectCategory);
    this._createCatsList(inputNewCat);
    selectCategory.value = newCat;
    this._changeCat(e);
  }
  _newTask(e) {
    e.preventDefault();
    //alerts
    if (document.querySelector(".input--new-title").value === "")
      return this._alertError("no task title");

    if (
      document.querySelector(".input--new-repeat-count") &&
      document.querySelector(".input--new-date").value === ""
    )
      return this._alertError("no task date");
    if (document.querySelector(".input--new-repeat-count")?.value <= 0)
      return this._alertError("wrong repeat count");

    // collect data
    const newTaskTitle = document.querySelector(".input--new-title").value;
    const newTaskDate = document.querySelector(".input--new-date").value;
    const newTaskCat = document.querySelector(".input--new-cat").value;
    const newTaskDescription = document.querySelector(".input--new-des").value;
    const repeatPeriod = document.querySelector(".select--new-period")?.value;
    let period;
    if (repeatPeriod === "days") period = 1;
    if (repeatPeriod === "weeks") period = 7;
    if (repeatPeriod === "monthes") period = 30;
    if (repeatPeriod === "years") period = 365;
    const newRepeatCount =
      document.querySelector(".input--new-repeat-count")?.value * period;

    // new task define
    let task = new Task(
      newTaskTitle,
      newTaskDate,
      newTaskCat,
      newTaskDescription,
      newRepeatCount
    );
    this._renderTask(task);
    this.#allTasks.push(task);

    // delete no task messages
    document.querySelectorAll(".message--no-task").forEach((el) => el.remove());

    // cleaning form inputs
    document.querySelector(".input--new-title").value =
      document.querySelector(".input--new-date").value =
      document.querySelector(".input--new-cat").value =
      document.querySelector(".input--new-des").value =
        "";
    document.querySelector(".input--new-repeat-count")
      ? (document.querySelector(".input--new-repeat-count").value = "")
      : "";
    const el = document.querySelector(".form__field--repeat");
    if (el) el.remove();

    // count done and undone tasks
    tabsUndoneCount.textContent = +tabsUndoneCount.textContent + 1;

    // hide new form
    this._hideShowFormNew(e);

    // save to localStorage
    this._setLocalStorage();
  }

  _hideShowCatForm(e) {
    e.preventDefault();
    btnCategoryAdd.classList.toggle("rotate-z");
    selectCategory.classList.toggle("hidden");
    document.querySelector(".form--category").classList.toggle("hidden");
    document.querySelector(".input--category-title").value = "";
    document.querySelector(".input--category-title").focus();
  }
  _hideShowEditForm(e) {
    e.preventDefault();
    if (!tabsBodySearchRes.classList.contains("hidden"))
      this._hideShowSearchForm(e);
    boxCat.classList.toggle("hidden");
    tabsBodyTasksLists.classList.toggle("hidden");
    document.querySelector(".tabs__list").classList.toggle("hidden");
    buttons.classList.toggle("hidden");
    tabsBodyEdit.classList.toggle("hidden");
    tabsSection.classList.toggle("max-height");
  }
  _hideShowFormNew(e) {
    e.preventDefault();
    boxCat.classList.toggle("hidden");
    tabsBodyTasksLists.classList.toggle("hidden");
    document.querySelector(".tabs__list").classList.toggle("hidden");
    buttons.classList.toggle("hidden");
    tabsBodyNew.classList.toggle("hidden");
    tabsSection.classList.toggle("max-height");
    document.querySelector(".input--new-title").focus();

    if (tabsBodyTasksLists.classList.contains("hidden")) {
      this._createCatsList(inputNewCat);
      inputNewCat.value = this.#currentCat;
    }
    if (!formCategory.classList.contains("hidden")) {
      formCategory.classList.add("hidden");
      selectCategory.classList.remove("hidden");
      btnCategoryAdd.classList.remove("rotate-z");
    }
  }
  _hideShowSearchForm(e) {
    e.preventDefault();
    boxCat.classList.toggle("hidden");
    tabsBodyTasksLists.classList.toggle("hidden");
    buttons.classList.toggle("hidden");
    document.querySelector(".tabs__list").classList.toggle("hidden");
    tabsBodySearch.classList.toggle("hidden");
    tabsBodySearchRes.classList.toggle("hidden");
    inputSearch.value = "";
    inputSearch.focus();
    tabsBodySearchRes.innerHTML = "";
    if (!formCategory.classList.contains("hidden")) {
      formCategory.classList.add("hidden");
      selectCategory.classList.remove("hidden");
      btnCategoryAdd.classList.remove("rotate-z");
    }
  }

  _renderTask(task, status = false, search = false) {
    const options = { month: "numeric", day: "numeric" };
    const intlDate = task.date
      ? new Intl.DateTimeFormat("en-US", options).format(new Date(task.date))
      : "";

    const isLate =
      +new Date(task.date) / (1000 * 60 * 60 * 24) + 1 <
      +new Date() / (1000 * 60 * 60 * 24);

    let html = `
      <div class="checkbox__body" data-id="${task.id}">
        <input type="checkbox" ${
          status === false ? "" : "checked"
        } class="checkbox__input">
        
        <div class="checkbox__label-title">${task.title}</div>
        ${
          isLate && !status
            ? `<div class="checkbox__label-late">Miss</div>`
            : ""
        }
        <div class="checkbox__label-date">${
          status === false ? this._remainDays(task.date) : intlDate
        }</div>
        
      </div>
    `;

    if (search) {
      document
        .querySelector(".tabs__body--search-res")
        .insertAdjacentHTML("beforeend", html);
    } else {
      status === false
        ? tabsBodyTasksUndone.insertAdjacentHTML("beforeend", html)
        : tabsBodyTasksDone.insertAdjacentHTML("beforeend", html);
    }
  }
  _renderAllTasks(sorted = false, cat) {
    // clean 2 tabs
    document
      .querySelectorAll(".tabs__body--tasks-list")
      .forEach((list) => (list.innerHTML = ""));

    // sort lists
    let allTasks = sorted
      ? this.#allTasks
          .slice()
          .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
      : this.#allTasks;

    // allTasks = cat ? allTasks.filter((task) => task.cat === cat) : allTasks;
    allTasks = allTasks.filter((task) => task.cat === cat);
    let doneCount = 0;
    let undoneCount = 0;

    // render all tasks
    allTasks.forEach((task) => {
      this._renderTask(task, task.status);

      task.status ? doneCount++ : undoneCount++;
    });

    if (allTasks.length === 0) {
      let text = `<div class="message--no-task">All tasks are done!</div>`;
      let text2 = `<div class="message--no-task">No task has been done!!</div>`;
      tabsBodyTasksUndone.insertAdjacentHTML("afterbegin", text);
      tabsBodyTasksDone.insertAdjacentHTML("afterbegin", text2);
    }
    if (doneCount === 0 && undoneCount === 0) {
      tabsDoneCount.textContent = "";
      tabsUndoneCount.textContent = "";
    } else {
      tabsDoneCount.textContent = doneCount;
      tabsUndoneCount.textContent = undoneCount;
    }
  }

  _delCat(e) {
    if (!formCategory.classList.contains("hidden")) return;
    if (selectCategory.value !== "") {
      if (
        confirm(
          `Are you sure you want to delete "${selectCategory.value}" list?`
        )
      ) {
        this.#allCats.splice(
          this.#allCats.findIndex((cat) => cat === selectCategory.value),
          1
        );
        this.#allTasks.forEach((task) => {
          if (task.cat === selectCategory.value) task.cat = "";
        });

        this._setLocalStorage();
        this._createCatsList(selectCategory);
        this._createCatsList(inputNewCat);
        this._changeCat(e);
      }
    } else {
      return this._alertError("delete main");
    }
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
      this._hideShowEditForm(e);
    }
  }

  _changeCat(e) {
    e.preventDefault();
    selectCategory.blur();
    this.#currentCat = selectCategory.value;
    this._renderAllTasks(false, this.#currentCat);
  }
  _createCatsList(place) {
    place.innerHTML = "";
    let html;
    if (this.#allCats === []) return;
    this.#allCats.forEach((cat) => {
      let catEl = `<option value="${cat}">${cat}</option>`;
      html += catEl;
    });
    html += `<option value="">Main</option>`;
    // console.log(html);

    place.insertAdjacentHTML("beforeend", html);
  }
  _saveEdit(e) {
    e.preventDefault();

    //alerts
    if (document.querySelector(".input--new-title").value === "")
      return this._alertError("no task title");

    if (
      document.querySelector(".input--new-repeat-count") &&
      document.querySelector(".input--new-date").value === ""
    )
      return this._alertError("no task date");
    if (document.querySelector(".input--new-repeat-count")?.value <= 0)
      return this._alertError("wrong repeat count");

    //

    const task = this.#allTasks.find((task) => task.id === this.#currentId);
    task.title = document.querySelector(".input--edit-title").value;
    task.date = document.querySelector(".input--edit-date").value;
    task.cat = document.querySelector(".input--edit-cat").value;
    task.description = document.querySelector(".input--edit-des").value;
    const repeatPeriod = document.querySelector(".select--edit-period")?.value;
    let period;
    if (repeatPeriod === "days") period = 1;
    if (repeatPeriod === "weeks") period = 7;
    if (repeatPeriod === "monthes") period = 30;
    if (repeatPeriod === "years") period = 365;
    task.repeatCount =
      document.querySelector(".input--edit-repeat-count")?.value * period;

    this._setLocalStorage();
    this._renderAllTasks(false, this.#currentCat);
    this._hideShowEditForm(e);
  }
  _checkTask(e) {
    const taskEl = e.target.closest(".checkbox__body");
    if (!taskEl) return;
    const task = this.#allTasks.find((task) => task.id === taskEl.dataset.id);

    // checkbox part
    if (e.target.classList.contains("checkbox__input")) {
      // change task status
      task.status = !task.status;

      // play audio if status is done
      const checkboxAudio = document.querySelector("audio");
      if (task.status) checkboxAudio.play();

      // create date of complitition
      task.doneDate = new Date();

      // create a new task if there is repeation and the status is done
      if (task.status && task.repeatCount > 0) {
        let newtask = new Task(
          task.title,
          new Date(
            new Date(task.date).getTime() +
              task.repeatCount * 24 * 60 * 60 * 1000
          ),
          task.cat,
          task.description,
          task.repeatCount
        );
        this._renderTask(newtask);
        this.#allTasks.push(newtask);
      }

      // save the task to localStorage
      this._setLocalStorage();

      // render all tasks
      this._renderAllTasks(false, this.#currentCat);

      return;
    }

    // edit part
    // show edit form
    this._hideShowEditForm(e);

    // fill the inputs
    this._createCatsList(inputEditCat);
    document.querySelector(".input--edit-title").value = task.title;
    document.querySelector(".input--edit-date").valueAsDate = new Date(
      task.date
    );
    document.querySelector(".input--edit-des").value = task.description;
    if (task.repeatCount > 0) {
      this._addERepeatation(task.repeatCount, "unRegen");
    } else {
      if (document.querySelector(".form__field--repeat"))
        document.querySelector(".form__field--repeat").remove();
    }
    inputEditCat.value = task.cat;
    this.#currentId = task.id;

    if (document.querySelector(".form__field--done-date"))
      document.querySelector(".form__field--done-date").remove();

    // add complitition to edit form
    if (task.status) {
      // add done date to task
      task.doneDate = new Date(task.doneDate);

      let htmlEl = `
            <div class="form__field form__field--done-date">
              <label class="form__label">Compelited on</label>
              <label class="form__label--done-date">
              ${String(task.doneDate.getDate()).padStart(2, 0)}/${String(
        task.doneDate.getMonth() + 1
      ).padStart(2, 0)}/${String(task.doneDate.getFullYear())}
                -
              ${String(task.doneDate.getHours()).padStart(2, 0)}:
              ${String(task.doneDate.getMinutes()).padStart(2, 0)}
  
              </label>
            </div>
  
          `;
      document
        .querySelector(".field--edit-date")
        .insertAdjacentHTML("afterend", htmlEl);
    }
  }
  _changeTab(e) {
    const target = e.target.closest(".tabs__item");
    if (!target.classList.contains("tabs--active")) {
      // active current tab
      document
        .querySelectorAll(".tabs__item")
        .forEach((tab) => tab.classList.remove("tabs--active"));
      target.classList.add("tabs--active");

      // ;

      // show active list
      document
        .querySelectorAll(".tabs__body--tasks-list")
        .forEach((list) => list.classList.toggle("hidden"));
    }
  }
  _sortList() {
    this.#sorted = !this.#sorted;
    this._renderAllTasks(this.#sorted, this.#currentCat);
  }

  _changeTheme() {
    let theme;
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
      theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
      document.body.classList.toggle("dark-theme");
      theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    }
    document.querySelector(".fa-sun").classList.toggle("hidden");
    document.querySelector(".fa-moon").classList.toggle("hidden");

    localStorage.setItem("theme", theme);
  }
  //
  _addERepeatation(value, regen = "regen") {
    const el = document.querySelector(".form__field--repeat");
    if (el) {
      if (regen === "regen") return el.remove();
      el.remove();
    }
    let html = `
      <div class="form__field form__field--repeat">
        <label class="form__label">Repeat every</label>
        <input class="input input--repeat-count input--edit-repeat-count" type="number" placeholder="" value="${
          value ? value : ""
        }" />
        <select class="select--period select--new-period">
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="monthes">monthes</option>
          <option value="years">years</option>
      </select>
        
          
      </div>

    `;
    document
      .querySelector(".field--edit-cat")
      .insertAdjacentHTML("beforebegin", html);
  }
  _addNRepeatation() {
    const el = document.querySelector(".form__field--repeat");
    if (el) return el.remove();

    let html = `
      <div class="form__field form__field--repeat">
        <label class="form__label">Repeat every</label>
        <input class="input input--repeat-count input--new-repeat-count" type="number" placeholder="" />
        <select class="select--period select--new-period ">
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="monthes">monthes</option>
          <option value="years">years</option>
        </select>
          
      </div>

    `;
    document
      .querySelector(".field--new-cat")
      .insertAdjacentHTML("beforebegin", html);
  }

  _remainDays(date) {
    if (!date) return "";
    const now = +new Date();
    const taskDate = new Date(date);
    const remDays = Math.trunc(
      (taskDate.getTime() - now) / (1000 * 60 * 60 * 24)
    );
    if (remDays < -1)
      return new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "numeric",
      }).format(taskDate);
    if (remDays === -1) return "Yesterday";
    if (remDays === 0) return "Today";
    if (remDays === 1) return "Tomorrow";
    if (remDays < 7)
      return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
        taskDate
      );
    if (remDays >= 7)
      return new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "numeric",
      }).format(taskDate);
  }
  _searchTask() {
    tabsBodySearchRes.innerHTML = "";
    const resTasks = this.#allTasks.filter((task) =>
      task.title.includes(inputSearch.value)
    );
    resTasks.forEach((task) => this._renderTask(task, false, true));
  }
  _alertError(err) {
    document.querySelector(".overlay").classList.remove("hidden");
    document.querySelector(".message").classList.remove("hidden");
    let msg;
    switch (err) {
      case "no task title":
        msg = "Please enter a title.";
        break;
      case "no task date":
        msg = "Please enter a date.";
        break;
      case "wrong repeat count":
        msg = "Please enter a positive number to repeat count.";
        break;
      case "delete main":
        msg = `You can't delete "Main" category!`;
        break;
    }
    let msgEl = `<div class="message__body--text">${msg}</div>`;
    document
      .querySelector(".message__body")
      .insertAdjacentHTML("beforeend", msgEl);
  }
  _closeMessage() {
    document.querySelector(".overlay").classList.add("hidden");
    document.querySelector(".message").classList.add("hidden");
    document.querySelector(".message__body--text").remove();
  }
}

const app = new App();

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/To-do-app/serviceWorker.js");
}

const notificationButton = document.getElementById("enableNotifications");
let swRegistration = null;

initializeApp();

function initializeApp() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker and Push is supported");

    //Register the service worker
    navigator.serviceWorker
      .register("./sw.js")
      .then((swReg) => {
        console.log("Service Worker is registered", swReg);

        swRegistration = swReg;
        initializeUi();
      })
      .catch((error) => {
        console.error("Service Worker Error", error);
      });
  } else {
    console.warn("Push messaging is not supported");
    notificationButton.textContent = "Push Not Supported";
  }
}

function initializeUi() {
  notificationButton.addEventListener("click", () => {
    displayNotification();
  });
}

function displayNotification() {
  if (window.Notification && Notification.permission === "granted") {
    notification();
  }
  // If the user hasn't told if he wants to be notified or not
  // Note: because of Chrome, we are not sure the permission property
  // is set, therefore it's unsafe to check for the "default" value.
  else if (window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission((status) => {
      if (status === "granted") {
        notification();
      } else {
        alert("You denied or dismissed permissions to notifications.");
      }
    });
  } else {
    // If the user refuses to get notified
    alert(
      "You denied permissions to notifications. Please go to your browser or phone setting to allow notifications."
    );
  }
}

function notification() {
  const options = {
    body: "Ramiiiiiiiiiiin",
  };
  swRegistration.showNotification("PWA Notification!", options);
}
