import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import { getData, postFilesData, putData } from "../../functions/requests";
import DeleteBtn from "./../../components/buttons/deleteBtn";
const AddUserPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [userData, setUserData] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);

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
    });
    getData(`products/${props.match.params.id}`)
      .then((res) => {
        setLoading(true);
        setUserData(res);
        setImgUrl(res.img);
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
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
    putData(`products/?productId=${props.match.params.id}`, data)
      .then((response) => {
        console.log("response", response);
        if (response.id) {
          Alert("Данные продукта обновлен");
          setTimeout(() => props.history.push(`/products/`), 1000);
        } else {
          Alert(response.Message, "error");
        }
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  };

  const addImg = (img) => {
    let formData = new FormData();
    formData.append("file", img);
    postFilesData("storage/uploadFile", formData).then((response) => {
      console.log("response", response);
      if (response.imgUrl) {
        setImgUrl(response.imgUrl);
        Alert("Фото добавлено");
      } else {
        Alert(response, "error");
      }
    });
  };
  console.log("category", userData);
  return (
    <div className="wrapper">
      <Title>Изменение данных продукта </Title>
      {loading ? (
        <form className="input-blocks pt-4" onSubmit={postUserData}>
          <div className="form-group">
            <label htmlFor="title">Названия</label>
            <input
              type="title"
              name="title"
              className="form-control"
              id="title"
              defaultValue={userData.title}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryId">Категория</label>
            <br />
            {userData.categoryId ? (
              <select
                id="categoryId"
                className="select form-control"
                name="categoryId"
                defaultValue={userData.categoryId ? userData.categoryId : ""}
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
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="price">Цена</label>
            <input
              name="price"
              className="form-control"
              id="price"
              defaultValue={userData.price}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="oldPrice">Старая цена</label>
            <input
              name="oldPrice"
              className="form-control"
              id="oldPrice"
              defaultValue={userData.oldPrice}
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
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              //   defaultValue={imgUrl}
            />
            <input
              type="file"
              id="backgroundImage"
              className="d-none"
              onChange={(e) => {
                addImg(e.target.files[0]);
              }}
            />
            <label htmlFor="backgroundImage" className="download-text">
              <span>Загрузить картинку</span>
            </label>
          </div>
          <div className="text-left w-50">
            <DeleteBtn
              title={`Вы уверены что хотите удалить продукта ${userData.title}?`}
              subTitle="Пользователь удален"
              url={`products/?productId=${userData.id}/`}
              data={userData.id}
              toUrl={"/products/"}
              props={props}
            />
          </div>
          <div className="text-right">
            <input
              type="submit"
              className="btn add-btn w-50 mt-1"
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
