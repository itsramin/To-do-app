import View from "./view.js";

class TaskView extends View {
  // _parentEl = document.querySelector(".tabs__body--new");
  _parentEl = document.querySelector(".tabs__body--task");
  _childEl = document.querySelector(".input--cat");

  // save() {
  //   const title = document.querySelector(".input--title").value;
  //   const date = document.querySelector(".input--date").value;
  //   const cat = document.querySelector(".input--cat").value
  //     ? document.querySelector(".input--cat").value
  //     : "Main";
  //   const description = document.querySelector(".input--des").value;
  //   const repeatPeriod = document.querySelector(".select--period")?.value;
  //   let period;
  //   if (repeatPeriod === "days") period = 1;
  //   if (repeatPeriod === "weeks") period = 7;
  //   if (repeatPeriod === "monthes") period = 30;
  //   if (repeatPeriod === "years") period = 365;

  //   // calculate repetition count
  //   let repCount;
  //   if (
  //     !document.querySelector(".input--repeat-count") ||
  //     document.querySelector(".input--repeat-count").value === ""
  //   ) {
  //     repCount = null;
  //   } else {
  //     repCount = document.querySelector(".input--repeat-count").value;
  //   }
  //   const repeatCount = repCount * period;

  //   const id = document.querySelector(".form").dataset?.id;

  //   const taskData = [title, date, cat, description, repeatCount, id];

  //   return taskData;
  // }
  save() {
    const form = document.querySelector(".form--task");
    const dataArr = [...new FormData(form)];
    const data = Object.fromEntries(dataArr);
    data.id = document.querySelector(".form--task").dataset?.id;

    // const [title, date, cat, description] = data;
    // const taskData = [title, date, cat, description, repeatCount, id];

    return data;
  }
  render(task = undefined) {
    this.show();

    // ${task ? "edit" : "new"}
    const markup = `
    <form class="form form--task" data-id="${task ? task.id : ""}">
      <i class="far fa-times button--close"></i>
      <div class="form__field">
        <i class="far fa-pen form__label"></i>
        <input
            class="input input--title"
            type="text"
            placeholder="Title"
            name="title"
            value="${task ? task.title : ""}"
        />
      </div>
      <div class="form__field field--date">
        <i class="far fa-calendar form__label"></i>
        <input class="input input--date" type="date" name="date" ${
          task?.date ? `value="${task.date}"` : ""
        } />
        
        <span class="button--rep">
          <i class="far fa-repeat-alt"></i> repeat
        </span>
      </div>
      <div class="form__field field--cat">
        <i class="far fa-folder-open form__label"></i>
        <select class="input input--cat" name="cat">
        </select>
        
      </div>
      <div class="form__field">
        <i class="far fa-quote-left form__label"></i>
        <textarea
            class="input--des"
            cols="30"
            rows="3"
            placeholder="Description" name="description"
            
        >${task ? task.description : ""}</textarea>
      </div>
      <div class="form__field field--btns">
        <input
            class="button--save"
            type="submit"
            value="Save"
        />
        ${task ? `<button class="button--del">Delete task</button>` : ""}
      </div>
    </form>
    `;
    // if (task) {
    //   this.repeat(task.repeatCount);
    // }
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
    this._childEl = document.querySelector(".input--cat");
    this.btnRep = document.querySelector(".button--rep");
  }

  repeat(repeatCount) {
    // if (!repeatCount) return;
    let html = `
      <div class="form__field form__field--repeat">
        <i class="far fa-repeat-alt form__label"></i><span class="form__label form__label--rep">Every</span>
        <input class="input input--repeat-count " type="number" min="1" max="1000" placeholder="" name="repeatCount"
        value="${repeatCount ? repeatCount : ""}" />
        <select class="select--period ">
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="monthes">monthes</option>
          <option value="years">years</option>
        </select>
      </div>
    `;
    if (repeatCount >= 0) {
      this.btnRep.innerHTML = `<i class="far fa-times"></i>`;
      document
        .querySelector(".field--date")
        .insertAdjacentHTML("afterend", html);
    } else {
      if (this.btnRep.innerHTML === `<i class="far fa-times"></i>`) {
        this.btnRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
        document.querySelector(".form__field--repeat")?.remove();
      } else {
        this.btnRep.innerHTML = `<i class="far fa-times"></i>`;
        document
          .querySelector(".field--date")
          .insertAdjacentHTML("afterend", html);
      }
    }
    this.btnRep.classList.toggle("move-repeat");
  }
  // handlers

  addHandlerRepeat(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".button--rep");
      if (!btn) return;
      handler();
    });
  }
  addHandlerSave(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".button--save");
      if (!btn) return;
      if (document.querySelector(".input--title").value !== "") handler();
    });
  }
  addHandlerDelete(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".button--del");
      if (!btn) return;
      const id = e.target.closest(".form").dataset.id;
      handler(id);
    });
  }
}

export default new TaskView();
