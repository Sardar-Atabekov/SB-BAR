import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./navbar.css";

const NavBar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const confirmMessage = () => {
    Swal.fire({
      title: "Вы уверены?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32b482",
      cancelButtonColor: "#d33",
      cancelButtonText: "Нет",
      confirmButtonText: "Да, выйти",
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    });
  };

  return (
    <nav className="navigationComponent text-left">
      <Link to={"/products/"} className="categories">
        Продукты
      </Link>
      <Link to={`/category/`} className="categories">
        Категория
      </Link>
      <Link to={"/users/"} className="categories">
        Пользователи
      </Link>
      <Link to={"/orders/"} className="categories">
        Заказы
      </Link>
      <Link to={"/banners/"} className="categories">
        О нас
      </Link>
      <Link to={"/header/"} className="categories">
        Header
      </Link>
      <div className="categories" onClick={confirmMessage}>
        Выйти
      </div>
    </nav>
  );
};

export default NavBar;
