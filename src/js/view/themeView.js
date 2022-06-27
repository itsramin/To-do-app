import View from "./view.js";

class ThemeView extends View {
  _parentEl = document.querySelector(".tabs__body--tasks-lists");

  getTheme() {
    return this.prefersDarkScheme;
  }
  changeTheme(theme) {
    if (theme === "light") {
      document.body.classList.toggle("light-theme");
      theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
      document.body.classList.toggle("dark-theme");
      theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    }
    // change theme icon
    document.querySelector(".fa-sun").classList.toggle("hidden");
    document.querySelector(".fa-moon").classList.toggle("hidden");
  }

  // handlers

  addHandlerTheme(handler) {
    this.btnThemeToggle.addEventListener("click", handler);
  }
}

export default new ThemeView();
