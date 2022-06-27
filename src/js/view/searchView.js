import View from "./view.js";

class SearchView extends View {
  // _parentEl = document.querySelector(".tabs__body--new");
  _parentEl = document.querySelector(".tabs__body--search-res");
  _childEl = document.querySelector(".box--search");

  render() {
    this.show();
    this._childEl = document.querySelector(".box--search");
    this._childEl.classList.remove("hidden");
    document.querySelector(".input--search").focus();
    document.querySelector(".input--search").value = "";
  }

  searchWord() {
    // clean past data from html
    this.tabsBodySearchRes.innerHTML = "";
    return this.inputSearch.value;

    // find all tasks match the search word
    // if (this.inputSearch.value !== "") {
    //   //   const resTasks = this.#allTasks.filter((task) =>
    //   //     task.title.includes(inputSearch.value)
    //   //   );
    //   //   resTasks.forEach((task) => this._renderTask(task, false, true));
    // }
  }

  addHandlerSearch(handler) {
    this.inputSearch.oninput = handler;
  }
  addHandlerCloseSearch(handler) {
    this._childEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".fa-times");
      if (btn) handler();
    });
  }
}

export default new SearchView();
