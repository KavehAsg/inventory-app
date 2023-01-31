const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addCategoryBtn = document.querySelector("#add-category-btn");
const cancelCategoryBtn = document.querySelector("#cancel-category-btn");
const categoryList = document.querySelector("#product-category");
const categorySection = document.querySelector("#add-category");
const categoryLink = document.querySelector("#category-link");
const categoryTitleWarning = document.querySelector("#category-title-warning");
const categoryDescriptionWarning = document.querySelector("#category-description-warning");
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
        let list = `<option value="none" class="text bg-slate-300 dark:bg-slate-600" selected>select a category</option>`;
        this.categories.forEach((item) => {
            list += `<option class="text bg-slate-300 dark:bg-slate-600" value="${item.id}" >${item.title}</option>`;
        });
        categoryList.innerHTML = list;
    }
    addCategory() {
        const newCategory = {
            id: new Date().getTime(),
            title: categoryTitle.value.trim().toLocaleLowerCase(),
            description: categoryDescription.value.trim().toLocaleLowerCase(),
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
