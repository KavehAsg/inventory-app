const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addCategoryBtn = document.querySelector("#add-category-btn");
const cancleCategoryBtn = document.querySelector("#cancle-category-btn");
const categoryList = document.querySelector("#product-category");
const categorySection = document.querySelector("#add-category");
const categoryLink = document.querySelector("#category-link");
const categoryTitleWarning = document.querySelector("#category-title-warning");
class CategoryView {
    constructor() {
        addCategoryBtn === null || addCategoryBtn === void 0 ? void 0 : addCategoryBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.addCategory(e);
        });
        cancleCategoryBtn === null || cancleCategoryBtn === void 0 ? void 0 : cancleCategoryBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.showCategorySection();
        });
        categoryLink === null || categoryLink === void 0 ? void 0 : categoryLink.addEventListener("click", () => this.showCategorySection());
        this.categories = JSON.parse(localStorage.getItem("category")) || [];
    }
    setCategory() {
        let list = `<option value="none" class="text bg-slate-300 dark:bg-slate-600" selected>select a category</option>`;
        this.categories.forEach((item) => {
            list += `<option class="text bg-slate-300 dark:bg-slate-600" value="${item.id}" >${item.title}</option>`;
        });
        categoryList.innerHTML = list;
    }
    addCategory(e) {
        if (categoryTitle.value.trim().length > 3) {
            const title = categoryTitle.value.trim().toLocaleLowerCase();
            const description = categoryDescription.value.trim().toLocaleLowerCase();
            const date = new Date();
            const id = new Date().getTime();
            const newCategory = {
                id: id,
                title: title,
                description: description,
                createdDate: date,
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
            categoryTitle.classList.remove("border-red-500");
            this.removeTitleWarning();
        }
        else {
            categoryTitle.classList.add("border-red-500");
            this.setTitleWarning("Category title`s characters must be longer than 3");
        }
    }
    showCategorySection() {
        categorySection.classList.toggle("hidden");
    }
    setTitleWarning(error) {
        categoryTitleWarning.classList.remove("hidden");
        categoryTitleWarning.classList.add("block");
        categoryTitleWarning.innerText = error;
    }
    removeTitleWarning() {
        categoryTitleWarning.classList.remove("block");
        categoryTitleWarning.classList.add("hidden");
    }
}
export default new CategoryView();
