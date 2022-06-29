import View from "./view.js";
import { formatDate } from "../helper.js";

class ListView extends View {
  _parentEl = document.querySelector(".tabs__body--tasks-lists");

  _remainDays(date) {
    // if there is no date, return nothing
    if (!date) return "";

    // create date from task's date and now
    const now = +new Date();
    const taskDate = new Date(date);

    // calculate days between task's date and now
    const remDays = Math.ceil(
      (taskDate.getTime() - now) / (1000 * 60 * 60 * 24)
    );

    // retrun text or remain days
    if (remDays < -1) return formatDate(taskDate);
    if (remDays === -1) return "Yesterday";
    if (remDays === 0) return "Today";
    if (remDays === 1) return "Tomorrow";
    if (remDays < 7) return formatDate(taskDate, "weekday");
    if (remDays >= 7) return formatDate(taskDate);
  }
  _renderTask(task, search = false) {
    new Date(task.date);
    const intlDate = task.date ? formatDate(new Date(task.date)) : "";
    const status = task.status;

    const isLate =
      +new Date(task.date) / (1000 * 60 * 60 * 24) + 1 <
      +new Date() / (1000 * 60 * 60 * 24);

    let html = `
      <div class="checkbox__body" data-id="${task.id}">
        <input type="checkbox" ${
          status === false ? "" : "checked"
        } class="checkbox__input">

        <div class="checkbox__label-title">${task.title}</div>

        <div class="checkbox__label-date
        ${isLate && !status ? "checkbox__label-late" : ""}">
        ${!status ? this._remainDays(task.date) : intlDate}</div>

      </div>
    `;
    // console.log(tabsBodyTasksUndone);
    // ${status === false ? this._remainDays(task.date) : intlDate}</div>
    if (search) {
      this.tabsBodySearchRes.insertAdjacentHTML("beforeend", html);
    } else {
      status === false
        ? this.tabsBodyTasksUndone.insertAdjacentHTML("beforeend", html)
        : this.tabsBodyTasksDone.insertAdjacentHTML("beforeend", html);
    }
  }
  renderAllTasks(tasks, sorted = false, cat = "Main") {
    // clean undone and done tasks lists
    document
      .querySelectorAll(".tabs__body--tasks-list")
      .forEach((list) => (list.innerHTML = ""));

    // sort lists
    let allTasks = sorted
      ? tasks.slice().sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
      : tasks;

    // filter all tasks with current category
    allTasks = allTasks.filter((task) => task.cat === cat);
    let doneCount = 0;
    let undoneCount = 0;

    // show all tasks
    allTasks.forEach((task) => {
      this._renderTask(task);

      // calc done count and undone count
      task.status ? doneCount++ : undoneCount++;
    });

    if (allTasks.length === 0) {
      let text = `<div class="message--no-task">All tasks are done!</div>`;
      let text2 = `<div class="message--no-task">No task has been done!!</div>`;
      this.tabsBodyTasksUndone.insertAdjacentHTML("afterbegin", text);
      this.tabsBodyTasksDone.insertAdjacentHTML("afterbegin", text2);
    }
    if (doneCount === 0 && undoneCount === 0) {
      this.tabsDoneCount.textContent = "";
      this.tabsUndoneCount.textContent = "";
    } else {
      this.tabsDoneCount.textContent = doneCount;
      this.tabsUndoneCount.textContent = undoneCount;
    }
  }
  changeTab(e) {
    const target = e.target.closest(".tabs__item");

    // check if clicked tab is current tab
    if (!target.classList.contains("tabs--active")) {
      // delete class "active--tab" from all tabs
      document
        .querySelectorAll(".tabs__item")
        .forEach((tab) => tab.classList.remove("tabs--active"));

      // add class "active--tab" to target tab
      target.classList.add("tabs--active");

      // show active tab's list
      document
        .querySelectorAll(".tabs__body--tasks-list")
        .forEach((list) => list.classList.toggle("hidden"));
    }
  }

  // handlers
  addHandlerChangeTab(handler) {
    this.tabsList.addEventListener("click", function (e) {
      e.preventDefault();
      handler(e);
    });
  }
  addHandlerCheck(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".checkbox__input");
      if (!btn) return;
      const id = e.target.closest(".checkbox__body").dataset.id;

      // play audio if status is done
      const checkboxAudio = document.querySelector("audio");
      if (btn.checked) checkboxAudio.play();

      handler(id);
    });
  }
  addHandlerEdit(handler) {
    this._parentEl.addEventListener("click", function (e) {
      if (e.target.classList.contains("checkbox__input")) return;
      const btn = e.target.closest(".checkbox__body");
      if (!btn) return;
      const id = e.target.closest(".checkbox__body").dataset.id;

      handler(id);
    });
  }
  addHandlerNewButton(handler) {
    this.btnNew.addEventListener("click", handler);
  }
  addHandlerSearchButton(handler) {
    this.btnSearch.addEventListener("click", handler);
  }
  addHandlerSort(handler) {
    this.btnSort.addEventListener("click", handler);
  }
}

export default new ListView();
