import View from "./view.js";

class TaskView extends View {
  _parentEl = document.querySelector(".tabs__body--task");
  _childEl = document.querySelector(".input--cat");

  save() {
    const form = document.querySelector(".form--task");
    const dataArr = [...new FormData(form)];
    const data = Object.fromEntries(dataArr);

    data.id = document.querySelector(".form--task").dataset?.id;

    // const [title, date, cat, description] = data;
    // const taskData = [title, date, cat, description, repeatCount, id];

    return data;
  }
  render(task) {
    this.show();

    const markup = `
    <form class="form--task" data-id=${task ? task.id : ""}>
      <i class="far fa-times button--close"></i>
      <div class="form__field">
        <i class="far fa-pen form__label"></i>
        <input
            class="input input--title"
            type="text"
            placeholder="Title"
            name="title"
            value="${task ? task.title : ""}"
            required
        >
        </input>
      </div>
      <div class="form__field field--date">
        <i class="far fa-calendar form__label"></i>
        <input class="input input--date"  name="date" ${
          task?.date
            ? `type="date" value="${
                new Date(task.date).toISOString().split("T")[0]
              }" `
            : `type="text"
          onfocus="(this.type='date')"
          placeholder="Date"`
        }> </input>
        
        <span class="button--rep">
          <i class="far fa-repeat-alt"></i> <span>repeat</span>
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
      <div class="form__field field--gcal">
        <div class="gcal">
          <img
            src="./src/media/icon/gcal.png"
            alt="google calendar"
            class="img--gcal"
          />
          Add to Google Calendar
        </div>
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

    this._parentEl.insertAdjacentHTML("beforeend", markup);
    this._childEl = document.querySelector(".input--cat");
    this.btnRep = document.querySelector(".button--rep");
  }
  repeat(task = undefined) {
    // if (!repeatCount) return;
    let html = `
      <div class="form__field form__field--repeat ">
        <i class="far fa-repeat-alt form__label"></i><span class="form__label form__label--rep">Every</span>
        <input class="input input--repeat-count " type="number" min="1" max="1000" placeholder="" name="repeatCount"
        value="${task?.repeatCount ? task.repeatCount : ""}" />
        <select class="select--period" name="period" >
          <option value="days" ${
            task?.period === "days" ? "selected" : ""
          }>days</option>
          <option value="weeks" ${
            task?.period === "weeks" ? "selected" : ""
          }>weeks</option>
          <option value="monthes" ${
            task?.period === "monthes" ? "selected" : ""
          }>monthes</option>
          <option value="years" ${
            task?.period === "years" ? "selected" : ""
          }>years</option>
        </select>
      </div>
    `;
    const btnRep = document.querySelector(".button--rep");
    if (task?.repeatCount > 0) {
      btnRep.innerHTML = `<i class="far fa-times"></i>`;
      document
        .querySelector(".field--date")
        .insertAdjacentHTML("afterend", html);
    } else {
      if (btnRep.innerHTML === `<i class="far fa-times"></i>`) {
        btnRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
        document.querySelector(".form__field--repeat")?.remove();
      } else {
        btnRep.innerHTML = `<i class="far fa-times"></i>`;
        document
          .querySelector(".field--date")
          .insertAdjacentHTML("afterend", html);
      }
    }
    btnRep.classList.toggle("move-repeat");
  }
  saveToGcal() {
    const title = document.querySelector(".input--title").value;
    const date = new Date(document.querySelector(".input--date").value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, 0);
    const day = String(date.getDate()).padStart(2, 0);
    const des = document.querySelector(".input--des").value;
    // let link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${des}&dates=${year}${month}${day}T110000Z%2F${year}${month}${day}T110100Zhttps://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${des}&dates=${year}${month}${day}T110000Z%2F${year}${month}${day}T110100Z`;
    let link = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${year}${month}${day}%2F${year}${month}${day}&details=${des}&location=&text=${title}`;
    window.open(link, "_blank");
  }

  // handlers

  addHandlerRepeat(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".button--rep");
      if (!btn) return;
      handler();
    });
  }
  addHandlerSave(handler, errorHandler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".button--save");
      if (!btn) return;
      e.preventDefault();

      // no title alert
      if (document.querySelector(".input--title").value === "")
        return errorHandler("no task title");

      // no date alert
      if (
        document.querySelector(".input--repeat-count")?.value > 0 &&
        document.querySelector(".input--date").value === ""
      )
        return errorHandler("no task date");

      // // wrong repeat count
      // if (document.querySelector(".input--repeat-count")?.value)
      //   return errorHandler("wrong repeat count");

      handler();
    });
  }
  addHandlerDelete(errorHandler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".button--del");
      if (!btn) return;
      e.preventDefault();
      const id = e.target.closest(".form--task").dataset.id;
      // handler(id);
      return errorHandler("confirm to delete task", true);
    });
  }
  addHandlerGcal(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".gcal");
      if (!btn) return;

      handler();
    });
  }
}

export default new TaskView();
