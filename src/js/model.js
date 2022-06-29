export const state = {
  allTasks: [],
  allCats: ["Main"],
  curCat: "Main",
  sort: false,
  theme: "light",
  task: {},
  search: [],
};

class Task {
  id = (Date.now() + "").slice(-10);
  doneDate;
  constructor(
    title,
    date,
    cat,
    description = "",
    repeatCount = 0,
    period = ""
  ) {
    this.title = title;
    this.date = date;
    this.cat = cat;
    this.description = description;
    this.status = false;
    this.repeatCount = repeatCount;
    this.period = period;
  }
}

// export const newTask = function (data) {
//   state.curCat = data[2];
//   const id = data[5];
//   if (!id) {
//     let task = new Task(...data);
//     state.allTasks.push(task);
//   } else {
//     const task = state.allTasks.find((task) => task.id === id);
//     task.title = data[0];
//     task.date = data[1];
//     task.cat = data[2];
//     task.description = data[3];
//     task.repeatCount = data[4];
//   }

//   _setLocalStorage();
//   return state;
// };
export const newTask = function (data) {
  state.curCat = data.cat;
  const id = data.id;

  if (!id) {
    let task = new Task(
      data.title,
      data.date,
      data.cat,
      data.description,
      data.repeatCount,
      data.period
    );

    state.allTasks.push(task);
  } else {
    const task = state.allTasks.find((task) => task.id === id);
    (task.title = data.title),
      (task.date = data.date),
      (task.cat = data.cat),
      (task.description = data.description),
      (task.repeatCount = data.repeatCount),
      (task.period = data.period);
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

    // save to local storage
    _setLocalStorage();

    return newCateFormatted;
  } else {
    //   this._alertError("duplicate cat");
    return false;
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

      // save to local storage
      _setLocalStorage();
    }
  } else {
    return false;
  }
};

// localStorage functions
const _setLocalStorage = function () {
  localStorage.setItem("allTasks", JSON.stringify(state.allTasks));
  localStorage.setItem("allCats", JSON.stringify(state.allCats));
};
export const getLocalStorage = function () {
  const themeDate = localStorage.getItem("theme");
  state.theme = themeDate ? themeDate : "light";

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
};

export const checkRepeat = function (id) {
  const task = state.allTasks.find((task) => task.id === id);
  // check if there is a repeat
  if (task.repeatCount > 0 && task.status) {
    let period;
    if (task.period === "days") period = 1;
    if (task.period === "weeks") period = 7;
    if (task.period === "monthes") period = 30;
    if (task.period === "years") period = 365;

    let repTask = new Task(
      task.title,
      new Date(
        +new Date(task.date) + period * task.repeatCount * 24 * 60 * 60 * 1000
      ),
      task.cat,
      task.description,
      task.repeatCount,
      task.period
    );
    state.allTasks.push(repTask);
  }

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
  state.search = state.allTasks.filter((task) => task.title.includes(word));
};

export const theme = function () {
  state.theme = state.theme === "dark" ? "light" : "dark";

  // save current theme to local storage
  localStorage.setItem("theme", state.theme);

  return state.theme;
};
