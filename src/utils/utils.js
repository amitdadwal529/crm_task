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

// export const renderStars = (rating) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 >= 0.5;
//   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

//   for (let i = 0; i < fullStars; i++) {
//     stars.push(<IoMdStar key={`full-${i}`} className="text-yellow-500 inline" />);
//   }

//   if (halfStar) {
//     stars.push(<IoMdStarHalf key="half" className="text-yellow-500 inline" />);
//   }

//   for (let i = 0; i < emptyStars; i++) {
//     stars.push(<IoMdStarOutline key={`empty-${i}`} className="text-yellow-500 inline" />);
//   }

//   return stars;
// };
