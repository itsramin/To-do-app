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

  close() {
    // show default section
    this.btnThemeToggle.classList.remove("hidden");
    this.boxCat.classList.remove("hidden");
    this.tabsBodyTasksLists.classList.remove("hidden");
    this.tabsList.classList.remove("hidden");
    this.buttons.classList.remove("hidden");

    // hide sections
    // this.tabsBodyNew.classList.add("hidden");
    // this.tabsBodyEdit.classList.add("hidden");
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
    this.tabsBodyNew.classList.add("hidden");

    // show parent element
    this._parentEl.classList.remove("hidden");

    // add or remove max-hight
    this.container.classList.add("container--max-height");
    this.tabs.classList.add("tabs--max-height");
  }
  // render with new and edit tags
  // render(task = "") {
  //   this.show();
  //   this._parentEl.innerHTML = "";

  //   // ${task ? "edit" : "new"}
  //   const markup = `
  //   <form class="form form--${task ? "edit" : "new"}" data-id="${
  //     task ? task.id : ""
  //   }">
  //       <i class="far fa-times button--close button--${
  //         task ? "edit" : "new"
  //       }-close"></i>
  //       <div class="form__field">
  //       <i class="far fa-pen form__label"></i>
  //       <input
  //           class="input input--${task ? "edit" : "new"}-title"
  //           type="text"
  //           placeholder="Title"
  //           value="${task ? task.title : ""}"
  //       />
  //       </div>
  //       <div class="form__field field--${task ? "edit" : "new"}-date">
  //       <i class="far fa-calendar form__label"></i>
  //       <input class="input input--${task ? "edit" : "new"}-date"  ${
  //     task
  //       ? `type="date" value="${task.date}`
  //       : `type="text"
  //     onfocus="(this.type='date')"
  //     placeholder="Date"`
  //   } "/>
  //       <span class="button--rep button--${task ? "edit" : "new"}-rep"
  //           ><i class="far fa-repeat-alt"></i> repeat</span
  //       >
  //       </div>
  //       <div class="form__field field--${task ? "edit" : "new"}-cat">
  //       <i class="far fa-folder-open form__label"></i>
  //       <select class="input input--${task ? "edit" : "new"}-cat">
  //       </select>
  //       </div>
  //       <div class="form__field">
  //       <i class="far fa-quote-left form__label"></i>
  //       <textarea
  //           class="input--des input--${task ? "edit" : "new"}-des"
  //           cols="30"
  //           rows="3"
  //           placeholder="Description"

  //       >${task ? task.description : ""}</textarea>
  //       </div>
  //       <div class="form__field field--btns">
  //       <input
  //           class="button--save button--${task ? "edit" : "new"}-save"
  //           type="submit"
  //           value="Save"
  //       />
  //       ${
  //         task
  //           ? `<button class="button--edit-del">Delete task</button>
  //       </div>`
  //           : ""
  //       }

  //   </form>
  //   `;
  //   this._parentEl.insertAdjacentHTML("afterbegin", markup);
  //   if (task) this._childEl = document.querySelector(".input--edit-cat");
  // }

  addHandlerClose(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".button--close");
      if (btn) handler();
    });
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
}
