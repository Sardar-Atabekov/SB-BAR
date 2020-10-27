import React, { useEffect, useState } from "react";
import { getData, deleteData } from "../../functions/requests";
import Loading from "./../../components/loading/loading";
import { Pagination } from "@material-ui/lab";

import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./products.css";
const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("false");

  let countArticle = 20;

  useEffect(() => {
    setLoading(false);
    getData(`category/`).then((res) => {
      setDataCategory(res);
    });
    getData(
      `products/?page=${page}${
        category !== "false" ? `&&categoryId=${category}` : ""
      }`
      //   /?${department !== "false" ? `department=${department}` : ""}${
      //     role !== "false" ? `&&status=${role}` : ""
      //   }${status !== "false" ? `&&user__is_active=${status}` : ""}${
      //     searchText && `&&search=${searchText}`
      //   }&&page_size=9`
    ).then((res) => {
      console.log(res);
      setData(res.content);
      setTotal(res.totalElements);
      setLoading(true);
    });
  }, [page, category]);

  console.log("data", dataCategory);
  return (
    <div className="wrapper productsPage">
      <div className="add-btn-block">
        <div className="form-group mr-2 mb-0">
          <select
            className="form-control"
            defaultValue={category}
            onChange={(e) => {
              setPage(0);
              setCategory(e.target.value);
            }}
          >
            <option value="false">Категории</option>
            {dataCategory.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <Link to={`/add-project/`} className="add-btn">
          Создать
        </Link>
      </div>
      {loading ? (
        <>
          <Table striped className={"mb-5 table-3 tables mt-5"}>
            <thead>
              <tr>
                <th className={"thead-item"}>
                  <span>Имя</span>{" "}
                </th>
                <th className={"thead-item"}>
                  <span>Категория</span>{" "}
                </th>
                <th className={"thead-item"}>
                  <span>Старая цена </span>
                </th>
                <th className={"thead-item"}>
                  <span>Текущая цена </span>
                </th>
              </tr>
            </thead>
            <tbody className={"tbody"}>
              {data.length > 0 ? (
                data.map((user) => (
                  <tr key={user.id}>
                    <td data-th="Ф.И.О" className={"tbody-item table-Username"}>
                      <Link to={`/product-edit/${user.id}/`}>{user.title}</Link>
                    </td>
                    <td data-th="Категория" className={"tbody-item"}>
                      {
                        dataCategory.filter(
                          (item) => item.id == [user.categoryId]
                        )[0].title
                      }
                    </td>
                    <td data-th="Категория" className={"tbody-item"}>
                      {user.oldPrice}
                    </td>
                    <td data-th="Номер телефона" className={"tbody-item"}>
                      {user.price}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="no-filter-Data">
                  <td colSpan="9">Нет данных по этим параметрам</td>
                </tr>
              )}
            </tbody>
          </Table>
          {total > countArticle ? (
            <div className="pagination-block">
              {/* {createPage()} */}
              <Pagination
                count={Math.ceil(total / countArticle)}
                page={page}
                onChange={(e, number) => {
                  setPage(number);
                  setLoading(false);
                }}
              />
            </div>
          ) : null}
          {/* <div className="listItem">
            {data &&
              data.map((product) => (
                <div className="item" key={product.id}>
                  <Link to={`/product/${product.id}`} className="imageLink">
                    <img src={product.img} alt={product.name} />
                  </Link>
                  <input
                    type="text"
                    className="input  imageInput w-100"
                    defaultValue={product.title}
                  />
                  <Link to={`product/${product.id}/`} className="changeBtn">
                    Изменить
                  </Link>
                  <input
                    type="button"
                    className="deleteBtn divDelete"
                    value="Удалить"
                    onClick={(event) => {
                      deleteData(
                        `products/?productId=${product.id}`,
                        product.id
                      );
                      event.target.parentNode.remove();
                    }}
                  />
                </div>
              ))}
          </div>{" "} */}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default ProductsPage;
