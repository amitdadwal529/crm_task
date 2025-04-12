import handleRequest from "@axios/axios";
import { PRODUCTS } from "@config/config";

const getAllProducts = async () => {
    const response = await handleRequest("GET",PRODUCTS.GET_ALL);
    return response;
};



const addProduct = async (data) => {  
    const response = await handleRequest("POST", PRODUCTS.ADD, data);
    return response;
};

const updateProduct = async (data) => {
   
    const response = await handleRequest("POST", PRODUCTS.UPDATE, data);
    return response;
};


const deleteProduct = async (id) => {
  
   
    const response = await handleRequest("DELETE", PRODUCTS.DELETE+"/"+id);
    return response;
};

const getProductDetail = async (id) => {
   
    const response = await handleRequest("GET", PRODUCTS.GET_SINGLE+"/"+id);
    return response;
};

const deleteMultipleProducts = async (ids) => {
   
    const response = await handleRequest("DELETE", PRODUCTS.GET_ALL+"?ids="+ids);
    return response;
};





export default {getAllProducts, addProduct, updateProduct, deleteProduct, getProductDetail, deleteMultipleProducts}