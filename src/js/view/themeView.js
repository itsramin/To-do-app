import View from "./view.js";

class ThemeView extends View {
  _parentEl = document.querySelector(".tabs__body--tasks-lists");

  changeTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      // change theme icon
      document.querySelector(".fa-sun").classList.add("hidden");
      document.querySelector(".fa-moon").classList.remove("hidden");
    } else {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      // change theme icon
      document.querySelector(".fa-sun").classList.remove("hidden");
      document.querySelector(".fa-moon").classList.add("hidden");
    }
  }

  // handlers
  addHandlerTheme(handler) {
    this.btnThemeToggle.addEventListener("click", handler);
  }
}

export default new ThemeView();
