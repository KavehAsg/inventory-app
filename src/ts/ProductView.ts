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

interface productType {
  id: number;
  title: string;
  category: string;
  quantity: number;
  createdDate: number;
}

class ProductView {
  products: productType[];

  constructor() {
    addProductBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      this.addProduct();
    });
    this.products = JSON.parse(localStorage.getItem("products")!) || [];
  }

  setProducts(): void {
    let list: string = "";
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

  addProduct(): void {
    // const title = productTitle.value;
    // const quantity = productQuantity.value;
    // const category = productCategory.textContent;
    // const date = new Date();
    // const id = new Date().getTime();

    const newProduct: productType = {
      title: productTitle.value,
      quantity: Number(productQuantity.value),
      category: productCategory.options[productCategory.selectedIndex].text,
      id: new Date().getTime(),
      createdDate: new Date().getFullYear(),
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
}

export default new ProductView();
