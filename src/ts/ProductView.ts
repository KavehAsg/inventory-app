import { debounce } from "./helper.js";

const productTitle = document.querySelector(
  "#product-title"
) as HTMLInputElement;

const productQuantity = document.querySelector(
  "#product-quantity"
) as HTMLInputElement;

const productCategory = document.querySelector(
  "#product-category"
) as HTMLSelectElement;

const addProductBtn = document.querySelector(
  "#add-product-btn"
) as HTMLButtonElement;

const productList = document.querySelector("#product-list") as HTMLDivElement;

const productQuantityWarning = document.querySelector(
  "#product-quantity-warning"
) as HTMLSpanElement;

const productCategoryWarning = document.querySelector(
  "#product-category-warning"
) as HTMLSpanElement;

const productTitleWarning = document.querySelector(
  "#product-title-warning"
) as HTMLSpanElement;

const searchInput = document.querySelector("#search-input") as HTMLInputElement;

export interface productType {
  id: number;
  title: string;
  category: string;
  quantity: number;
  createdDate: {
    miladi: Date;
    shamsi: string;
    time: string;
  };
}

class ProductView {
  products: productType[];

  constructor() {
    this.products = JSON.parse(localStorage.getItem("products")!) || [];

    addProductBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      this.productValidation();
    });

    searchInput?.addEventListener("input", () => {
      const text: string = searchInput.value;
      if (text.length > 0) {
        const searchProducts = debounce((content) => {
          let data: productType[];
          data = JSON.parse(localStorage.getItem("products")!);
          this.products = data.filter((item) => item.title.includes(content));
          this.setProducts();
        }, 1000);
        searchProducts(text);
      } else {
        this.products = JSON.parse(localStorage.getItem("products")!) || [];
        this.setProducts();
      }
    });

    productList.addEventListener("click" , (e) => {
      (e.target instanceof Element && e.target.classList.contains("delete-product-btn")) && this.deleteProduct(e);
    });
  }

  setProducts(): void {
    let list: string = "";
    this.products?.forEach((item) => {
      list += `
      <div class="flex justify-between items-center">
      <span class="block text">${item.title}</span>
      <div class="flex items-center gap-x-4 ">
          <span class="block text">${item.createdDate.shamsi}</span>
          <span class="block text">${item.createdDate.time}</span>
          <span class="block text border border-slate-400 rounded-md p-1 text-sm">${item.category}</span>
          <span class="bg-transparent flex items-center justify-center w-6 h-6 text border border-slate-500 rounded-full">${item.quantity}</span>
          <button type="button"  class="delete-product-btn p-1 text-sm text-red-700 dark:text-red-400 font-bold border-red-400 dark:border-red-500"  id="${item.id}">delete</button>
      </div>
  </div>
  `;
    });
    productList.innerHTML = list;
  }

  productValidation(): void {
    if (productTitle.value.length === 0) {
      this.removeWarning();
      this.setTitleWarning("Type a title for product");
    } else if (Number(productQuantity.value) < 1) {
      this.removeWarning();
      this.setQuantityWarning("Product number must be larger than 0");
    } else if (productCategory.value === "none") {
      this.removeWarning();
      this.setCategoryWarning("Select a category");
    } else {
      this.addProduct();
      this.removeWarning();
    }
  }

  addProduct(): void {
    const newProduct: productType = {
      title: productTitle.value,
      quantity: Number(productQuantity.value),
      category: productCategory.options[productCategory.selectedIndex].text,
      id: new Date().getTime(),
      createdDate: {
        miladi: new Date(),
        shamsi: new Date().toLocaleDateString("fa-IR"),
        time: new Date()
          .toLocaleTimeString("en-IR", { hour12: false })
          .substring(0, 5),
      },
    };
    if (localStorage.getItem("products")) {
      const productsData: productType[] = JSON.parse(
        localStorage.getItem("products")!
      );
      productsData.push(newProduct);
      localStorage.setItem("products", JSON.stringify(productsData));
    } else {
      localStorage.setItem("products", JSON.stringify([newProduct]));
    }
    this.products = JSON.parse(localStorage.getItem("products")!);
    this.setProducts();
    productTitle.value = "";
    productQuantity.value = "";
  }

  deleteProduct(e : MouseEvent) {
      let id = (e.target as Element).id;
      let oldProducts : productType[] = JSON.parse(localStorage.getItem("products")!);
      let newProduct : productType[] = oldProducts.filter(product => product.id != Number(id));
      localStorage.setItem("products" , JSON.stringify(newProduct));
      this.products = JSON.parse(localStorage.getItem("products")!)
      this.setProducts();
  }

  setTitleWarning(error: string): void {
    productTitleWarning.classList.remove("hidden");
    productTitleWarning.classList.add("block");
    productTitleWarning.innerText = error;
    productTitle.classList.add("warning");
  }

  setQuantityWarning(error: string): void {
    productQuantityWarning.classList.remove("hidden");
    productQuantityWarning.classList.add("block");
    productQuantityWarning.innerText = error;
    productQuantity.classList.add("warning");
  }

  setCategoryWarning(error: string): void {
    productCategoryWarning.classList.remove("hidden");
    productCategoryWarning.classList.add("block");
    productCategoryWarning.innerText = error;
    productCategory.classList.add("warning");
  }

  removeWarning(): void {
    productQuantityWarning.classList.remove("block");
    productQuantityWarning.classList.add("hidden");
    productQuantity.classList.remove("warning");

    productCategoryWarning.classList.remove("block");
    productCategoryWarning.classList.add("hidden");
    productCategory.classList.remove("warning");

    productTitleWarning.classList.remove("block");
    productTitleWarning.classList.add("hidden");
    productTitle.classList.remove("warning");
  }
}

export default new ProductView();
