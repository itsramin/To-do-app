export const state = {
  allTasks: [],
  allCats: ["Main", "a"],
  curCat: "Main",
  task: {},
  search: {
    query: "",
    results: [],
  },
};

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

export const newTask = function (data) {
  state.curCat = data[2];
  const id = data[5];
  if (!id) {
    let task = new Task(...data);
    state.allTasks.push(task);
  } else {
    const task = state.allTasks.find((task) => task.id === id);
    task.title = data[0];
    task.date = data[1];
    task.cat = data[2];
    task.description = data[3];
    task.repeatCount = data[4];
  }

  _setLocalStorage();
  return state;
};

// category section
export const newCat = function (newCat) {
  // formate new category to capital
  const newCateFormatted =
    newCat.at(0).toUpperCase() + newCat.slice(1).toLowerCase();

  // check for duplicate category name
  if (!state.allCats.some((cat) => cat === newCateFormatted)) {
    // add new category to all categories array
    state.allCats.push(newCateFormatted);

    //   // hide category from
    //   this._hideShowCatForm(e);

    // save to local storage
    _setLocalStorage();

    //   // create new category list
    //   this._createCatsList(selectCategory);

    // // set category selection to new category
    // this.selectCategory.value = newCateFormatted;

    // // show new category tasks
    // this.changeCat();

    return newCateFormatted;
  } else {
    //   this._alertError("duplicate cat");
    console.log("duplicate cat");
  }
};
export const delCat = function (cat) {
  // check if user is deleting main category
  if (cat !== "Main") {
    if (confirm(`Are you sure you want to delete "${cat}" list?`)) {
      // delete "THAT" category from all categories array
      state.allCats.splice(
        state.allCats.findIndex((c) => c === cat),
        1
      );

      // set tasks' category was "THAT" category to "main" category
      state.allTasks.forEach((task) => {
        if (task.cat === cat) task.cat = "Main";
      });

      //   // save to local storage
      _setLocalStorage();

      //   // create new category list
      //   this._createCatsList(selectCategory);

      //   // create new category list for new and edit forms
      //   this._createCatsList(inputNewCat);
      //   this._createCatsList(inputEditCat);

      //   // show category tasks
      //   this._changeCat(e);
    }
  } else {
    // return this._alertError("delete main");
    console.log("erorr delete cat");
  }
};

// localStorage functions
const _setLocalStorage = function () {
  localStorage.setItem("allTasks", JSON.stringify(state.allTasks));
  localStorage.setItem("allCats", JSON.stringify(state.allCats));
};
export const getLocalStorage = function () {
  //  get last theme color from local storage and set it to site's theme
  //   if (currentTheme === "dark") {
  //     document.body.classList.toggle("dark-theme");
  //     document.querySelector(".fa-moon").classList.add("hidden");
  //     document.querySelector(".fa-sun").classList.remove("hidden");
  //   } else if (currentTheme === "light") {
  //     document.body.classList.toggle("light-theme");
  //     document.querySelector(".fa-sun").classList.add("hidden");
  //     document.querySelector(".fa-moon").classList.remove("hidden");
  //   }

  //   // show messages for empty lists
  //   if (this.#allTasks.length === 0) {
  //     let textMsg = `<div class="message--no-task">All tasks are done !</div>`;
  //     let textMsg2 = `<div class="message--no-task">No task has been done !</div>`;
  //     tabsBodyTasksUndone.insertAdjacentHTML("afterbegin", textMsg);
  //     tabsBodyTasksDone.insertAdjacentHTML("afterbegin", textMsg2);
  //   }

  // recive all tasks from local storage
  const data = JSON.parse(localStorage.getItem("allTasks"));
  if (!data) return;
  state.allTasks = data;

  // recive all categories  from local storage
  const data2 = JSON.parse(localStorage.getItem("allCats"));

  if (Array.isArray(data2) && data2.length === 0) return;
  // save all tasks and categories to variables
  state.allCats = data2;

  //   // create category list from all categories
  //   this._createCatsList(selectCategory);

  //   // set current category to categoy selection value
  //   this.#currentCat = selectCategory.value;
};

//
export const checkTask = function (id) {
  const task = state.allTasks.find((task) => task.id === id);
  task.status = !task.status;

  // save in local storage
  _setLocalStorage();
};

export const editTask = function (id) {
  const task = state.allTasks.find((task) => task.id === id);
  return task;
};

export const deleteTask = function (id) {
  if (confirm("Are you sure you want to delete this task?")) {
    const index = state.allTasks.findIndex((task) => task.id === id);
    state.allTasks.splice(index, 1);

    _setLocalStorage();
    return true;
  }
};

export const searchTask = function (word) {
  const resTasks = state.allTasks.filter((task) => task.title.includes(word));
  return resTasks;
};
