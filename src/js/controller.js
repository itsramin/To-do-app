"use strict";

import taskView from "./view/taskView.js";
import * as model from "./model.js";
import listView from "./view/listView.js";
import categoryView from "./view/categoryView.js";
import searchView from "./view/searchView.js";
import themeView from "./view/themeView.js";

// tasks section
const controlNewTask = function () {
  taskView.render();

  taskView.updateCategories(model.state.allCats, model.state.curCat);
};
const controlSaveTask = function () {
  const data = taskView.save();
  taskView.close();
  model.newTask(data);
  categoryView.changeCat(model.state.curCat);
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
const controlDelete = function () {
  if (!model.state.curId) return;
  model.deleteTask(model.state.curId);
  taskView.close();
  taskView.closeMessage();
  listView.renderAllTasks(model.state.allTasks, false, model.state.curCat);
};
const controlGcal = function () {
  taskView.saveToGcal();
};
const controlAddRepeat = function () {
  taskView.repeat();
};
const controlClose = function () {
  taskView.close();
};

// tab section
const controlChangeTab = function (e) {
  listView.changeTab(e);
  listView.renderAllTasks(model.state.allTasks, false, model.state.curCat);
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
  if (!newCatModel) return categoryView.renderMessage("duplicate cat");

  // update category list
  categoryView.updateCategories(model.state.allCats, model.state.curCat);

  // change category
  controlChangeCat(newCatModel);

  // hide new category form
  categoryView.showCatForm();
};
const controlChangeCat = function (cat) {
  // change category
  categoryView.changeCat(cat);

  // save current category
  model.state.curCat = cat;

  // show all tasks on selected category
  listView.renderAllTasks(model.state.allTasks, false, model.state.curCat);
};
const controlDelCat = function () {
  if (model.state.curId) return;
  const cat = model.state.curCat;
  if (model.delCat(cat)) {
    categoryView.closeMessage();
    model.state.curCat = "Main";
    categoryView.updateCategories(model.state.allCats, model.state.curCat);

    controlChangeCat(model.state.curCat);
  } else {
    return categoryView.renderMessage("delete main");
  }
};

// search section
const controlSearchWord = function () {
  const word = searchView.searchWord();
  if (!word) return;
  model.searchTask(word);

  model.state.search.forEach((task) => {
    listView._renderTask(task, true);
  });
};
const controlSearchBtn = function () {
  searchView.render();
};
const controlCloseSearch = function () {
  searchView.close();
};

// sort
const controlSort = function () {
  const sort = !model.state.sort;
  listView.renderAllTasks(model.state.allTasks, sort, model.state.curCat);
  model.state.sort = sort;
};

// theme
const controlTheme = function () {
  const newTheme = model.theme();
  themeView.changeTheme(newTheme);
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
  categoryView.addHandlerDelCat(categoryView.renderMessage);
  categoryView.addHandlerCheckAnswer(controlDelCat, categoryView.closeMessage);

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

  // search
  searchView.addHandlerSearch(controlSearchWord);

  // sort
  listView.addHandlerSort(controlSort);

  // theme
  themeView.addHandlerTheme(controlTheme);

  // gcal
  taskView.addHandlerGcal(controlGcal);

  // save new task
  taskView.addHandlerSave(controlSaveTask, taskView.renderMessage);

  // delete task
  taskView.addHandlerDelete(taskView.renderMessage);
  taskView.addHandlerCheckAnswer(controlDelete, taskView.closeMessage);

  // task close errors
  taskView.addHandlercloseMessage(taskView.closeMessage);
};

init();
