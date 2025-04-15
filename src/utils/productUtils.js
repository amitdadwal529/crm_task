// function to load products from local storage
export const loadProductsFromLocalStorage = () => {
    try {
      const products = localStorage.getItem("products");
      return products ? JSON.parse(products) : [];
    } catch (e) {
      console.error("Failed to load from localStorage", e);
      return [];
    }
  };
  
  // function to save product to local storage
  export const saveProductsToLocalStorage = (products) => {
    try {
      localStorage.setItem("products", JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };