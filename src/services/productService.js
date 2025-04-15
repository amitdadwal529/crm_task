import handleRequest from "@axios/axios";
import { PRODUCTS } from "@config/config";
import { generateRoute } from "@utils/utils";

const getAllProducts = async () => {
    const response = await handleRequest("GET",PRODUCTS.GET_ALL);
    return response;
};



const addProduct = async (data) => {  
    const response = await handleRequest("POST", PRODUCTS.ADD, data);
    return response;
};

const updateProduct = async (id,data) => {
    const response = await handleRequest("PUT",  generateRoute(PRODUCTS.UPDATE, {id:id}), data);
    return response;
};


const deleteProduct = async (id) => {
  /*
  NOTE:
  We're using a dummy API for deletion. These APIs often have a limit for valid IDs.
   For example, if the product ID exceeds 195, the API might throw a 404 or fail.
   Sometimes, due to local ID generation, the ID passed here might be greater than the actual dummy API limit.
   that is why i have passed a static id 1 here 
  */
   
    const response = await handleRequest("DELETE", generateRoute(PRODUCTS.DELETE, {id:1}));
    return response;
};

const getProductDetail = async (id) => {
   
    const response = await handleRequest("GET", generateRoute(PRODUCTS.GET_SINGLE, {id:id}));
    return response;
};

export default {getAllProducts, addProduct, updateProduct, deleteProduct, getProductDetail}