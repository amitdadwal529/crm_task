// Authentication Endpoints
export const BASE_URL = import.meta.env.VITE_BASE_URL;
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


