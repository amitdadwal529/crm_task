import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { toast } from "react-toastify";

// generate route
export const generateRoute = (route, params) => {
  let finalRoute = route;

  for (const key in params) {
    finalRoute = finalRoute.replace(`:${key}`, params[key]);
  }

  return finalRoute;
};

export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message)
}

