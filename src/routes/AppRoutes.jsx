import PrivateRoute from "@routes/PrivateRoutes";
import PublicRoutes from "@routes/PublicRoutes";
import Login from "@pages/auth/Login";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@routes/routes";
import Layout from "@components/layout/Layout";
import Dashboard from "@pages/dashboard/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import Products from "@pages/products/Products";
import AddProduct from "@pages/products/AddProduct";
import UpdateProduct from "@pages/products/UpdateProduct";
import ProductDetail from "@pages/products/ProductDetail";
import NotFound from "@pages/notFound/NotFound";
import Error from "@pages/error/Error";

const AppRoutes = createBrowserRouter([
    {
      path: PRIVATE_ROUTES.DASHBOARD,
      element: <Layout />,
      errorElement: <Error/>, 
      children: [

        // Dashboard Route
        {
          index: true,
  
          element: (
            <PrivateRoute element={<Dashboard/>}/>
          ),
        },

        //Products Routes
        {
          path: PRIVATE_ROUTES.PRODUCTS,
          element: <PrivateRoute element={<Products/>}/>,
        },
        {
          path: PRIVATE_ROUTES.PRODUCTS,
          element: <PrivateRoute element={<ProductDetail/>}/>,
        },
        {
          path: PRIVATE_ROUTES.ADD_PRODUCT,
          element: <PrivateRoute element={<AddProduct />}/>,
        },
       
        {
          path: PRIVATE_ROUTES.UPDATE_PRODUCT,
          element: <PrivateRoute element={<UpdateProduct/>}/>,
        },
      ],
    },
    {
      path: PUBLIC_ROUTES.LOG_IN,
      element: <PublicRoutes element={<Login/>} />,
      errorElement: <Error/>, 
    },
  
    {
      path: "*",
      element: <NotFound/>,
    },
  ]);

  export default AppRoutes;