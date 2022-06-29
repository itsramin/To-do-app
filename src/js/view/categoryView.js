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

    // // formate new category to capital
    // const newCateFormatted =
    //   newCat.at(0).toUpperCase() + newCat.slice(1).toLowerCase();

    // check for duplicate category name
    // if (!cats.some((cat) => cat === newCateFormatted)) {
    //   //   // add new category to all categories array
    //   //   this.#allCats.push(newCateFormatted);

    //   //   // hide category from
    //   //   this._hideShowCatForm(e);

    //   //   // save to local storage
    //   //   this._setLocalStorage();

    //   //   // create new category list
    //   //   this._createCatsList(selectCategory);

    //   // set category selection to new category
    //   this.selectCategory.value = newCateFormatted;

    //   // show new category tasks
    //   this.changeCat();

    //   return newCateFormatted;
    // } else {
    //   //   this._alertError("duplicate cat");
    //   console.log("duplicate cat");
    // }
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

      const cat = document.querySelector(".select--category").value;
      // check if "new category" form is visible
      if (
        !document.querySelector(".form--category").classList.contains("hidden")
      )
        return;
      handler(cat);
    });
  }
}

export default new CategoryView();
