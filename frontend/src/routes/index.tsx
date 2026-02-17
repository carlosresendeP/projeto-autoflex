import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import NotFound from "../components/NotFound";
import AppLayout from "../layout/AppLayout";
import { Provider } from "react-redux";
import { store } from "../store";
import Products from "../pages/Products";
import Materials from "../pages/Materials";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="materials" element={<Materials />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default AppRoutes;
