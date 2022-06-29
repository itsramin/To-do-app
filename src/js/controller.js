"use strict";

/// new codes
import View from "./view/view.js";
import newTaskView from "./view/newTaskView.js";
import editTaskView from "./view/editTaskView.js";
import taskView from "./view/taskView.js";
import * as model from "./model.js";
import listView from "./view/listView.js";
import categoryView from "./view/categoryView.js";
import searchView from "./view/searchView.js";
import themeView from "./view/themeView.js";

// class Task {
//   id = (Date.now() + "").slice(-10);
//   doneDate;
//   constructor(title, date, cat, description = "", repeatCount = 0) {
//     this.title = title;
//     this.date = date;
//     this.cat = cat;
//     this.description = description;
//     this.status = false;
//     this.repeatCount = repeatCount;
//   }
// }

// class App {
//   #allTasks = [];
//   #sorted = false;
//   #allCats = ["Main"];
//   #currentId;
//   #currentCat = "Main";

//   constructor() {
//     this._getLocalStorage();

//     // category handlers
//     formCategory.addEventListener("submit", this._newCat.bind(this));
//     btnCategoryAdd.addEventListener("click", this._hideShowCatForm.bind(this));
//     btnCategoryDel.addEventListener("click", this._delCat.bind(this));
//     selectCategory.addEventListener("change", this._changeCat.bind(this));

//     // tabs  handler
//     tabsList.addEventListener("click", this._changeTab.bind(this));

//     // click on task handler
//     tabsBodyTasksLists.addEventListener("click", this._checkTask.bind(this));
//     tabsBodySearchRes.addEventListener("click", this._checkTask.bind(this));

//     // main buttons handlers
//     btnSort.addEventListener("click", this._sortList.bind(this));
//     btnSearch.addEventListener("click", this._hideShowSearchForm.bind(this));
//     btnNew.addEventListener("click", this._hideShowNewForm.bind(this));

//     // new task form handlers
//     btnNewClose.addEventListener("click", this._hideShowNewForm.bind(this));
//     btnNewSave.addEventListener("click", this._newTask.bind(this));
//     btnNewRep.addEventListener("click", this._addRepetition);
//     btnGCal.addEventListener("click", this._saveToGcal);

//     // edit task form handlers
//     btnEditClose.addEventListener("click", this._hideShowEditForm);
//     btnEditDel.addEventListener("click", this._delTask.bind(this));

//     btnEditSave.addEventListener("click", this._saveEdit.bind(this));
//     btnEditRep.addEventListener("click", this._addRepetition);

//     // theme toggle handler
//     btnThemeToggle.addEventListener("click", this._changeTheme);

//     // search section handler
//     btnSearchClose.addEventListener(
//       "click",
//       this._hideShowSearchForm.bind(this)
//     );
//     inputSearch.oninput = this._searchTask.bind(this);

//     // message handler
//     btnMessageClose.addEventListener("click", this._closeMessage);
//     overlay.addEventListener("click", this._closeMessage);
//   }

//   // localStorage functions
//   _setLocalStorage() {
//     localStorage.setItem("allTasks", JSON.stringify(this.#allTasks));
//     localStorage.setItem("allCats", JSON.stringify(this.#allCats));
//   }
//   _getLocalStorage() {
//     //  get last theme color from local storage and set it to site's theme
//     if (currentTheme === "dark") {
//       document.body.classList.toggle("dark-theme");
//       document.querySelector(".fa-moon").classList.add("hidden");
//       document.querySelector(".fa-sun").classList.remove("hidden");
//     } else if (currentTheme === "light") {
//       document.body.classList.toggle("light-theme");
//       document.querySelector(".fa-sun").classList.add("hidden");
//       document.querySelector(".fa-moon").classList.remove("hidden");
//     }

//     // show messages for empty lists
//     if (this.#allTasks.length === 0) {
//       let textMsg = `<div class="message--no-task">All tasks are done !</div>`;
//       let textMsg2 = `<div class="message--no-task">No task has been done !</div>`;
//       tabsBodyTasksUndone.insertAdjacentHTML("afterbegin", textMsg);
//       tabsBodyTasksDone.insertAdjacentHTML("afterbegin", textMsg2);
//     }

//     // recive all tasks from local storage
//     const data = JSON.parse(localStorage.getItem("allTasks"));
//     if (!data) return;

//     // recive all categories  from local storage
//     const data2 = JSON.parse(localStorage.getItem("allCats"));

//     // save all tasks and categories to variables
//     this.#allCats = data2;
//     this.#allTasks = data;

//     // create category list from all categories
//     this._createCatsList(selectCategory);

//     // set current category to categoy selection value
//     this.#currentCat = selectCategory.value;

//     // show all tasks unsorted, category = "Main"
//     this._renderAllTasks(false, this.#allCats[0]);
//   }

//   // category functions
//   _newCat(e) {
//     e.preventDefault();
//     const newCat = document.querySelector(".input--category-title").value;
//     if (!newCat) return;

//     // formate new category to capital
//     const newCateFormatted =
//       newCat.at(0).toUpperCase() + newCat.slice(1).toLowerCase();

//     // check for duplicate category name
//     if (!this.#allCats.some((cat) => cat === newCateFormatted)) {
//       // add new category to all categories array
//       this.#allCats.push(newCateFormatted);

//       // hide category from
//       this._hideShowCatForm(e);

//       // save to local storage
//       this._setLocalStorage();

//       // create new category list
//       this._createCatsList(selectCategory);

//       // set category selection to new category
//       selectCategory.value = newCateFormatted;

//       // show new category tasks
//       this._changeCat(e);
//     } else {
//       this._alertError("duplicate cat");
//     }
//   }
//   _hideShowCatForm(e) {
//     e.preventDefault();
//     btnCategoryAdd.classList.toggle("rotate-z");
//     selectCategory.classList.toggle("hidden");
//     document.querySelector(".form--category").classList.toggle("hidden");
//     document.querySelector(".input--category-title").value = "";
//     document.querySelector(".input--category-title").focus();
//   }
//   _delCat(e) {
//     // check if "new category" form is visible
//     if (!formCategory.classList.contains("hidden")) return;

//     // check if user is deleting main category
//     if (selectCategory.value !== "Main") {
//       if (
//         confirm(
//           `Are you sure you want to delete "${selectCategory.value}" list?`
//         )
//       ) {
//         // delete "THAT" category from all categories array
//         this.#allCats.splice(
//           this.#allCats.findIndex((cat) => cat === selectCategory.value),
//           1
//         );

//         // set tasks' category was "THAT" category to "main" category
//         this.#allTasks.forEach((task) => {
//           if (task.cat === selectCategory.value) task.cat = "Main";
//         });

//         // save to local storage
//         this._setLocalStorage();

//         // create new category list
//         this._createCatsList(selectCategory);

//         // create new category list for new and edit forms
//         this._createCatsList(inputNewCat);
//         this._createCatsList(inputEditCat);

//         // show category tasks
//         this._changeCat(e);
//       }
//     } else {
//       return this._alertError("delete main");
//     }
//   }
//   _changeCat(e) {
//     e.preventDefault();
//     selectCategory.blur();
//     this.#currentCat = selectCategory.value;

//     // show all tasks unsorted from current category
//     this._renderAllTasks(false, this.#currentCat);
//   }
//   _createCatsList(place) {
//     // clean "place" content
//     place.innerHTML = "";

//     let html = "";
//     this.#allCats.forEach((cat) => {
//       html += `<option value="${cat}">${cat}</option>`;
//     });

//     place.insertAdjacentHTML("beforeend", html);
//   }

//   // task form functions
//   _newTask(e) {
//     e.preventDefault();

//     // check for alerts
//     // no title alert
//     if (document.querySelector(".input--new-title").value === "")
//       return this._alertError("no task title");

//     // no date alert
//     if (
//       document.querySelector(".input--new-repeat-count")?.value > 0 &&
//       document.querySelector(".input--new-date").value === ""
//     )
//       return this._alertError("no task date");

//     // wrong repeat count
//     if (document.querySelector(".input--new-repeat-count")?.value < 0)
//       return this._alertError("wrong repeat count");

//     // collect data from form
//     const newTaskTitle = document.querySelector(".input--new-title").value;
//     const newTaskDate = document.querySelector(".input--new-date").value;
//     const newTaskCat = document.querySelector(".input--new-cat").value
//       ? document.querySelector(".input--new-cat").value
//       : "Main";
//     const newTaskDescription = document.querySelector(".input--new-des").value;
//     const repeatPeriod = document.querySelector(".select--new-period")?.value;
//     let period;
//     if (repeatPeriod === "days") period = 1;
//     if (repeatPeriod === "weeks") period = 7;
//     if (repeatPeriod === "monthes") period = 30;
//     if (repeatPeriod === "years") period = 365;

//     // calculate repetition count
//     let repCount;
//     if (
//       !document.querySelector(".input--new-repeat-count") ||
//       document.querySelector(".input--new-repeat-count").value === ""
//     ) {
//       repCount = null;
//     } else {
//       repCount = document.querySelector(".input--new-repeat-count").value;
//     }
//     const newRepeatCount = repCount * period;

//     // create new task
//     let task = new Task(
//       newTaskTitle,
//       newTaskDate,
//       newTaskCat,
//       newTaskDescription,
//       newRepeatCount
//     );

//     // add new task to all tasks array
//     this.#allTasks.push(task);

//     // show all tasks unsorted from current category
//     this._renderAllTasks(false, newTaskCat);

//     // delete no task messages
//     document.querySelectorAll(".message--no-task").forEach((el) => el.remove());

//     // cleaning form inputs
//     document.querySelector(".input--new-title").value =
//       document.querySelector(".input--new-date").value =
//       document.querySelector(".input--new-cat").value =
//       document.querySelector(".input--new-des").value =
//         "";
//     document.querySelector(".input--new-repeat-count")
//       ? (document.querySelector(".input--new-repeat-count").value = "")
//       : "";
//     const el = document.querySelector(".form__field--repeat");
//     if (el) el.remove();

//     // hide new form
//     this._hideShowNewForm(e);

//     // save to localStorage
//     this._setLocalStorage();

//     // set category selection to current category
//     selectCategory.value = newTaskCat;
//   }
//   _hideShowNewForm(e) {
//     e.preventDefault();

//     // hide and show sections
//     btnThemeToggle.classList.toggle("hidden");
//     boxCat.classList.toggle("hidden");
//     tabsBodyTasksLists.classList.toggle("hidden");
//     document.querySelector(".tabs__list").classList.toggle("hidden");
//     buttons.classList.toggle("hidden");
//     tabsBodyNew.classList.toggle("hidden");

//     // add or remove max-hight
//     container.classList.toggle("container--max-height");
//     tabs.classList.toggle("tabs--max-height");

//     // focus on title
//     document.querySelector(".input--new-title").focus();

//     // create new category list for new forms from all categories array
//     if (tabsBodyTasksLists.classList.contains("hidden")) {
//       this._createCatsList(inputNewCat);
//       inputNewCat.value = this.#currentCat;
//     }

//     // remove new category form and styles if user click on new task btn
//     if (!formCategory.classList.contains("hidden")) {
//       formCategory.classList.add("hidden");
//       selectCategory.classList.remove("hidden");
//       btnCategoryAdd.classList.remove("rotate-z");
//     }

//     // cleaning new form inputs
//     if (tabsBodyNew.classList.contains("hidden")) {
//       document.querySelector(".input--new-title").value =
//         document.querySelector(".input--new-date").value =
//         document.querySelector(".input--new-cat").value =
//         document.querySelector(".input--new-des").value =
//           "";
//       document.querySelector(".input--new-repeat-count")
//         ? (document.querySelector(".input--new-repeat-count").value = "")
//         : "";

//       document.querySelector(".input--new-date").type = "text";
//       const el = document.querySelector(".form__field--repeat");
//       if (el) el.remove();
//     }
//   }
//   _hideShowEditForm(e) {
//     e.preventDefault();

//     // hide and show sections
//     btnThemeToggle.classList.toggle("hidden");
//     boxCat.classList.toggle("hidden");
//     tabsBodyTasksLists.classList.toggle("hidden");
//     document.querySelector(".tabs__list").classList.toggle("hidden");
//     buttons.classList.toggle("hidden");
//     tabsBodyEdit.classList.toggle("hidden");

//     // add or remove max-hight
//     container.classList.toggle("container--max-height");
//     tabs.classList.toggle("tabs--max-height");

//     // create new category list for edit form from all categories array
//     if (tabsBodyTasksLists.classList.contains("hidden")) {
//       this._createCatsList(inputEditCat);
//       inputNewCat.value = this.#currentCat;
//     }

//     // remove new category form and styles if user click on new task btn
//     if (!formCategory.classList.contains("hidden")) {
//       formCategory.classList.add("hidden");
//       selectCategory.classList.remove("hidden");
//       btnCategoryAdd.classList.remove("rotate-z");
//     }
//   }
//   _renderTask(task, status = false, search = false) {
//     const options = { month: "numeric", day: "numeric" };
//     const intlDate = task.date
//       ? new Intl.DateTimeFormat("en-US", options).format(new Date(task.date))
//       : "";

//     const isLate =
//       +new Date(task.date) / (1000 * 60 * 60 * 24) + 1 <
//       +new Date() / (1000 * 60 * 60 * 24);

//     let html = `
//       <div class="checkbox__body" data-id="${task.id}">
//         <input type="checkbox" ${
//           status === false ? "" : "checked"
//         } class="checkbox__input">

//         <div class="checkbox__label-title">${task.title}</div>

//         <div class="checkbox__label-date
//         ${isLate && !status ? "checkbox__label-late" : ""}">
//         ${status === false ? this._remainDays(task.date) : intlDate}</div>

//       </div>
//     `;

//     if (search) {
//       tabsBodySearchRes.insertAdjacentHTML("beforeend", html);
//     } else {
//       status === false
//         ? tabsBodyTasksUndone.insertAdjacentHTML("beforeend", html)
//         : tabsBodyTasksDone.insertAdjacentHTML("beforeend", html);
//     }
//   }
//   _renderAllTasks(sorted = false, cat) {
//     // clean undone and done tasks lists
//     document
//       .querySelectorAll(".tabs__body--tasks-list")
//       .forEach((list) => (list.innerHTML = ""));

//     // sort lists
//     let allTasks = sorted
//       ? this.#allTasks
//           .slice()
//           .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
//       : this.#allTasks;

//     // filter all tasks with current category
//     allTasks = allTasks.filter((task) => task.cat === cat);
//     let doneCount = 0;
//     let undoneCount = 0;

//     // show all tasks
//     allTasks.forEach((task) => {
//       this._renderTask(task, task.status);

//       // calc done count and undone count
//       task.status ? doneCount++ : undoneCount++;
//     });

//     if (allTasks.length === 0) {
//       let text = `<div class="message--no-task">All tasks are done!</div>`;
//       let text2 = `<div class="message--no-task">No task has been done!!</div>`;
//       tabsBodyTasksUndone.insertAdjacentHTML("afterbegin", text);
//       tabsBodyTasksDone.insertAdjacentHTML("afterbegin", text2);
//     }
//     if (doneCount === 0 && undoneCount === 0) {
//       tabsDoneCount.textContent = "";
//       tabsUndoneCount.textContent = "";
//     } else {
//       tabsDoneCount.textContent = doneCount;
//       tabsUndoneCount.textContent = undoneCount;
//     }
//   }
//   _delTask(e) {
//     e.preventDefault();
//     if (confirm("Are you sure you want to delete this task")) {
//       // delete "THAT" task from all tasks array
//       this.#allTasks.splice(
//         this.#allTasks.findIndex((task) => task.id === this.#currentId),
//         1
//       );

//       // save all tasks to local storage
//       this._setLocalStorage();

//       // show all tasks
//       this._renderAllTasks(false, this.#currentCat);

//       // hide edit form
//       this._hideShowEditForm(e);
//     }
//   }
//   _saveEdit(e) {
//     e.preventDefault();

//     // check for alerts
//     // no title alert
//     if (document.querySelector(".input--edit-title").value === "")
//       return this._alertError("no task title");

//     // no date alert
//     if (
//       document.querySelector(".input--edit-repeat-count") &&
//       document.querySelector(".input--edit-date").value === ""
//     )
//       return this._alertError("no task date");

//     // wrong repetition count
//     if (document.querySelector(".input--edit-repeat-count")?.value <= 0)
//       return this._alertError("wrong repeat count");

//     // collect data from form inputs
//     const task = this.#allTasks.find((task) => task.id === this.#currentId);
//     task.title = document.querySelector(".input--edit-title").value;
//     task.date = document.querySelector(".input--edit-date").value;
//     task.cat = document.querySelector(".input--edit-cat").value;
//     task.description = document.querySelector(".input--edit-des").value;

//     // calculate repetition count
//     const repeatPeriod = document.querySelector(".select--edit-period")?.value;
//     let period;
//     if (repeatPeriod === "days") period = 1;
//     if (repeatPeriod === "weeks") period = 7;
//     if (repeatPeriod === "monthes") period = 30;
//     if (repeatPeriod === "years") period = 365;

//     task.repeatCount =
//       document.querySelector(".input--edit-repeat-count")?.value * period;

//     // save the task in local storage
//     this._setLocalStorage();

//     // show all tasks
//     this._renderAllTasks(false, this.#currentCat);

//     // hide edit form
//     this._hideShowEditForm(e);
//   }
//   _addRepetition(value) {
//     const el = document.querySelector(".form__field--repeat");

//     // find the status is "new" or "edit"
//     let status;
//     if (!tabsBodyNew.classList.contains("hidden")) {
//       status = "new";
//     } else {
//       status = "edit";
//     }

//     // change repeat btn style and text
//     if (value > 0) {
//       if (el) {
//         el.remove();
//       }
//       btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
//       btnEditRep.classList.add("move-repeat");
//     } else {
//       if (el) {
//         btnNewRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
//         btnNewRep.classList.remove("move-repeat");
//         btnEditRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
//         btnEditRep.classList.remove("move-repeat");
//         return el.remove();
//       }
//       btnNewRep.innerHTML = `<i class="far fa-times"></i>`;
//       btnNewRep.classList.add("move-repeat");
//       btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
//       btnEditRep.classList.add("move-repeat");
//     }

//     // element of repeation
//     let html = `
//       <div class="form__field form__field--repeat">
//       <i class="far fa-repeat-alt form__label"></i><span class="form__label form__label--rep">Every</span>
//         <input class="input input--repeat-count input--${status}-repeat-count" type="number" min="1" max="1000" placeholder=""
//         value= ${value ? value : ""} />
//         <select class="select--period select--${status}-period ">
//           <option value="days">days</option>
//           <option value="weeks">weeks</option>
//           <option value="monthes">monthes</option>
//           <option value="years">years</option>
//         </select>

//       </div>

//     `;

//     // find exact place to implement
//     let place = !tabsBodyNew.classList.contains("hidden")
//       ? ".field--new-date"
//       : ".field--edit-date";
//     document.querySelector(place).insertAdjacentHTML("afterend", html);
//   }
//   _saveToGcal() {
//     const title = document.querySelector(".input--new-title").value;
//     const date = new Date(document.querySelector(".input--new-date").value);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, 0);
//     const day = String(date.getDate()).padStart(2, 0);
//     const des = document.querySelector(".input--new-des").value;
//     // let link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${des}&dates=${year}${month}${day}T110000Z%2F${year}${month}${day}T110100Zhttps://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${des}&dates=${year}${month}${day}T110000Z%2F${year}${month}${day}T110100Z`;
//     let link = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${year}${month}${day}%2F${year}${month}${day}&details=${des}&location=&text=${title}`;
//     window.open(link, "_blank");
//   }

//   // Search functions
//   _searchTask() {
//     // clean past data from html
//     tabsBodySearchRes.innerHTML = "";

//     // find all tasks match the search word
//     if (inputSearch.value !== "") {
//       const resTasks = this.#allTasks.filter((task) =>
//         task.title.includes(inputSearch.value)
//       );
//       resTasks.forEach((task) => this._renderTask(task, false, true));
//     }
//   }
//   _hideShowSearchForm(e) {
//     e.preventDefault();

//     // hide sections
//     btnThemeToggle.classList.toggle("hidden");
//     boxCat.classList.toggle("hidden");
//     tabsBodyTasksLists.classList.toggle("hidden");
//     buttons.classList.toggle("hidden");
//     document.querySelector(".tabs__list").classList.toggle("hidden");
//     tabsBodySearch.classList.toggle("hidden");
//     tabsBodySearchRes.classList.toggle("hidden");

//     // clean past search and focus on search input
//     inputSearch.value = "";
//     inputSearch.focus();
//     tabsBodySearchRes.innerHTML = "";

//     // add max and min height
//     container.classList.toggle("container--max-height");

//     // remove new category form and styles if user click on new task btn
//     if (!formCategory.classList.contains("hidden")) {
//       formCategory.classList.add("hidden");
//       selectCategory.classList.remove("hidden");
//       btnCategoryAdd.classList.remove("rotate-z");
//     }
//   }

//   // tasks list functions
//   _checkTask(e) {
//     const taskEl = e.target.closest(".checkbox__body");
//     if (!taskEl) return;

//     // find "THAT" task
//     const task = this.#allTasks.find((task) => task.id === taskEl.dataset.id);

//     // checkbox part
//     if (e.target.classList.contains("checkbox__input")) {
//       // change task status
//       task.status = !task.status;

//       // play audio if status is done
//       const checkboxAudio = document.querySelector("audio");
//       if (task.status) checkboxAudio.play();

//       // create date of complitition
//       task.doneDate = new Date();

//       // disappear task
//       taskEl.remove();

//       // create a new task if there is repeation and the status is done
//       if (task.status && task.repeatCount > 0) {
//         let newtask = new Task(
//           task.title,
//           new Date(
//             new Date(task.date).getTime() +
//               task.repeatCount * 24 * 60 * 60 * 1000
//           ),
//           task.cat,
//           task.description,
//           task.repeatCount
//         );

//         // save new task to all tasks array
//         this.#allTasks.push(newtask);
//       }

//       // save  to localStorage
//       this._setLocalStorage();

//       // show all tasks unsorted with 1 second delay
//       setTimeout(function () {
//         app._renderAllTasks(false, app.#currentCat);
//       }, 1000);

//       return;
//     }

//     // edit part
//     // show edit form
//     this._hideShowEditForm(e);

//     // fill edit form inputs
//     document.querySelector(".input--edit-title").value = task.title;
//     document.querySelector(".input--edit-date").valueAsDate = new Date(
//       task.date
//     );
//     document.querySelector(".input--edit-des").value = task.description;
//     if (task.repeatCount > 0) {
//       this._addRepetition(task.repeatCount);
//     } else {
//       if (document.querySelector(".form__field--repeat"))
//         document.querySelector(".form__field--repeat").remove();
//     }
//     inputEditCat.value = task.cat;
//     this.#currentId = task.id;

//     if (document.querySelector(".form__field--done-date"))
//       document.querySelector(".form__field--done-date").remove();

//     // add complitition to edit form
//     if (task.status) {
//       // add done date to task
//       task.doneDate = new Date(task.doneDate);

//       const options = {
//         month: "numeric",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//       };
//       const intlDate = new Intl.DateTimeFormat("en-US", options).format(
//         task.doneDate
//       );

//       let htmlEl = `
//             <div class="form__field form__field--done-date">
//             <i class="far fa-check-circle form__label"></i>
//               <label class="form__label--done-date">Completed on ${intlDate}</label>
//             </div>
//           `;
//       document
//         .querySelector(".field--edit-cat")
//         .insertAdjacentHTML("beforebegin", htmlEl);
//     }
//   }
//   _changeTab(e) {
//     const target = e.target.closest(".tabs__item");

//     // check if clicked tab is current tab
//     if (!target.classList.contains("tabs--active")) {
//       // delete class "active--tab" from all tabs
//       document
//         .querySelectorAll(".tabs__item")
//         .forEach((tab) => tab.classList.remove("tabs--active"));

//       // add class "active--tab" to target tab
//       target.classList.add("tabs--active");

//       // show active tab's list
//       document
//         .querySelectorAll(".tabs__body--tasks-list")
//         .forEach((list) => list.classList.toggle("hidden"));

//       // show all tasks
//       this._renderAllTasks(false, this.#currentCat);
//     }
//   }
//   _sortList() {
//     this.#sorted = !this.#sorted;
//     this._renderAllTasks(this.#sorted, this.#currentCat);
//   }
//   _remainDays(date) {
//     // if there is no date, return nothing
//     if (!date) return "";

//     // create date from task's date and now
//     const now = +new Date();
//     const taskDate = new Date(date);

//     // calculate days between task's date and now
//     const remDays = Math.trunc(
//       (taskDate.getTime() - now) / (1000 * 60 * 60 * 24)
//     );

//     // retrun text or remain days
//     if (remDays < -1)
//       return new Intl.DateTimeFormat("en-US", {
//         month: "numeric",
//         day: "numeric",
//       }).format(taskDate);
//     if (remDays === -1) return "Yesterday";
//     if (remDays === 0) return "Today";
//     if (remDays === 1) return "Tomorrow";
//     if (remDays < 7)
//       return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
//         taskDate
//       );
//     if (remDays >= 7)
//       return new Intl.DateTimeFormat("en-US", {
//         month: "numeric",
//         day: "numeric",
//       }).format(taskDate);
//   }

//   // message functions
//   _alertError(err, showBtns) {
//     // add an overlay layer to whole view
//     overlay.classList.remove("hidden");

//     // remove hidden class form message
//     document.querySelector(".message").classList.remove("hidden");

//     // switch errors
//     let msg;
//     switch (err) {
//       case "no task title":
//         msg = "Please enter a title.";
//         break;
//       case "no task date":
//         msg = "Please enter a date.";
//         break;
//       case "wrong repeat count":
//         msg = "Please enter a positive number to repeat count.";
//         break;
//       case "delete main":
//         msg = `You can't delete "Main" category!`;
//         break;
//       case "duplicate cat":
//         msg = `This category is already exist!`;
//         break;
//       case "confirm to delete task":
//         msg = `Are you sure you want to delete this task?

//         `;
//         break;
//     }

//     let msgEl = `<div class="message__body--text">${msg}</div>`;
//     document
//       .querySelector(".message__body")
//       .insertAdjacentHTML("afterbegin", msgEl);

//     if (showBtns) messageBtns.classList.remove("hidden");
//   }
//   _closeMessage() {
//     document.querySelector(".overlay").classList.add("hidden");
//     document.querySelector(".message").classList.add("hidden");
//     document.querySelector(".message__body--text").remove();
//     messageBtns.classList.add("hidden");
//   }

//   // theme functions
//   _changeTheme() {
//     let theme;
//     if (prefersDarkScheme.matches) {
//       document.body.classList.toggle("light-theme");
//       theme = document.body.classList.contains("light-theme")
//         ? "light"
//         : "dark";
//     } else {
//       document.body.classList.toggle("dark-theme");
//       theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
//     }

//     // change theme icon
//     document.querySelector(".fa-sun").classList.toggle("hidden");
//     document.querySelector(".fa-moon").classList.toggle("hidden");

//     // save current theme to local storage
//     localStorage.setItem("theme", theme);
//   }
// }

// const app = new App();

const controlNewTask = function () {
  taskView.render();

  taskView.updateCategories(model.state.allCats, model.state.curCat);
};
const controlAddRepeat = function () {
  taskView.repeat();
};

const controlClose = function () {
  taskView.close();
};

const controlSaveTask = function () {
  const data = taskView.save();
  taskView.close();
  model.newTask(data);
  categoryView.changeCat(model.state.curCat);
  listView.renderAllTasks(model.state.allTasks, false, model.state.curCat);
};

const controlChangeTab = function (e) {
  listView.changeTab(e);
  listView.renderAllTasks(model.state.allTasks, false, model.state.curCat);
};

const controlCheckTask = function (id) {
  model.checkTask(id);
  // show all tasks on selected category
  listView.renderAllTasks(model.state.allTasks, false, model.state.curCat);

  model.checkRepeat(id);

  setTimeout(function () {
    listView.renderAllTasks(model.state.allTasks, false, model.state.curCat);
  }, 1000);
};

const controlEditTask = function (id) {
  const task = model.editTask(id);

  taskView.render(task);
  if (task.repeatCount > 0) {
    taskView.repeat(task);
  } else {
    taskView.repeat();
    taskView.repeat();
  }
  taskView.updateCategories(model.state.allCats, task.cat);
};

const controlDelete = function (id) {
  if (model.deleteTask(id)) {
    taskView.close();
    listView.renderAllTasks(model.state.allTasks, false, model.state.curCat);
  }
};

// category section
const controlNewCategory = function () {
  categoryView.showCatForm();
};
const controlSaveCat = function () {
  // recieve data from categoryView
  const newCat = categoryView.newCategory();

  // check new category in model
  const newCatModel = model.newCat(newCat);
  if (!newCatModel) return;

  // update category list
  categoryView.updateCategories(model.state.allCats, model.state.curCat);

  // change category
  controlChangeCat(newCatModel);

  // hide new category form
  categoryView.showCatForm();
};
const controlChangeCat = function (cat = "Main") {
  // change category
  categoryView.changeCat(cat);

  // save current category
  model.state.curCat = cat;

  // show all tasks on selected category
  listView.renderAllTasks(model.state.allTasks, false, model.state.curCat);
};
const controlDelCat = function (cat) {
  model.delCat(cat);
  categoryView.updateCategories(model.state.allCats, model.state.curCat);

  controlChangeCat();
};

// search section
const controlSearchBtn = function () {
  searchView.render();
};
const controlSearchWord = function () {
  const word = searchView.searchWord();
  if (!word) return;
  model.searchTask(word);

  model.state.search.forEach((task) => {
    listView._renderTask(task, true);
  });
};

const controlCloseSearch = function () {
  searchView.close();
};

// sort
const controlSort = function () {
  const sort = !model.sort;
  listView.renderAllTasks(model.state.allTasks, sort, model.state.curCat);
  model.sort = sort;
};

// theme
const controlTheme = function () {
  const newTheme = model.theme();
  themeView.changeTheme(newTheme);
};

//gcal
const controlGcal = function () {
  taskView.saveToGcal();
};

//////////////////////////
const init = function () {
  // load data from local storage
  model.getLocalStorage();

  // change theme depending on last theme
  themeView.changeTheme(model.state.theme);

  // show all tasks unsorted, category = "Main"
  listView.renderAllTasks(model.state.allTasks, false, model.state.curCat);

  // update all categories
  categoryView.updateCategories(model.state.allCats, model.state.curCat);

  // new task form
  listView.addHandlerNewButton(controlNewTask);

  // change tab
  listView.addHandlerChangeTab(controlChangeTab);

  // change cat
  categoryView.addHandlerChangeCat(controlChangeCat);

  // new cat
  categoryView.addHandlerBtnCat(controlNewCategory);
  categoryView.addHandlerSaveCat(controlSaveCat);

  // delete cat
  categoryView.addHandlerDelCat(controlDelCat);

  // add repeat section
  taskView.addHandlerRepeat(controlAddRepeat);

  // close form
  taskView.addHandlerClose(controlClose);

  // check task
  listView.addHandlerCheck(controlCheckTask);

  // edit task
  listView.addHandlerEdit(controlEditTask);

  // search btn
  listView.addHandlerSearchButton(controlSearchBtn);

  //close search
  searchView.addHandlerCloseSearch(controlCloseSearch);

  //
  searchView.addHandlerSearch(controlSearchWord);

  // sort
  listView.addHandlerSort(controlSort);

  // theme
  themeView.addHandlerTheme(controlTheme);

  // gcal
  taskView.addHandlerGcal(controlGcal);

  // save new task
  taskView.addHandlerSave(controlSaveTask);
  // delete task
  taskView.addHandlerDelete(controlDelete);
};

init();
