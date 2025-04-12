import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "./routes";
const PrivateRoute = ({ element}) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // Redirect to login if not authenticated
    const isAuthenticated = false;
  return !isAuthenticated ? <Navigate to={PUBLIC_ROUTES.LOG_IN} />:element ;
};

export default PrivateRoute;
