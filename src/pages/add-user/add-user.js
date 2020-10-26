import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";

import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import { getData, postData } from "../../functions/requests";
import "./add-user.css";

const AddUserPage = (props) => {
  const [loading, setLoading] = useState(true);

  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    console.log(formData);
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // data.role = 5;
    postData("users/create/", data)
      .then((response) => {
        console.log("response", response);
        if (response.name) {
          Alert("Пользователь добавлен");
          setTimeout(() => props.history.push(`/users/`), 1000);
        } else {
          Alert(response.Message, "error");
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };

  return (
    <div className="wrapper">
      <Title>Создание пользователя </Title>
      {loading ? (
        <form className="input-blocks pt-4" onSubmit={postUserData}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input name="name" className="form-control" id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input name="phone" className="form-control" id="phone" required />
          </div>
          <div className="text-right">
            <input
              type="submit"
              className="btn add-btn w-50 mt-5"
              value="Сохранить"
            />
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default AddUserPage;
