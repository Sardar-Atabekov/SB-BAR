import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import { getData, postData } from "../../functions/requests";

const AddUserPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    setLoading(false);
    getData(
      `category/`
      //   /?${department !== "false" ? `department=${department}` : ""}${
      //     role !== "false" ? `&&status=${role}` : ""
      //   }${status !== "false" ? `&&user__is_active=${status}` : ""}${
      //     searchText && `&&search=${searchText}`
      //   }&&page_size=9`
    ).then((res) => {
      setCategory(res);
      setLoading(true);
    });
  }, []);

  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    console.log(formData);
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // data.role = 5;
    postData("user/create/", data)
      .then((response) => {
        console.log("response", response);
        if (response.Message === "Пользователь успешно создан") {
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

  console.log("category", category);
  return (
    <div className="wrapper">
      <Title>Создания продукта </Title>
      {loading ? (
        <form className="input-blocks pt-4" onSubmit={postUserData}>
          <div className="form-group">
            <label htmlFor="title">Названия</label>
            <input
              type="title"
              name="title"
              className="form-control"
              id="title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Категория</label>
            <br />
            <select
              id="department"
              className="select form-control"
              name="department"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Выберите категорию
              </option>
              {category.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Цена</label>
            <input name="price" className="form-control" id="price" required />
          </div>
          <div className="form-group">
            <label htmlFor="oldPrice">Старая цена</label>
            <input
              name="oldPrice"
              className="form-control"
              id="oldPrice"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Изображения</label>
            <input
              name="img"
              className="form-control"
              id="img"
              required
            />
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
