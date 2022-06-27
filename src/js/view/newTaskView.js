import View from "./view.js";

class TaskView extends View {
  // _parentEl = document.querySelector(".tabs__body--new");
  _parentEl = document.querySelector(".tabs__body--task");
  _childEl = document.querySelector(".input--cat");

  // show() {
  //   this.hide();
  //   this._parentEl.classList.remove("hidden");

  //   // add or remove max-hight
  //   this.container.classList.add("container--max-height");
  //   this.tabs.classList.add("tabs--max-height");
  // }
  // render(task = "") {
  //   // this.hide();
  //   // this._clearInputs();
  //   // this._parentEl.classList.remove("hidden");
  //   // this._parentEl.classList.remove("hidden");
  //   // // add or remove max-hight
  //   // this.container.classList.add("container--max-height");
  //   // this.tabs.classList.add("tabs--max-height");
  //   // // focus on title
  //   // document.querySelector(".input--new-title").focus();
  //   // //////////////////////////////////////////
  //   // new codes
  //   this.show();
  //   this._parentEl.innerHTML = "";

  //   const markup = `
  //   <form class="form form--edit" data-id="${task ? task.id : ""}">
  //       <i class="far fa-times button--close button--edit-close"></i>
  //       <div class="form__field">
  //       <i class="far fa-pen form__label"></i>
  //       <input
  //           class="input input--edit-title"
  //           type="text"
  //           placeholder="Title"
  //           value="${task ? task.title : ""}"
  //       />
  //       </div>
  //       <div class="form__field field--edit-date">
  //       <i class="far fa-calendar form__label"></i>
  //       <input class="input input--edit-date" type="date" value="${
  //         task ? task.date : ""
  //       }"/>
  //       <span class="button--rep button--edit-rep"
  //           ><i class="far fa-repeat-alt"></i> repeat</span
  //       >
  //       </div>
  //       <div class="form__field field--edit-cat">
  //       <i class="far fa-folder-open form__label"></i>
  //       <select class="input input--edit-cat">
  //       </select>
  //       </div>
  //       <div class="form__field">
  //       <i class="far fa-quote-left form__label"></i>
  //       <textarea
  //           class="input--des input--edit-des"
  //           cols="30"
  //           rows="3"
  //           placeholder="Description"

  //       >${task ? task.description : ""}</textarea>
  //       </div>
  //       <div class="form__field field--btns">
  //       <input
  //           class="button--save button--edit-save"
  //           type="submit"
  //           value="Save"
  //       />
  //       <button class="button--edit-del">Delete task</button>
  //       </div>
  //   </form>
  //   `;
  //   this._parentEl.insertAdjacentHTML("afterbegin", markup);
  //   // this._childEl = document.querySelector(".input--edit-cat");
  // }
  _clearInputs() {
    // cleaning form inputs
    document.querySelector(".input--new-title").value =
      document.querySelector(".input--new-date").value =
      document.querySelector(".input--new-cat").value =
      document.querySelector(".input--new-des").value =
        "";
    document.querySelector(".input--new-repeat-count")
      ? (document.querySelector(".input--new-repeat-count").value = "")
      : "";
    const el = document.querySelector(".form__field--repeat");
    if (el) el.remove();
  }

  // save() {
  //   const title = document.querySelector(".input--new-title").value;
  //   const date = document.querySelector(".input--new-date").value;
  //   const cat = document.querySelector(".input--new-cat").value
  //     ? document.querySelector(".input--new-cat").value
  //     : "Main";
  //   const description = document.querySelector(".input--new-des").value;
  //   const repeatPeriod = document.querySelector(".select--new-period")?.value;
  //   let period;
  //   if (repeatPeriod === "days") period = 1;
  //   if (repeatPeriod === "weeks") period = 7;
  //   if (repeatPeriod === "monthes") period = 30;
  //   if (repeatPeriod === "years") period = 365;

  //   // calculate repetition count
  //   let repCount;
  //   if (
  //     !document.querySelector(".input--new-repeat-count") ||
  //     document.querySelector(".input--new-repeat-count").value === ""
  //   ) {
  //     repCount = null;
  //   } else {
  //     repCount = document.querySelector(".input--new-repeat-count").value;
  //   }
  //   const repeatCount = repCount * period;

  //   const taskData = [title, date, cat, description, repeatCount];

  //   return taskData;
  // }
  save() {
    const title = document.querySelector(".input--title").value;
    const date = document.querySelector(".input--date").value;
    const cat = document.querySelector(".input--cat").value
      ? document.querySelector(".input--cat").value
      : "Main";
    const description = document.querySelector(".input--des").value;
    const repeatPeriod = document.querySelector(".select--period")?.value;
    let period;
    if (repeatPeriod === "days") period = 1;
    if (repeatPeriod === "weeks") period = 7;
    if (repeatPeriod === "monthes") period = 30;
    if (repeatPeriod === "years") period = 365;

    // calculate repetition count
    let repCount;
    if (
      !document.querySelector(".input--repeat-count") ||
      document.querySelector(".input--repeat-count").value === ""
    ) {
      repCount = null;
    } else {
      repCount = document.querySelector(".input--repeat-count").value;
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
  addHandlerRender(handler) {
    this.btnNew.addEventListener("click", handler);
  }
  // addHandlerSave(handler) {
  //   this._parentEl.addEventListener("click", function (e) {
  //     e.preventDefault();
  //     const btn = e.target.closest(".button--new-save");
  //     if (!btn) return;
  //     handler();
  //   });
  // }
  addHandlerRepeat(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".button--new-rep");
      if (!btn) return;
      handler();
    });
  }
}

export default new TaskView();
