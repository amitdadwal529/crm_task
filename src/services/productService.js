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
  
   
    const response = await handleRequest("DELETE", generateRoute(PRODUCTS.DELETE, {id:id}));
    return response;
};

const getProductDetail = async (id) => {
   
    const response = await handleRequest("GET", generateRoute(PRODUCTS.GET_SINGLE, {id:id}));
    return response;
};

const deleteMultipleProducts = async (ids) => {
   
    const response = await handleRequest("DELETE", PRODUCTS.GET_ALL+"?ids="+ids);
    return response;
};





export default {getAllProducts, addProduct, updateProduct, deleteProduct, getProductDetail, deleteMultipleProducts}