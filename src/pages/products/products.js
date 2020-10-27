import React, { useEffect, useState } from "react";
import { getData, deleteData } from "../../functions/requests";
import Loading from "./../../components/loading/loading";

import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./products.css";
const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    getData(
      `products/`
      //   /?${department !== "false" ? `department=${department}` : ""}${
      //     role !== "false" ? `&&status=${role}` : ""
      //   }${status !== "false" ? `&&user__is_active=${status}` : ""}${
      //     searchText && `&&search=${searchText}`
      //   }&&page_size=9`
    ).then((res) => {
      setData(res.content);
      setLoading(true);
    });
  }, []);

  console.log("data", data);
  return (
    <div className="wrapper productsPage">
      <div className="mt-5 mb-3 text-right">
        <Link to={`/add-product/`} className="add-btn">
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
                      {user.oldPrice}
                    </td>
                    <td data-th="Номер телефона" className={"tbody-item"}>
                      {user.price}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="no-filter-Data">
                  <td colSpan="9">{data.error}</td>
                </tr>
              )}
            </tbody>
          </Table>
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
