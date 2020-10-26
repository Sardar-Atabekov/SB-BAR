import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "./../../assets/img/OBJECT.png";
import neobisLogo from "./../../assets/logo/neobisHub.svg";
import { postDataNoToken } from "../../functions/requests";
import { Button, FormGroup, Form, Input } from "reactstrap";
import "./login-page.css";

const LoginPage = (props) => {
  const [error, setError] = useState(false);
  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);
   
    postDataNoToken("auth/login/", data)
      .then((response) => {
        console.log(response);
        if (response.token) {
          localStorage.setItem("token", JSON.stringify(response));
          setTimeout(() => (window.location.href = `/products/`), 500);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  };

  if (localStorage.getItem("token")) {
    props.history.push(`/products/`);
  }
  return (
    <div className="loginWrapper">
      <div className="d-flex">
        <div className="login w-50 text-left">
          <h1 className="welcome">Welcome!</h1>
          <h3 className="sing-in">Войдите в аккаунт</h3>
          <Form className="loginForm" onSubmit={postUserData}>
            <FormGroup>
              <Input
                type="email"
                name="email"
                className="loginInput"
                placeholder="Введите e-mail"
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                className="loginInput"
                placeholder="Введите пароль"
                required
              />
            </FormGroup>
            {error ? (
              <div className="errorMessage">Неправильный email или пароль</div>
            ) : null}
            <div className="text-right forget-block mt-2">
              <Link to={"/forget-password/"}>Забыли пароль?</Link>
            </div>
            <Button className="loginInput loginBtn button add-btn">
              Войти
            </Button>
          </Form>
        </div>
        <div className="loginImg w-50">
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
