import React from "react";
import NavBar from "./components/navbar/navbar";
import UsersPage from "./pages/users/users-page";
import AddUserPage from "./pages/add-user/add-user";
import LoginPage from "./pages/login-page/login-page";
import EditUserPage from "./pages/edit-user/edit-user";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AddProductPage from "./pages/add-product/add-product.js";
import ProductEditPage from "./pages/product-edit/product-edit";
import ProductsPage from "./pages/products/products";
import CategoryPage from "./pages/category/category";
import OrdersPage from "./pages/orders-page/order";
import BannerPage from "./pages/banner-page/banner";
import HeaderPage from "./pages/header/header";
function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <div className="app-wrapper">
          {localStorage.getItem("token") ? <NavBar /> : null}
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/users/" exact component={UsersPage} />
            <Route path="/orders/" exact component={OrdersPage} />
            <Route
              path="/product-edit/:id/"
              exact
              component={ProductEditPage}
            />
            <Route path="/products/" exact component={ProductsPage} />
            <Route path="/category/" exact component={CategoryPage} />
            <Route path="/add-user/" exact component={AddUserPage} />
            <Route path="/banners/" exact component={BannerPage} />
            <Route path="/header/" exact component={HeaderPage} />
            <Route path="/add-product/" exact component={AddProductPage} />
            <Route path="/edit-user/:id/" exact component={EditUserPage} />
        
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
