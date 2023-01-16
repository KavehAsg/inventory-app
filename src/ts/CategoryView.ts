const categoryTitle = document.querySelector(
  "#category-title"
) as HTMLInputElement;

const categoryDescription = document.querySelector(
  "#category-description"
) as HTMLInputElement;

const addCategoryBtn = document.querySelector(
  "#add-category-btn"
) as HTMLInputElement;

const cancleCategoryBtn = document.querySelector(
  "#cancle-category-btn"
) as HTMLInputElement;

const categoryList = document.querySelector(
  "#product-category"
) as HTMLSelectElement;

const categorySection = document.querySelector(
  "#add-category"
) as HTMLDivElement;

const categoryLink = document.querySelector(
  "#category-link"
) as HTMLHeadElement;

const categoryTitleWarning = document.querySelector(
  "#category-title-warning"
) as HTMLSpanElement;

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
    cancleCategoryBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      this.showCategorySection();
    });
    categoryLink?.addEventListener("click", () => this.showCategorySection());
    this.categories = JSON.parse(localStorage.getItem("category")!) || [];
  }

  setCategory(): void {
    let list: string = `<option value="none" class="text bg-slate-300 dark:bg-slate-600" selected>select a category</option>`;
    this.categories.forEach((item) => {
      list += `<option class="text bg-slate-300 dark:bg-slate-600" value="${item.id}" >${item.title}</option>`;
    });
    categoryList.innerHTML = list;
  }

  addCategory(e: MouseEvent): void {
    if (categoryTitle.value.trim().length > 3) {
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
      categoryTitle.classList.remove("border-red-500");
      this.removeTitleWarning();
    } else {
      categoryTitle.classList.add("border-red-500");
      this.setTitleWarning("Category title`s characters must be longer than 3");
    }
  }

  showCategorySection(): void {
    categorySection.classList.toggle("hidden");
  }

  setTitleWarning(error: string):void {
    categoryTitleWarning.classList.remove("hidden");
    categoryTitleWarning.classList.add("block");
    categoryTitleWarning.innerText = error;
  }

  removeTitleWarning():void{
    categoryTitleWarning.classList.remove("block");
    categoryTitleWarning.classList.add("hidden");
  }
}

export default new CategoryView();
