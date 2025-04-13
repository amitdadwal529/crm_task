import axios from "axios";
import { toast } from "react-toastify";
import { AUTH } from "@config/config";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": 'application/json',
  },
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${AUTH.REFRESH_TOKEN}`, { "refreshToken":refreshToken });
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.accessToken);

    return response.data.accessToken;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};

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
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        localStorage.clear();
        toast.error("Session expired. Please log in again.");
        window.location.href = "/seller/sign-in";
        return Promise.reject(refreshError);
      }
    }

    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

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
    const status = error?.response?.status;
    const message = error?.message || "Something went wrong. Please try again.";

    // Handle specific status codes
    switch (status) {
      case 401:
        toast.error("Unauthorized. Redirecting to login.");
        break;
      case 404:
        toast.error("Requested resource not found.");
        window.location.href = "/not-found";
        break;
      case 500:
        toast.error(error?.response?.data?.message);
        break;
      default:
        toast.error(message);
    }
    console.error(`${method} Error:`, error);
    throw error;
  }
};

export default handleRequest;