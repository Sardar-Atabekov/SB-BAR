import React, { useEffect, useState } from "react";
import {
  getData,
  postData,
  deleteData,
  putData,
} from "../../functions/requests";
import Loading from "./../../components/loading/loading";
import { Link } from "react-router-dom";
import "./category.css";
const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // finished_projects_count;
  const userRights = JSON.parse(localStorage.getItem("neobisHUBDate"));

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
      setData(res);
      setLoading(true);
    });
  }, []);

  const AddCategory = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target),
      data = {};

    formData.forEach(function (value, key) {
      data[key] = value;
    });

    data.position = 1;
    postData("category/", data);
    event.target.reset();
  };

  const changeCategory = (event, id) => {
    const data = {
      title: event.target.parentNode.firstChild.value,
      position: 1,
    };
    console.log(data);
    putData(`category/${id}/`, data);
  };

  console.log("users", data);
  return (
    <div className="wrapper">
      {loading ? (
        <main className="departments">
          <form onSubmit={AddCategory} className="addDepartments">
            <input type="text" name="name" className="add" />
            <button className="changeBtn">Добавить</button>
          </form>
          <div className="listItem">
            {data &&
              data.map((category) => (
                <form className="item" key={category.id}>
                  <input
                    type="text"
                    className="add"
                    defaultValue={category.title}
                  />

                  <input
                    type="button"
                    className="changeBtn"
                    onClick={(event) => changeCategory(event, category.id)}
                    value="Изменить"
                  />
                  <input
                    type="button"
                    className="deleteBtn divDelete"
                    value="Удалить"
                    onClick={(event) => {
                      deleteData(`category/${category.id}/`);
                      event.target.parentNode.remove();
                    }}
                  />
                </form>
              ))}
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default ProductsPage;
