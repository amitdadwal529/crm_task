import "@assets/css/global.css";
import "@assets/css/style.css";
import AppRoutes from "@routes/AppRoutes";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@redux/store/store";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={AppRoutes} />
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
