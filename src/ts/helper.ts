import { productType } from "./ProductView";

export function debounce(func : (searchedText : string) => void , wait : number = 1000) {
    let timeout : number;
    return function(...args: [string]):any {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }
