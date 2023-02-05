const categoryTitle = document.querySelector(
  "#category-title"
) as HTMLInputElement;

const categoryDescription = document.querySelector(
  "#category-description"
) as HTMLInputElement;

const addCategoryBtn = document.querySelector(
  "#add-category-btn"
) as HTMLButtonElement;

const cancelCategoryBtn = document.querySelector(
  "#cancel-category-btn"
) as HTMLButtonElement;

const categorySelectList = document.querySelector(
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

const categoryDescriptionWarning = document.querySelector(
  "#category-description-warning"
) as HTMLSpanElement;

const categoryList = document.querySelector("#category-list") as HTMLDivElement;

export interface categoryType {
  id: number;
  title: string;
  description: string;
  createdDate: string;
}

class CategoryView {
  categories: categoryType[];

  constructor() {
    addCategoryBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      this.categoryValidation();
    });

    cancelCategoryBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      this.showCategorySection();
    });

    categoryList?.addEventListener("click", (e) => {
      e.target instanceof Element && e.target.classList.contains("edit-category")
        && this.updateCategory(e);

      e.target instanceof Element && e.target.classList.contains("delete-category")
        && this.deleteCategory(e);
    });

    categoryLink?.addEventListener("click", () => this.showCategorySection());
    this.categories = JSON.parse(localStorage.getItem("category")!) || [];
  }

  categoryValidation() {
    let isExisted: boolean = false;
    if (categoryTitle.value.trim().length < 3) {
      this.setTitleWarning("Category title`s characters must be longer than 3");
    } else if (categoryDescription.value.trim().length < 3) {
      this.removeTitleWarning();
      this.setDescriptionWarning(
        "Category description`s characters must be longer than 3"
      );
    } else {
      const title = categoryTitle.value.trim().toLocaleLowerCase();
      this.categories.forEach(
        (item) => item.title === title && (isExisted = true)
      );
      if (isExisted) this.setTitleWarning("Category already exists");
      else {
        this.addCategory();
        this.removeTitleWarning();
        this.removeDescriptionWarning();
      }
    }
  }

  setCategory(): void {
    this.categories = JSON.parse(localStorage.getItem("category")!) || [];

    let selectListOption: string = `<option value="none" class="text bg-slate-300 dark:bg-slate-600" selected>select a category</option>`;
    let categoryListItems: string = "";

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

  addCategory(): void {
    const newCategory: categoryType = {
      id: new Date().getTime(),
      title: categoryTitle.value.trim(),
      description: categoryDescription.value.trim(),
      createdDate: new Date().toISOString(),
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
    categoryTitle.value = "";
    categoryDescription.value = "";
  }

  updateCategory(e: MouseEvent): void {
    if (e.target instanceof Element) {
      const categoryInput = e.target.parentElement?.parentElement?.previousElementSibling as HTMLInputElement;

      if (e.target.classList.contains("edit")) {
        categoryInput?.removeAttribute("disabled");
        categoryInput.focus();
        e.target.classList.remove("edit");
        e.target.classList.add("update");
        e.target.setAttribute("src", "./assets/checkmark-icon.svg");
      }
      else if (e.target.classList.contains("update")) {
        const categoryId: number = +e.target.parentElement?.parentElement?.parentElement?.getAttribute("name")!;

        console.log(categoryId);
        categoryInput?.setAttribute("disabled", "");
        e.target.classList.remove("update");
        e.target.classList.add("edit");
        e.target.setAttribute("src", "./assets/edit-icon.svg");

        const categories: categoryType[] = JSON.parse(localStorage.getItem("category")!);
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

  deleteCategory(e: MouseEvent) {
    if (e.target instanceof Element) {
      const categoryId: number = +e.target.parentElement?.parentElement?.parentElement?.getAttribute("name")!;
      let oldCategories: categoryType[] = JSON.parse(localStorage.getItem("category")!);
      let newCategories : categoryType[] = 
      oldCategories.filter(category => category.id !== categoryId)
      localStorage.setItem("category", JSON.stringify(newCategories));
      this.setCategory();
    }
  }

  showCategorySection(): void {
    categorySection.classList.toggle("hidden");
  }

  setTitleWarning(error: string): void {
    categoryTitleWarning.classList.remove("hidden");
    categoryTitleWarning.classList.add("block");
    categoryTitleWarning.innerText = error;
    categoryTitle.classList.add("warning");
  }

  removeTitleWarning(): void {
    categoryTitleWarning.classList.remove("block");
    categoryTitleWarning.classList.add("hidden");
    categoryTitle.classList.remove("warning");
  }

  setDescriptionWarning(error: string): void {
    categoryDescriptionWarning.classList.remove("hidden");
    categoryDescriptionWarning.classList.add("block");
    categoryDescriptionWarning.innerText = error;
    categoryDescription.classList.add("warning");
  }

  removeDescriptionWarning(): void {
    categoryDescriptionWarning.classList.remove("block");
    categoryDescriptionWarning.classList.add("hidden");
    categoryDescription.classList.remove("warning");
  }
}

export default new CategoryView();
