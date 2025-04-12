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

const editProduct = async (data) => {
   
    const response = await handleRequest("POST", EDIT_PRODUCT, data);
    return response;
};


const deleteProduct = async (id) => {
  
   
    const response = await handleRequest("DELETE", DELETE_PRODUCT+"/"+id);
    return response;
};

const getProductDetails = async (id) => {
   
    const response = await handleRequest("GET", GET_PRODUCT_DETAILS+"/"+id);
    return response;
};

const deleteMultipleProducts = async (ids) => {
   
    const response = await handleRequest("DELETE", DELETE_BULK_PRODUCT+"?ids="+ids);
    return response;
};

const  getPrductGallery=async(url="?offset=1&limit=50")=>{
    const response =  await handleRequest("GET",GET_PRODUCT_GALLERY+url)
  return response
}

const uploadGallery = async(data)=>{
    const response =  await handleRequest("POST",UPLOAD_GALLERY,data)
    return response
}

const bulkProductUpload = async(data)=>{
    const response =  await handleRequest("POST",BULK_PRODUCT_UPLOAD,data,true)
    return response
}



export default { getProductList ,createProduct,deleteProduct,getProductDetails,deleteMultipleProducts,editProduct,getPrductGallery,uploadGallery,bulkProductUpload,getCategoryList}