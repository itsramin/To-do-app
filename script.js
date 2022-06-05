"use strict";

const tabs = document.querySelector(".tabs");
const btnNew = document.querySelector(".btn--new");
const tasksLists = document.querySelector(".tasks--lists");
const formNew = document.querySelector(".new--task--form");
const listGroup = document.querySelector(".list-group");

class App {
  constructor() {}
}

const app = new App();

const displayNewForm = function () {
  tasksLists.classList.add("hidden");
  tabs.classList.add("hidden");
  listGroup.classList.add("hidden");
  formNew.classList.remove("hidden");
};

tabs.addEventListener("click", function (e) {
  // active current tab
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("tab--active"));
  e.target.classList.add("tab--active");

  // show active list
  document
    .querySelectorAll(".tasks--list")
    .forEach((list) => list.classList.toggle("hidden"));
});

btnNew.addEventListener("click", displayNewForm);
