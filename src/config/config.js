// Base Url in production we keep it in env 
export const BASE_URL = "https://dummyjson.com" ;

// Authentication Endpoints
export const AUTH = {
    LOG_IN: "auth/login",
    REFRESH_TOKEN:"/auth/refresh",
    USER_DETAILS : "/auth/me"
}

// Product Management Endpoints 

export const PRODUCTS = {
    GET_ALL : "/products",
    GET_SINGLE : "/products/:id",
    ADD : "products/add",
    UPDATE :"/products/:id",
    DELETE : "/products/:id"
}

// Placeholder thumbnail image

export const placeholderThumbnailImage = "https://picsum.photos/200/300";
