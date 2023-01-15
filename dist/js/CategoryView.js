const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addCategoryBtn = document.querySelector("#add-category-btn");
const categoryList = document.querySelector("#product-category");
class CategoryView {
    constructor() {
        addCategoryBtn === null || addCategoryBtn === void 0 ? void 0 : addCategoryBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.addCategory(e);
        });
        this.categories = JSON.parse(localStorage.getItem("category")) || [];
    }
    setCategory() {
        let list = `<option value="none" selected>select a category</option>`;
        this.categories.forEach((item) => {
            list += `<option value="${item.id}" >${item.title}</option>`;
        });
        categoryList.innerHTML = list;
    }
    addCategory(e) {
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
    }
}
export default new CategoryView();
