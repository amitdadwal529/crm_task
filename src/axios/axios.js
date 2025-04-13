import axios from "axios";
import { BASE_URL } from "@config/config"; // API Base url 
import authService from "@services/authService"; // Authentication service 
import { showErrorToast } from "@utils/utils"; // To show error notification

// Axios Instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": 'application/json',
  },
});

// Interceptor to add token to request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for handling responses and token refresh logic
axiosInstance.interceptors.response.use(

  (response) => response.data,
  async (error) => {
  
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await authService.refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        localStorage.clear();
        showErrorToast("Session expired. Please log in again.");
        window.location.href = "/seller/sign-in";
        return Promise.reject(refreshError);
      }
    }

    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// function to make api calls
const handleRequest = async (method, url, data = null, isMultipart = false) => {

  try {
    const headers = isMultipart ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' };
    const response = await axiosInstance.request(
      method === 'DELETE'
        ? { method, url, headers }
        : { method, url, data, headers }
    );
    return response;
  } catch (error) {
    const status = error?.status;
    const message = error?.message || "Something went wrong. Please try again.";

    // Handle specific status codes
    switch (status) {
      case 401:
        showErrorToast("Unauthorized. Redirecting to login.");
        break;
      case 404:
        showErrorToast("Requested resource not found.");
        break;
      case 500:
        showErrorToast(error?.response?.data?.message);
        break;
      default:
        showErrorToast(message);
    }
    console.error(`${method} Error:`, error);
    throw error;
  }
};

export default handleRequest;