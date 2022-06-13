"use strict";
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/To-do-app/serviceWorker.js");
}

//// abbreviations
// -f : form
// -e : edit
// -n : new
// -c : close
// -i : input
// -b : button

const catSelectList = document.querySelector(".cat-select-list");
const catContainer = document.querySelector(".cat-container");
const fNCat = document.querySelector(".f-n-cat");
const fNCatAdd = document.querySelector(".f-n-cat-add");
const fNCatDel = document.querySelector(".f-n-cat-del");

const tabs = document.querySelector(".tabs");
const tabDoneCount = document.querySelector(".tab-done-count");
const tabUndoneCount = document.querySelector(".tab-undone-count");

const tasksLists = document.querySelector(".tasks-lists");
const tasksListUndone = document.querySelector(".tasks-list-undone");
const tasksListDone = document.querySelector(".tasks-list-done");

const mainBox = document.querySelector(".main-box");
const searchBox = document.querySelector(".search-box");

const boxNTask = document.querySelector(".box-n-task");
const fNTaskS = document.querySelector(".f-n-task-s");

const fNTaskC = document.querySelector(".f-n-task-c");
const fNTaskICat = document.querySelector(".f-n-task-i-cat");

const boxEtask = document.querySelector(".box-e-task");
const fETaskC = document.querySelector(".f-e-task-c");
const fETaskCat = document.querySelector(".f-e-task-cat");
const fETaskSave = document.querySelector(".f-e-task-save");
const fETaskDel = document.querySelector(".f-e-task-del");

const controlBtns = document.querySelector(".control-btns");
const btnNew = document.querySelector(".btn-new");
const btnSort = document.querySelector(".btn-sort");
const btnSearch = document.querySelector(".btn-search");

const fNTaskRep = document.querySelector(".f-n-task-rep");
const fETaskRep = document.querySelector(".f-e-task-rep");

const themeToggle = document.querySelector(".theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");

const fSearchI = document.querySelector(".f-search-i");
const searchRes = document.querySelector(".search-results");

class Task {
  date = new Date();
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

    fNCat.addEventListener("submit", this._newCat.bind(this));
    fNCatAdd.addEventListener("click", this._hideShowCatForm.bind(this));
    fNCatDel.addEventListener("click", this._delCat.bind(this));
    catSelectList.addEventListener("change", this._changeCat.bind(this));

    tabs.addEventListener("click", this._changeTab);

    fNTaskC.addEventListener("click", this._hideShowFormNew);
    fNTaskS.addEventListener("click", this._newTask.bind(this));

    tasksLists.addEventListener("click", this._checkTask.bind(this));
    searchRes.addEventListener("click", this._checkTask.bind(this));

    btnSort.addEventListener("click", this._sortList.bind(this));
    btnSearch.addEventListener("click", this._hideShowSearchForm.bind(this));
    btnNew.addEventListener("click", this._hideShowFormNew.bind(this));

    fETaskC.addEventListener("click", this._hideShowEditForm);
    fETaskDel.addEventListener("click", this._delTask.bind(this));
    fETaskSave.addEventListener("click", this._saveEdit.bind(this));

    //theme
    themeToggle.addEventListener("click", this._changeTheme);

    //
    fNTaskRep.addEventListener("click", this._addNRepeatation);
    fETaskRep.addEventListener("click", this._addERepeatation.bind(""));

    //
    // fSearchI.addEventListener("oninput", this._searchTask.bind(this));
    fSearchI.oninput = this._searchTask.bind(this);
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

    this._createCatsList(catSelectList);
    this.#currentCat = catSelectList.value;
    this._renderAllTasks(false, this.#allCats[0]);
  }

  _newCat(e) {
    e.preventDefault();
    const newCat = document.querySelector(".f-n-cat-i").value;
    if (!newCat) return;
    this.#allCats.push(newCat);
    this._hideShowCatForm(e);
    this._setLocalStorage();
    this._createCatsList(catSelectList);
    this._createCatsList(fNTaskICat);
    catSelectList.value = newCat;
    this._changeCat(e);
  }
  _newTask(e) {
    e.preventDefault();
    //alerts
    if (document.querySelector(".f-n-task-i-title").value === "")
      return alert("Please enter a title");
    if (document.querySelector(".f-n-task-i-rep")?.value <= 0)
      return alert("Please enter a positive number");
    if (
      document.querySelector(".f-n-task-i-rep") &&
      document.querySelector(".f-n-task-i-date").value === ""
    )
      return alert("Please enter a date");

    // collect data
    const newTaskTitle = document.querySelector(".f-n-task-i-title").value;
    const newTaskDate = document.querySelector(".f-n-task-i-date").value;
    const newTaskCat = document.querySelector(".f-n-task-i-cat").value;
    const newTaskDescription = document.querySelector(".f-n-task-i-des").value;
    const repeatPeriod = document.querySelector(".f-n-select-period")?.value;
    let period;
    if (repeatPeriod === "days") period = 1;
    if (repeatPeriod === "weeks") period = 7;
    if (repeatPeriod === "monthes") period = 30;
    if (repeatPeriod === "years") period = 365;
    const newRepeatCount =
      document.querySelector(".f-n-task-i-rep")?.value * period;

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
    document.querySelectorAll(".no-task").forEach((el) => el.remove());

    // cleaning form inputs
    document.querySelector(".f-n-task-i-title").value =
      document.querySelector(".f-n-task-i-date").value =
      document.querySelector(".f-n-task-i-cat").value =
      document.querySelector(".f-n-task-i-des").value =
        "";
    document.querySelector(".f-n-task-i-rep")
      ? (document.querySelector(".f-n-task-i-rep").value = "")
      : "";
    const el = document.querySelector(".f-section-rep");
    if (el) el.remove();

    // count done and undone tasks
    tabUndoneCount.textContent = +tabUndoneCount.textContent + 1;

    // hide new form
    this._hideShowFormNew(e);

    // save to localStorage
    this._setLocalStorage();
  }

  _hideShowCatForm(e) {
    e.preventDefault();
    fNCatAdd.classList.toggle("btn-cancel");
    catSelectList.classList.toggle("hidden");
    document.querySelector(".f-n-cat").classList.toggle("hidden");
    // document.querySelector(".f-n-cat-b-label").classList.toggle("hidden");
    document.querySelector(".f-n-cat-i").value = "";
    document.querySelector(".f-n-cat-i").focus();
  }
  _hideShowEditForm(e) {
    e.preventDefault();
    if (!searchRes.classList.contains("hidden")) this._hideShowSearchForm(e);
    catContainer.classList.toggle("hidden");
    tasksLists.classList.toggle("hidden");
    tabs.classList.toggle("hidden");
    controlBtns.classList.toggle("hidden");
    boxEtask.classList.toggle("hidden");
    mainBox.classList.toggle("max-height");
  }
  _hideShowFormNew(e) {
    e.preventDefault();
    catContainer.classList.toggle("hidden");
    tasksLists.classList.toggle("hidden");
    tabs.classList.toggle("hidden");
    controlBtns.classList.toggle("hidden");
    boxNTask.classList.toggle("hidden");
    mainBox.classList.toggle("max-height");
    document.querySelector(".f-n-task-i-title").focus();
    if (tasksLists.classList.contains("hidden")) {
      this._createCatsList(fNTaskICat);
    }
  }
  _hideShowSearchForm(e) {
    e.preventDefault();
    catContainer.classList.toggle("hidden");
    tasksLists.classList.toggle("hidden");
    tabs.classList.toggle("hidden");
    searchBox.classList.toggle("hidden");
    searchRes.classList.toggle("hidden");
    if (searchBox.classList.contains("hidden")) {
      mainBox.style.marginTop = "-26px";
    } else {
      mainBox.style.marginTop = "0px";
    }
    fSearchI.value = "";
    fSearchI.focus();
    searchRes.innerHTML = "";
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
      <div class="task-box" data-id="${task.id}">
        <input type="checkbox" ${
          status === false ? "" : "checked"
        } class="task-checkbox">
        
        <div class="task-title">${task.title}</div>
        ${isLate && !status ? `<div class="task-late">Miss</div>` : ""}
        <div class="task-date">${
          status === false ? this._remainDays(task.date) : intlDate
        }</div>
        
      </div>
    `;

    if (search) {
      document
        .querySelector(".search-results")
        .insertAdjacentHTML("beforeend", html);
    } else {
      status === false
        ? tasksListUndone.insertAdjacentHTML("beforeend", html)
        : tasksListDone.insertAdjacentHTML("beforeend", html);
    }
  }
  _renderAllTasks(sorted = false, cat) {
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
      let text = `<div class="no-task">All tasks are done!</div>`;
      let text2 = `<div class="no-task">No task has been done!!</div>`;
      tasksListUndone.insertAdjacentHTML("afterbegin", text);
      tasksListDone.insertAdjacentHTML("afterbegin", text2);
    }
    if (doneCount === 0 && undoneCount === 0) {
      tabDoneCount.textContent = "";
      tabUndoneCount.textContent = "";
    } else {
      tabDoneCount.textContent = doneCount;
      tabUndoneCount.textContent = undoneCount;
    }
  }

  _delCat(e) {
    if (!catSelectList.value === "Main list") {
      if (
        confirm(
          `Are you sure you want to delete "${catSelectList.value}" list?`
        )
      ) {
        this.#allCats.splice(
          this.#allCats.findIndex((cat) => cat === catSelectList.value),
          1
        );
        this.#allTasks.forEach((task) => {
          if (task.cat === catSelectList.value) task.cat = "";
        });

        this._setLocalStorage();
        this._createCatsList(catSelectList);
        this._createCatsList(fNTaskICat);
        this._changeCat(e);
      }
    } else {
      alert("You can't delete Main list!");
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
    catSelectList.blur();
    this.#currentCat = catSelectList.value;
    this._renderAllTasks(false, this.#currentCat);
  }
  _createCatsList(place) {
    place.innerHTML = "";
    let html;
    if (this.#allCats === []) return;
    this.#allCats.forEach((cat) => {
      let catEl = `<option class="cat-option" value="${cat}">${cat}</option>`;
      html += catEl;
    });
    html += `<option class="cat-option" value="">Main list</option>`;
    // console.log(html);

    place.insertAdjacentHTML("beforeend", html);
  }
  _saveEdit(e) {
    e.preventDefault();

    //alerts
    if (document.querySelector(".f-n-task-i-title").value === "")
      return alert("Please enter a title");
    if (document.querySelector(".f-n-task-i-rep")?.value <= 0)
      return alert("Please enter a positive number");
    if (
      document.querySelector(".f-n-task-i-rep") &&
      document.querySelector(".f-n-task-i-date").value === ""
    )
      return alert("Please enter a date");

    //

    const task = this.#allTasks.find((task) => task.id === this.#currentId);
    task.title = document.querySelector(".f-e-task-title").value;
    task.date = document.querySelector(".f-e-task-date").value;
    task.cat = document.querySelector(".f-e-task-cat").value;
    task.description = document.querySelector(".f-e-task-des").value;
    const repeatPeriod = document.querySelector(".f-e-select-period")?.value;
    let period;
    if (repeatPeriod === "days") period = 1;
    if (repeatPeriod === "weeks") period = 7;
    if (repeatPeriod === "monthes") period = 30;
    if (repeatPeriod === "years") period = 365;
    task.repeatCount =
      document.querySelector(".f-e-task-i-rep")?.value * period;

    this._setLocalStorage();
    this._renderAllTasks(false, this.#currentCat);
    this._hideShowEditForm(e);
  }
  _checkTask(e) {
    const taskEl = e.target.closest(".task-box");
    if (!taskEl) return;
    const task = this.#allTasks.find((task) => task.id === taskEl.dataset.id);

    // checkbox part
    if (e.target.classList.contains("task-checkbox")) {
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
    this._createCatsList(fETaskCat);
    document.querySelector(".f-e-task-title").value = task.title;
    document.querySelector(".f-e-task-date").valueAsDate = new Date(task.date);
    document.querySelector(".f-e-task-des").value = task.description;
    if (task.repeatCount > 0) {
      this._addERepeatation(task.repeatCount, "unRegen");
    } else {
      if (document.querySelector(".f-section-rep"))
        document.querySelector(".f-section-rep").remove();
    }
    fETaskCat.value = task.cat;
    this.#currentId = task.id;

    if (document.querySelector(".done-date-section"))
      document.querySelector(".done-date-section").remove();

    // add complitition to edit form
    if (task.status) {
      // add done date to task
      task.doneDate = new Date(task.doneDate);

      let htmlEl = `
            <div class="f-section done-date-section">
              <label class="f-l">Compelited on</label>
              <label class="task-done-date">
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
        .querySelector(".f-e-date-section")
        .insertAdjacentHTML("afterend", htmlEl);
    }

    // checkbox
    // if (e.target.classList.contains("task-checkbox")) {
    //   task.status = !task.status;
    //   const checkboxAudio = document.querySelector("audio");
    //   if (task.status) checkboxAudio.play();
    //   task.doneDate = new Date();

    //   if (task.status && task.repeatCount > 0) {
    //     let newtask = new Task(
    //       task.title,
    //       new Date(
    //         new Date(task.date).getTime() +
    //           task.repeatCount * 24 * 60 * 60 * 1000
    //       ),
    //       task.cat,
    //       task.description,
    //       task.repeatCount
    //     );
    //     this._renderTask(newtask);
    //     this.#allTasks.push(newtask);
    //   }

    //   this._setLocalStorage();
    //   this._renderAllTasks(false, this.#currentCat);
    //   if (!task.status && document.querySelector(".done-date-section")) {
    //     document.querySelector(".done-date-section").remove();
    //   }
    // } else {
    //   // edit task
    //   this._hideShowEditForm(e);

    //   this._createCatsList(fETaskCat);
    //   document.querySelector(".f-e-task-title").value = task.title;
    //   document.querySelector(".f-e-task-date").valueAsDate = new Date(
    //     task.date
    //   );
    //   document.querySelector(".f-e-task-des").value = task.description;
    //   if (task.repeatCount > 0) {
    //     this._addERepeatation(task.repeatCount, "unRegen");
    //   }
    //   fETaskCat.value = task.cat;
    //   this.#currentId = task.id;

    //   // clean complited section
    //   if (!task.status && document.querySelector(".done-date-section"))
    //     return document.querySelector(".done-date-section").remove();
    //   if (task.status) {
    //     // add done date to task
    //     task.doneDate = new Date(task.doneDate);

    //     let htmlEl = `
    //       <div class="f-section done-date-section">
    //         <label class="f-l">Compelited on</label>
    //         <label class="task-done-date">
    //         ${String(task.doneDate.getDate()).padStart(2, 0)}/${String(
    //       task.doneDate.getMonth() + 1
    //     ).padStart(2, 0)}/${String(task.doneDate.getFullYear())}
    //           -
    //         ${String(task.doneDate.getHours()).padStart(2, 0)}:
    //         ${String(task.doneDate.getMinutes()).padStart(2, 0)}

    //         </label>
    //       </div>

    //     `;
    //     document
    //       .querySelector(".f-e-date-section")
    //       .insertAdjacentHTML("afterend", htmlEl);
    //   }
    // }
  }
  _changeTab(e) {
    const target = e.target.closest(".tab");
    if (!target.classList.contains("tab-active")) {
      // active current tab
      document
        .querySelectorAll(".tab")
        .forEach((tab) => tab.classList.remove("tab-active"));
      target.classList.add("tab-active");

      // ;

      // show active list
      document
        .querySelectorAll(".tasks-list")
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

    console.log(theme);
    document.querySelector(".fa-sun").classList.toggle("hidden");
    document.querySelector(".fa-moon").classList.toggle("hidden");

    localStorage.setItem("theme", theme);
  }
  //
  _addERepeatation(value, regen = "regen") {
    const el = document.querySelector(".f-section-rep");
    if (el) {
      if (regen === "regen") return el.remove();
      el.remove();
    }
    let html = `
      <div class="f-section f-section-rep">
        <label class="f-l">Repeat every</label>
        <input class="f-e-task-i f-e-task-i-rep" type="number" placeholder="" value="${
          value ? value : ""
        }" />
        <select class="f-e-select-period">
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="monthes">monthes</option>
          <option value="years">years</option>
      </select>
        
          
      </div>

    `;
    document
      .querySelector(".f-e-cat-section")
      .insertAdjacentHTML("beforebegin", html);
  }
  _addNRepeatation() {
    const el = document.querySelector(".f-section-rep");
    if (el) return el.remove();

    let html = `
      <div class="f-section f-section-rep">
        <label class="f-l">Repeat every</label>
        <input class="f-n-task-i f-n-task-i-rep" type="number" placeholder="" />
        <select class="f-n-select-period">
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="monthes">monthes</option>
          <option value="years">years</option>
        </select>
          
      </div>

    `;
    document
      .querySelector(".f-n-cat-section")
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
    searchRes.innerHTML = "";
    const resTasks = this.#allTasks.filter((task) =>
      task.title.includes(fSearchI.value)
    );
    resTasks.forEach((task) => this._renderTask(task, false, true));
  }
}

const app = new App();
