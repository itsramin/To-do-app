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

  // main buttons elements
  buttons = document.querySelector(".buttons");
  btnNew = document.querySelector(".button--new");
  btnSort = document.querySelector(".button--sort");
  btnSearch = document.querySelector(".button--search");

  // theme elements
  btnThemeToggle = document.querySelector(".button--theme-toggle");
  prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // message elements
  overlay = document.querySelector(".overlay");
  messageBtns = document.querySelector(".message__buttons");
  btnMessageClose = document.querySelector(".button--message-close");

  //
  _parentEl;
  _childEl;

  close() {
    // show default section
    this.btnThemeToggle.classList.remove("hidden");
    this.boxCat.classList.remove("hidden");
    this.tabsBodyTasksLists.classList.remove("hidden");
    this.tabsList.classList.remove("hidden");
    this.buttons.classList.remove("hidden");

    // hide sections
    this._parentEl.classList.add("hidden");
    this._childEl.classList.add("hidden");

    // clean elemets
    this._parentEl.innerHTML = "";

    // add or remove max-hight
    this.container.classList.remove("container--max-height");
    this.tabs.classList.remove("tabs--max-height");
  }
  show() {
    // hide rest parts
    this.btnThemeToggle.classList.add("hidden");
    this.boxCat.classList.add("hidden");
    this.tabsBodyTasksLists.classList.add("hidden");
    this.tabsList.classList.add("hidden");
    this.buttons.classList.add("hidden");

    // show parent element
    this._parentEl.classList.remove("hidden");

    // add or remove max-hight
    this.container.classList.add("container--max-height");
    this.tabs.classList.add("tabs--max-height");
  }
  renderMessage(err, showBtns = false) {
    // add an overlay layer to whole view
    document.querySelector(".overlay").classList.remove("hidden");

    // remove hidden class form message
    document.querySelector(".message").classList.remove("hidden");

    // switch errors
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
      case "duplicate cat":
        msg = `This category is already exist!`;
        break;
      case "confirm to delete task":
        msg = `Are you sure you want to delete this task?
        `;
        break;
      case "confirm to delete cat":
        msg = `Are you sure you want to delete this category?
        `;
        break;
    }

    let msgEl = `<div class="message__body--text">${msg}</div>`;
    document
      .querySelector(".message__body")
      .insertAdjacentHTML("afterbegin", msgEl);

    if (showBtns)
      document.querySelector(".message__buttons").classList.remove("hidden");
  }
  closeMessage() {
    document.querySelector(".overlay").classList.add("hidden");
    document.querySelector(".message").classList.add("hidden");
    document.querySelector(".message__body--text").remove();
  }
  updateCategories(cats, curCate) {
    // clean "place" content
    if (!this._childEl) return;

    this._childEl.innerHTML = "";

    let html = "";
    cats.forEach((cat) => {
      html += `<option ${
        cat === curCate ? "selected" : ""
      } value="${cat}">${cat}</option>`;
    });

    this._childEl.insertAdjacentHTML("beforeend", html);
  }

  addHandlerClose(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".button--close");
      if (btn) handler();
    });
  }
  addHandlercloseMessage(handler) {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".button--message-close");
      if (!btn) return;

      handler();
    });
  }
  addHandlerCheckAnswer(yes, no) {
    document.addEventListener("click", function (e) {
      const yesBtn = e.target.closest(".message__button--yes");
      const noBtn = e.target.closest(".message__button--no");
      if (yesBtn) return yes();
      if (noBtn) return no();
    });
  }
}
