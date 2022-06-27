import View from "./view.js";

class EditView extends View {
  //   _parentEl = document.querySelector(".tabs__body--edit");
  _parentEl = document.querySelector(".tabs__body--task");
  _childEl;
  _data;

  //   render(task) {
  //     this.show();
  //     this._parentEl.innerHTML = "";

  //     const markup = `
  //     <form class="form form--edit" data-id="${task.id}">
  //         <i class="far fa-times button--close button--edit-close"></i>
  //         <div class="form__field">
  //         <i class="far fa-pen form__label"></i>
  //         <input
  //             class="input input--edit-title"
  //             type="text"
  //             placeholder="Title"
  //             value="${task.title}"
  //         />
  //         </div>
  //         <div class="form__field field--edit-date">
  //         <i class="far fa-calendar form__label"></i>
  //         <input class="input input--edit-date" type="date" value="${task.date}"/>
  //         <span class="button--rep button--edit-rep"
  //             ><i class="far fa-repeat-alt"></i> repeat</span
  //         >
  //         </div>
  //         <div class="form__field field--edit-cat">
  //         <i class="far fa-folder-open form__label"></i>
  //         <select class="input input--edit-cat">
  //         </select>
  //         </div>
  //         <div class="form__field">
  //         <i class="far fa-quote-left form__label"></i>
  //         <textarea
  //             class="input--des input--edit-des"
  //             cols="30"
  //             rows="3"
  //             placeholder="Description"

  //         >${task.description}</textarea>
  //         </div>
  //         <div class="form__field field--btns">
  //         <input
  //             class="button--save button--edit-save"
  //             type="submit"
  //             value="Save"
  //         />
  //         <button class="button--edit-del">Delete task</button>
  //         </div>
  //     </form>
  //     `;
  //     this._parentEl.insertAdjacentHTML("afterbegin", markup);
  //     this._childEl = document.querySelector(".input--edit-cat");
  //   }

  delete() {}

  save() {
    const title = document.querySelector(".input--new-title").value;
    const date = document.querySelector(".input--new-date").value;
    const cat = document.querySelector(".input--new-cat").value
      ? document.querySelector(".input--new-cat").value
      : "Main";
    const description = document.querySelector(".input--new-des").value;
    const repeatPeriod = document.querySelector(".select--new-period")?.value;
    let period;
    if (repeatPeriod === "days") period = 1;
    if (repeatPeriod === "weeks") period = 7;
    if (repeatPeriod === "monthes") period = 30;
    if (repeatPeriod === "years") period = 365;

    // calculate repetition count
    let repCount;
    if (
      !document.querySelector(".input--new-repeat-count") ||
      document.querySelector(".input--new-repeat-count").value === ""
    ) {
      repCount = null;
    } else {
      repCount = document.querySelector(".input--new-repeat-count").value;
    }
    const repeatCount = repCount * period;

    const taskData = [title, date, cat, description, repeatCount];

    return taskData;
  }

  repeat(value) {
    const el = document.querySelector(".form__field--repeat");

    // find the status is "new" or "edit"
    let status;
    if (!this.tabsBodyNew.classList.contains("hidden")) {
      status = "new";
    } else {
      status = "edit";
    }

    // change repeat btn style and text
    if (value > 0) {
      if (el) {
        el.remove();
      }
      this.btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
      this.btnEditRep.classList.add("move-repeat");
    } else {
      if (el) {
        this.btnNewRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
        this.btnNewRep.classList.remove("move-repeat");
        this.btnEditRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
        this.btnEditRep.classList.remove("move-repeat");
        return el.remove();
      }
      this.btnNewRep.innerHTML = `<i class="far fa-times"></i>`;
      this.btnNewRep.classList.add("move-repeat");
      this.btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
      this.btnEditRep.classList.add("move-repeat");
    }
    // element of repeation
    let html = `
              <div class="form__field form__field--repeat">
              <i class="far fa-repeat-alt form__label"></i><span class="form__label form__label--rep">Every</span>
                <input class="input input--repeat-count input--${status}-repeat-count" type="number" min="1" max="1000" placeholder=""
                value="${value ? value : ""}" />
                <select class="select--period select--${status}-period ">
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="monthes">monthes</option>
                  <option value="years">years</option>
                </select>
        
              </div>
        
            `;

    // find exact place to implement
    let place = !this.tabsBodyNew.classList.contains("hidden")
      ? ".field--new-date"
      : ".field--edit-date";
    document.querySelector(place).insertAdjacentHTML("afterend", html);
  }

  // handlers

  addHandlerSave(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".button--edit-save");
      if (!btn) return;
      handler();
    });
  }
  addHandlerRepeat(handler) {
    this.btnNewRep.addEventListener("click", handler);
  }
  addHandlerDelete(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".button--edit-del");
      if (!btn) return;
      const id = e.target.closest(".form--edit").dataset.id;
      handler(id);
    });
  }
}

export default new EditView();
