const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const addProductBtn = document.querySelector("#add-product-btn");
const productList = document.querySelector("#product-list");
class ProductView {
    constructor() {
        addProductBtn === null || addProductBtn === void 0 ? void 0 : addProductBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.addProduct();
        });
        this.products = JSON.parse(localStorage.getItem("products")) || [];
    }
    setProducts() {
        let list = "";
        this.products.forEach((item) => {
            list += `
      <div class="flex justify-between items-center" id="${item.id}">
      <span id="title" class="block text">${item.title}</span>
      <div class="flex items-center gap-x-4 ">
          <span id="date" class="block text">${item.createdDate}</span>
          <span id="category"
              class="block text border border-slate-400 rounded-md p-1 text-sm">${item.category}</span>
          <span id="quantity"
              class="bg-transparent flex items-center justify-center w-6 h-6 text border border-slate-500 rounded-full">${item.quantity}</span>
          <button id="delete-btn"
              class="p-1 text-sm text-red-700 dark:text-red-400 font-bold border-red-400 dark:border-red-500">delete</button>
      </div>
  </div>
  `;
        });
        productList.innerHTML = list;
    }
    addProduct() {
        // const title = productTitle.value;
        // const quantity = productQuantity.value;
        // const category = productCategory.textContent;
        // const date = new Date();
        // const id = new Date().getTime();
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
}
export default new ProductView();
