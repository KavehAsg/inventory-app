import { debounce } from "./helper.js";
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const addProductBtn = document.querySelector("#add-product-btn");
const productList = document.querySelector("#product-list");
const productQuantityWarning = document.querySelector("#product-quantity-warning");
const productCategoryWarning = document.querySelector("#product-category-warning");
const productTitleWarning = document.querySelector("#product-title-warning");
const searchInput = document.querySelector("#search-input");
const sortProductSelect = document.querySelector("#sort-category");
class ProductView {
    constructor() {
        this.products = JSON.parse(localStorage.getItem("products")) || [];
        addProductBtn === null || addProductBtn === void 0 ? void 0 : addProductBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.productValidation();
        });
        searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("input", () => {
            const text = searchInput.value;
            if (text.length > 0) {
                const searchProducts = debounce((content) => {
                    let data;
                    data = JSON.parse(localStorage.getItem("products"));
                    this.products = data.filter((item) => item.title.includes(content));
                    this.setProducts();
                }, 1000);
                searchProducts(text);
            }
            else {
                this.products = JSON.parse(localStorage.getItem("products")) || [];
                this.setProducts();
            }
        });
        productList.addEventListener("click", (e) => {
            (e.target instanceof Element && e.target.classList.contains("delete-product-btn")) && this.deleteProduct(e);
        });
        sortProductSelect.addEventListener("change", () => this.sortProducts(sortProductSelect.value));
    }
    setProducts() {
        var _a;
        let list = "";
        (_a = this.products) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            list += `
      <div class="flex justify-between items-center">
      <span class="block text">${item.title}</span>
      <div class="flex items-center gap-x-4 ">
          <span class="block text">${item.createdDate.shamsi}</span>
          <span class="block text">${item.createdDate.time}</span>
          <div class="tooltip overflow-wrap group max-w-[120px] relative inline-block text border border-slate-400 rounded-md p-1 text-sm">${item.category}
          <span class="tooltipText hidden group-hover:inline-block w-28 bg-slate-300 dark:bg-slate-600 border-slate-400 text-center p-1 rounded-md absolute z-10 mb-2 left-[-50%] bottom-[100%]">${item.description}</span>
          </div>
          <span class="bg-transparent flex items-center justify-center w-6 h-6 text border border-slate-500 rounded-full">${item.quantity}</span>
          <button type="button"  class="delete-product-btn p-1 text-sm text-red-700 dark:text-red-400 font-bold border-red-400 dark:border-red-500"  id="${item.id}">delete</button>
      </div>
  </div>
  `;
        });
        productList.innerHTML = list;
    }
    productValidation() {
        if (productTitle.value.length === 0) {
            this.removeWarning();
            this.setTitleWarning("Type a title for product");
        }
        else if (Number(productQuantity.value) < 1) {
            this.removeWarning();
            this.setQuantityWarning("Product number must be larger than 0");
        }
        else if (productCategory.value === "none") {
            this.removeWarning();
            this.setCategoryWarning("Select a category");
        }
        else {
            this.addProduct();
            this.removeWarning();
        }
    }
    addProduct() {
        const category = JSON.parse(localStorage.getItem("category"))
            .find((item) => item.id === +productCategory.options[productCategory.selectedIndex].value);
        const newProduct = {
            title: productTitle.value,
            quantity: Number(productQuantity.value),
            category: category.title,
            description: category.description,
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
            const productsData = JSON.parse(localStorage.getItem("products"));
            productsData.push(newProduct);
            localStorage.setItem("products", JSON.stringify(productsData));
        }
        else {
            localStorage.setItem("products", JSON.stringify([newProduct]));
        }
        this.products = JSON.parse(localStorage.getItem("products"));
        this.setProducts();
        productTitle.value = "";
        productQuantity.value = "";
    }
    deleteProduct(e) {
        let id = e.target.id;
        let oldProducts = JSON.parse(localStorage.getItem("products"));
        let newProduct = oldProducts.filter(product => product.id != Number(id));
        localStorage.setItem("products", JSON.stringify(newProduct));
        this.products = JSON.parse(localStorage.getItem("products"));
        this.setProducts();
    }
    sortProducts(value) {
        if (value === "newest" && localStorage.getItem("products")) {
            this.products = JSON.parse(localStorage.getItem("products"));
            this.setProducts();
        }
        else if (value === "oldest" && localStorage.getItem("products")) {
            this.products = JSON.parse(localStorage.getItem("products")).reverse();
            this.setProducts();
        }
    }
    setTitleWarning(error) {
        productTitleWarning.classList.remove("hidden");
        productTitleWarning.classList.add("block");
        productTitleWarning.innerText = error;
        productTitle.classList.add("warning");
    }
    setQuantityWarning(error) {
        productQuantityWarning.classList.remove("hidden");
        productQuantityWarning.classList.add("block");
        productQuantityWarning.innerText = error;
        productQuantity.classList.add("warning");
    }
    setCategoryWarning(error) {
        productCategoryWarning.classList.remove("hidden");
        productCategoryWarning.classList.add("block");
        productCategoryWarning.innerText = error;
        productCategory.classList.add("warning");
    }
    removeWarning() {
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
