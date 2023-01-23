const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const addProductBtn = document.querySelector("#add-product-btn");
const productList = document.querySelector("#product-list");
const productQuantityWarning = document.querySelector("#product-quantity-warning");
const productCategoryWarning = document.querySelector("#product-category-warning");
const productTitleWarning = document.querySelector("#product-title-warning");
class ProductView {
    constructor() {
        addProductBtn === null || addProductBtn === void 0 ? void 0 : addProductBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.productValidation();
        });
        this.products = JSON.parse(localStorage.getItem("products")) || [];
    }
    setProducts() {
        let list = "";
        this.products.forEach((item) => {
            list += `
      <div class="flex justify-between items-center" id="${item.id}">
      <span class="block text">${item.title}</span>
      <div class="flex items-center gap-x-4 ">
          <span class="block text">${item.createdDate}</span>
          <span class="block text border border-slate-400 rounded-md p-1 text-sm">${item.category}</span>
          <span class="bg-transparent flex items-center justify-center w-6 h-6 text border border-slate-500 rounded-full">${item.quantity}</span>
          <button type="button" class="p-1 text-sm text-red-700 dark:text-red-400 font-bold border-red-400 dark:border-red-500">delete</button>
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
        const newProduct = {
            title: productTitle.value,
            quantity: Number(productQuantity.value),
            category: productCategory.options[productCategory.selectedIndex].text,
            id: new Date().getTime(),
            createdDate: new Date().getFullYear(),
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
