import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import NotFound from "../components/NotFound";
import AppLayout from "../layout/AppLayout";
import { Provider } from "react-redux";
import { store } from "../store";
import Products from "../pages/Products";
import Materials from "../pages/Materials";
import Compositions from "../pages/Compositions";
import { ToastContainer, type ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRoutes = () => {

  const toastConfig: ToastContainerProps = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};


  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="materials" element={<Materials />} />
            <Route path="compositions" element={<Compositions />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer {...toastConfig} />
      </Provider>
    </BrowserRouter>
  );
};

export default AppRoutes;
