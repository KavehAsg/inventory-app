const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addCategoryBtn = document.querySelector("#add-category-btn");
const cancelCategoryBtn = document.querySelector("#cancel-category-btn");
const categorySelectList = document.querySelector("#product-category");
const categorySection = document.querySelector("#add-category");
const categoryLink = document.querySelector("#category-link");
const categoryTitleWarning = document.querySelector("#category-title-warning");
const categoryDescriptionWarning = document.querySelector("#category-description-warning");
const categoryList = document.querySelector("#category-list");
class CategoryView {
    constructor() {
        addCategoryBtn === null || addCategoryBtn === void 0 ? void 0 : addCategoryBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.categoryValidation();
        });
        cancelCategoryBtn === null || cancelCategoryBtn === void 0 ? void 0 : cancelCategoryBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.showCategorySection();
        });
        categoryList === null || categoryList === void 0 ? void 0 : categoryList.addEventListener("click", (e) => {
            e.target instanceof Element && e.target.classList.contains("edit-category")
                && this.updateCategory(e);
            e.target instanceof Element && e.target.classList.contains("delete-category")
                && this.deleteCategory(e);
        });
        categoryLink === null || categoryLink === void 0 ? void 0 : categoryLink.addEventListener("click", () => this.showCategorySection());
        this.categories = JSON.parse(localStorage.getItem("category")) || [];
    }
    categoryValidation() {
        let isExisted = false;
        if (categoryTitle.value.trim().length < 3) {
            this.setTitleWarning("Category title`s characters must be longer than 3");
        }
        else if (categoryDescription.value.trim().length < 3) {
            this.removeTitleWarning();
            this.setDescriptionWarning("Category description`s characters must be longer than 3");
        }
        else {
            const title = categoryTitle.value.trim().toLocaleLowerCase();
            this.categories.forEach((item) => item.title === title && (isExisted = true));
            if (isExisted)
                this.setTitleWarning("Category already exists");
            else {
                this.addCategory();
                this.removeTitleWarning();
                this.removeDescriptionWarning();
            }
        }
    }
    setCategory() {
        this.categories = JSON.parse(localStorage.getItem("category")) || [];
        let selectListOption = `<option value="none" class="text bg-slate-300 dark:bg-slate-600" selected>select a category</option>`;
        let categoryListItems = "";
        this.categories.forEach((item) => {
            selectListOption += `<option class="text bg-slate-300 dark:bg-slate-600" value="${item.id}" >${item.title}</option>`;
            categoryListItems += `
        <div name="${item.id}"
            class="category-list-item flex justify-between items-center bg-slate-300 dark:bg-slate-500 rounded-lg border border-slate-400">

            <input type="text"
                class="w-2/3 rounded-md disabled:bg-transparent disabled:text border-none outline-none"
                value="${item.title}" disabled spellcheck="false">

            <div class="category-list-buttons flex space-x-2 mr-2">
                <div title="edit category"
                  class="w-7 md:w-9 cursor-pointer hover:bg-slate-400 rounded-lg transition-all">
                  <img src="./assets/edit-icon.svg" alt="edit" class="edit-category edit w-full select-none p-1">
              </div>
                <div title="delete category"
                    class="w-7 md:w-9 cursor-pointer hover:bg-slate-400 rounded-lg transition-all">
                    <img src="./assets/delete-icon.svg" alt="remove" class="delete-category select-none p-1">
                </div>
          </div>
        </div>
      `;
        });
        categorySelectList.innerHTML = selectListOption;
        categoryList.innerHTML = categoryListItems;
    }
    addCategory() {
        const newCategory = {
            id: new Date().getTime(),
            title: categoryTitle.value.trim(),
            description: categoryDescription.value.trim(),
            createdDate: new Date().toISOString(),
        };
        if (localStorage.getItem("category")) {
            const categoryData = JSON.parse(localStorage.getItem("category"));
            categoryData.push(newCategory);
            localStorage.setItem("category", JSON.stringify(categoryData));
        }
        else {
            localStorage.setItem("category", JSON.stringify([newCategory]));
        }
        this.categories = JSON.parse(localStorage.getItem("category"));
        this.setCategory();
        categoryTitle.value = "";
        categoryDescription.value = "";
    }
    updateCategory(e) {
        var _a, _b, _c, _d, _e;
        if (e.target instanceof Element) {
            const categoryInput = (_b = (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.previousElementSibling;
            if (e.target.classList.contains("edit")) {
                categoryInput === null || categoryInput === void 0 ? void 0 : categoryInput.removeAttribute("disabled");
                categoryInput.focus();
                e.target.classList.remove("edit");
                e.target.classList.add("update");
                e.target.setAttribute("src", "./assets/checkmark-icon.svg");
            }
            else if (e.target.classList.contains("update")) {
                const categoryId = +((_e = (_d = (_c = e.target.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.getAttribute("name"));
                console.log(categoryId);
                categoryInput === null || categoryInput === void 0 ? void 0 : categoryInput.setAttribute("disabled", "");
                e.target.classList.remove("update");
                e.target.classList.add("edit");
                e.target.setAttribute("src", "./assets/edit-icon.svg");
                const categories = JSON.parse(localStorage.getItem("category"));
                categories.forEach((category) => {
                    if (category.id === categoryId) {
                        category.title = categoryInput.value;
                    }
                });
                localStorage.setItem("category", JSON.stringify(categories));
                this.setCategory();
            }
        }
    }
    deleteCategory(e) {
        var _a, _b, _c;
        if (e.target instanceof Element) {
            const categoryId = +((_c = (_b = (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.getAttribute("name"));
            let oldCategories = JSON.parse(localStorage.getItem("category"));
            let newCategories = oldCategories.filter(category => category.id !== categoryId);
            localStorage.setItem("category", JSON.stringify(newCategories));
            this.setCategory();
        }
    }
    showCategorySection() {
        categorySection.classList.toggle("hidden");
    }
    setTitleWarning(error) {
        categoryTitleWarning.classList.remove("hidden");
        categoryTitleWarning.classList.add("block");
        categoryTitleWarning.innerText = error;
        categoryTitle.classList.add("warning");
    }
    removeTitleWarning() {
        categoryTitleWarning.classList.remove("block");
        categoryTitleWarning.classList.add("hidden");
        categoryTitle.classList.remove("warning");
    }
    setDescriptionWarning(error) {
        categoryDescriptionWarning.classList.remove("hidden");
        categoryDescriptionWarning.classList.add("block");
        categoryDescriptionWarning.innerText = error;
        categoryDescription.classList.add("warning");
    }
    removeDescriptionWarning() {
        categoryDescriptionWarning.classList.remove("block");
        categoryDescriptionWarning.classList.add("hidden");
        categoryDescription.classList.remove("warning");
    }
}
export default new CategoryView();
