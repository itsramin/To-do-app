export default class View {
  container = document.querySelector(".container");

  // category elements
  boxCat = document.querySelector(".box--cat");
  selectCategory = document.querySelector(".select--category");
  formCategory = document.querySelector(".form--category");
  btnCategoryAdd = document.querySelector(".button--category-add");
  btnCategoryDel = document.querySelector(".button--category-del");

  // tabs elements
  tabs = document.querySelector(".tabs");
  tabsList = document.querySelector(".tabs__list");
  tabsSection = document.querySelector(".tabs__section");
  tabsDoneCount = document.querySelector(".tabs--done-count");
  tabsUndoneCount = document.querySelector(".tabs--undone-count");
  tabsBodyTasksDone = document.querySelector(".tabs__body--tasks-done");
  tabsBodyTasksLists = document.querySelector(".tabs__body--tasks-lists");
  tabsBodyTasksUndone = document.querySelector(".tabs__body--tasks-undone");

  // search elements
  inputSearch = document.querySelector(".input--search");
  tabsBodySearch = document.querySelector(".tabs__body--search");
  btnSearchClose = document.querySelector(".button--search-close");
  tabsBodySearchRes = document.querySelector(".tabs__body--search-res");

  // new form elements
  btnNewRep = document.querySelector(".button--new-rep");
  inputNewCat = document.querySelector(".input--new-cat");
  tabsBodyNew = document.querySelector(".tabs__body--new");
  btnNewSave = document.querySelector(".button--new-save");
  btnNewClose = document.querySelector(".button--new-close");
  btnGCal = document.querySelector(".gcal");

  // edit form elements
  btnEditDel = document.querySelector(".button--edit-del");
  btnEditRep = document.querySelector(".button--edit-rep");
  inputEditCat = document.querySelector(".input--edit-cat");
  tabsBodyEdit = document.querySelector(".tabs__body--edit");
  btnEditSave = document.querySelector(".button--edit-save");
  btnEditClose = document.querySelector(".button--edit-close");

  // main buttons elements
  buttons = document.querySelector(".buttons");
  btnNew = document.querySelector(".button--new");
  btnSort = document.querySelector(".button--sort");
  btnSearch = document.querySelector(".button--search");

  // theme elements
  currentTheme = localStorage.getItem("theme");
  btnThemeToggle = document.querySelector(".button--theme-toggle");
  prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // message elements
  overlay = document.querySelector(".overlay");
  messageBtns = document.querySelector(".message__buttons");
  btnMessageClose = document.querySelector(".button--message-close");

  //
  _parentEl;
  _childEl;

  hide() {
    this.btnThemeToggle.classList.add("hidden");
    this.boxCat.classList.add("hidden");
    this.tabsBodyTasksLists.classList.add("hidden");
    document.querySelector(".tabs__list").classList.add("hidden");
    this.buttons.classList.add("hidden");
    this.tabsBodyNew.classList.add("hidden");
  }
  close() {
    // show default section
    this.btnThemeToggle.classList.remove("hidden");
    this.boxCat.classList.remove("hidden");
    this.tabsBodyTasksLists.classList.remove("hidden");
    this.tabsList.classList.remove("hidden");
    this.buttons.classList.remove("hidden");

    // hide sections
    this.tabsBodyNew.classList.add("hidden");

    // add or remove max-hight
    this.container.classList.remove("container--max-height");
    this.tabs.classList.remove("tabs--max-height");
  }

  addHandlerClose(handler) {
    this._parentEl
      .querySelector(".fa-times")
      .addEventListener("click", handler);
  }
  updateCategories(cats, curCate) {
    // clean "place" content
    this._childEl.innerHTML = "";

    let html = "";
    cats.forEach((cat) => {
      html += `<option ${
        cat === curCate ? "selected" : ""
      } value="${cat}">${cat}</option>`;
    });

    this._childEl.insertAdjacentHTML("beforeend", html);
  }
}
