import React, { useState, useEffect } from "react";
import Title from "../../components/title/title";
import Loading from "../../components/loading/loading";
import Alert, { confirmAlert } from "../../functions/alert";
import { getData, postFilesData, putData } from "../../functions/requests";
import DeleteBtn from "./../../components/buttons/deleteBtn";
import downloadIcon from "./../../assets/img/Group 115.png";

const AddUserPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(-1);
  const [dataBanner, setDataBanner] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [change, setChange] = useState(false);
  const [bgImgDownload, setBgImgDownload] = useState(downloadIcon);

  useEffect(() => {
    setLoading(false);
    getData(`banner/header`)
      .then((res) => {
        setLoading(true);
        setDataBanner(res);
      })
      .catch(() =>
        confirmAlert("Ошибка сервера. Напишите нам, мы всё починим.")
      );
  }, []);

  useEffect(() => {
    if (loading) {
      setDataSelect(dataBanner[category]);
      setImgUrl(dataBanner[category].img);
      setBgImgDownload(dataBanner[category].img);
    }
  }, [category]);

  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    console.log(formData);
    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.position = 1;
    putData(`banner/${dataBanner[category].id}`, data)
      .then((response) => {
        console.log("response", response);
        if (response.id) {
          Alert("Данные баннера обновлен");
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
        // Alert("Фото добавлено");
      } else {
        Alert(response, "error");
      }
    });
  };
  console.log("dataBanner", dataBanner);
  return (
    <div className="wrapper">
      <Title>Изменение данных </Title>
      {loading ? (
        <div className="d-flex">
          <form className="input-blocks pt-4" onSubmit={postUserData}>
            <div className="form-group">
              <label htmlFor="categoryId">Категория</label>
              <br />
              <select
                id="categoryId"
                className="select form-control"
                name="categoryId"
                defaultValue=""
                required
                onChange={(e) => {
                  setChange(true);
                  setCategory(e.target.value);
                }}
              >
                <option value="" disabled>
                  Выберите баннера
                </option>
                {dataBanner.map((item, i) => (
                  <option value={i}>{item.title}</option>
                ))}
              </select>
            </div>
            {change ? (
              <>
                <div className="form-group">
                  <label htmlFor="title">Названия</label>
                  <input
                    type="title"
                    name="title"
                    className="form-control"
                    id="title"
                    defaultValue={dataSelect.title}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="text">Текст</label>
                  <textarea
                    name="text"
                    className="form-control"
                    id="text"
                    defaultValue={dataSelect.text}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="img">Изображения</label>
                  <input
                    name="img"
                    className="form-control"
                    id="img"
                    required
                    value={imgUrl}
                    onChange={(e) => {
                      setImgUrl(e.target.value);
                    }}
                    //   defaultValue={imgUrl}
                  />
                  <input
                    type="file"
                    id="backgroundImage"
                    className="d-none"
                    onChange={(e) => {
                      addImg(e.target.files[0]);
                      setBgImgDownload(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <label htmlFor="backgroundImage" className="download-text">
                    <span>Загрузить картинку</span>
                  </label>
                </div>
                <div className="text-right">
                  <input
                    type="submit"
                    className="btn add-btn w-50 mt-1"
                    value="Сохранить"
                  />
                </div>
              </>
            ) : null}
          </form>
          <div className="mb-5 ml-5 mt-auto">
            <img src={bgImgDownload} className="standard-img" />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default AddUserPage;
