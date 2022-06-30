import View from "./view.js";

class CategoryView extends View {
  _parentEl = this.selectCategory;
  _childEl = this.selectCategory;

  changeCat(cat) {
    this.selectCategory.blur();
    this.selectCategory.value = cat;
    return cat;
  }
  showCatForm() {
    this.btnCategoryAdd.classList.toggle("rotate-z");
    this.selectCategory.classList.toggle("hidden");
    document.querySelector(".form--category").classList.toggle("hidden");
    document.querySelector(".input--category-title").value = "";
    document.querySelector(".input--category-title").focus();
  }
  newCategory() {
    const newCat = document.querySelector(".input--category-title").value;
    if (newCat) return newCat;
  }

  // handlers
  addHandlerChangeCat(handler) {
    this.selectCategory.addEventListener("change", function () {
      const cat = document.querySelector(".select--category").value;
      handler(cat);
    });
  }
  addHandlerBtnCat(handler) {
    this.btnCategoryAdd.addEventListener("click", handler);
  }
  addHandlerSaveCat(handler) {
    this.formCategory.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
  addHandlerDelCat(handler) {
    this.btnCategoryDel.addEventListener("click", function (e) {
      e.preventDefault();

      // check if "new category" form is visible
      if (
        !document.querySelector(".form--category").classList.contains("hidden")
      )
        return;
      handler("confirm to delete cat", true);
    });
  }
}

export default new CategoryView();
