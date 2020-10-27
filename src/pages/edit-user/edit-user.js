import React, { useEffect, useState } from "react";
import Title from "./../../components/title/title";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import { getData, putData, postData } from "../../functions/requests";
import "./edit-user.css";
const EditUserPage = (props) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData(`users/${props.match.params.id}`)
      .then((res) => {
        setLoading(true);
        setUserData(res);
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  }, [props.match.params.id]);

  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    console.log(formData);
    formData.forEach((value, key) => {
      data[key] = value;
    });

    putData(`users/${props.match.params.id}/`, data)
      .then((response) => {
        if (response.id) {
          Alert("Данные пользователя обновлен");
          setTimeout(() => props.history.push(`/users/`), 1000);
        } else {
          Alert(response.error, "error");
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };
  const [points, setPoints] = useState("");
  const [testName, setTestName] = useState("");

  console.log("userData", userData);
  return (
    <div className="wrapper">
      <Title>Редактировать данные пользователя</Title>
      {loading ? (
        <form className="d-flex" onSubmit={postUserData}>
          <div className="input-blocks mt-4" onSubmit={postUserData}>
            <div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  defaultValue={userData.email}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">Имя</label>
                <input
                  name="firstName"
                  className="form-control"
                  id="firstName"
                  defaultValue={userData.firstName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Фамилия</label>
                <input
                  name="lastName"
                  className="form-control"
                  id="lastName"
                  defaultValue={userData.lastName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  name="phone"
                  className="form-control"
                  id="phone"
                  required
                />
              </div>
            </div>
          </div>
          <div className="button-block mt-auto w-30 ps-20 mt-4 ml-5">
            {/* <DeleteBtn
              title={`Вы уверены что хотите удалить пользователя ${userData.name}?`}
              subTitle="Пользователь удален"
              url={`users/delete/${userData.id}/`}
              toUrl={"/users/"}
              props={props}
            /> */}

            <input
              type="submit"
              className="btn add-btn mt-"
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
export default EditUserPage;
