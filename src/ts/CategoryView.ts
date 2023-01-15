const categoryTitle = document.querySelector(
  "#category-title"
) as HTMLInputElement;

const categoryDescription = document.querySelector(
  "#category-description"
) as HTMLInputElement;

const addCategoryBtn = document.querySelector(
  "#add-category-btn"
) as HTMLInputElement;

const categoryList = document.querySelector(
  "#product-category"
) as HTMLSelectElement;

interface categoryType {
  id: number;
  title: string;
  description: string;
  createdDate: Date;
}

class CategoryView {
 categories: categoryType[];

  constructor() {
    addCategoryBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      this.addCategory(e);
    });
    this.categories = JSON.parse(localStorage.getItem("category")!) || [];
  }

  setCategory() {
    let list: string = `<option value="none" selected>select a category</option>`;
    this.categories.forEach((item) => {
      list += `<option value="${item.id}" >${item.title}</option>`;
    });
    categoryList.innerHTML = list;
  }

  addCategory(e: MouseEvent): void {
    const title = categoryTitle.value.trim().toLocaleLowerCase();
    const description = categoryDescription.value.trim().toLocaleLowerCase();
    const date = new Date();
    const id = new Date().getTime();
    const newCategory: categoryType = {
      id: id,
      title: title,
      description: description,
      createdDate: date,
    };
    if (localStorage.getItem("category")) {
      const categoryData: categoryType[] = JSON.parse(
        localStorage.getItem("category")!
      );
      categoryData.push(newCategory);
      localStorage.setItem("category", JSON.stringify(categoryData));
    } else {
      localStorage.setItem("category", JSON.stringify([newCategory]));
    }
    this.categories = JSON.parse(localStorage.getItem("category")!);
    this.setCategory();
  }
}

export default new CategoryView();
