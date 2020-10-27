import React, { useEffect, useState } from "react";
import { getData } from "../../functions/requests";
import Loading from "./../../components/loading/loading";
import { Table } from "reactstrap";
import { Pagination } from "@material-ui/lab";

const UsersPage = () => {
  const [users, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  // finished_projects_count;
  let countArticle = 10;


  useEffect(() => {
    setLoading(false);
    let pageNumber = page - 1;
    getData(`orders/?page=${pageNumber}&&size=${countArticle}`).then((res) => {
      console.log('res', res)
      setUsersData(res.content);
      setLoading(true);
      setTotal(res.totalElements);
    });
  }, [page]);

  console.log("users", users);
  return (
    <div className="wrapper">
      {
        // // ${department !== "false" ? `department=${department}` : ""}${
        //   role !== "false" ? `&&status=${role}` : ""
        // }${status !== "false" ? `&&user__is_active=${status}` : ""}${
        //   searchText && `&&search=${searchText}`
        // }&&page_size=9
      }
      {loading ? (
        <>
          <Table striped className={"mb-5 table-3 tables"}>
            <thead>
              <tr>
                <th className={"thead-item"}>
                  <span>Имя клиента</span>{" "}
                </th>
                <th className={"thead-item"}>
                  <span>Номер клиента</span>
                </th>
                <th className={"thead-item "}>
                  <span>Адресс </span>
                </th>
                <th className={"thead-item "}>
                  <span>Товары </span>
                </th>
                {/* <th className={"thead-item "}>
                <span>кл </span>
              </th> */}
              </tr>
            </thead>
            <tbody className={"tbody"}>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td data-th="Ф.И.О" className={"tbody-item table-Username"}>
                      {user.clientName}
                    </td>
                    <td data-th="Категория" className={"tbody-item"}>
                      {user.clientPhone}
                    </td>
                    <td data-th="Номер телефона" className={"tbody-item"}>
                      {user.clientAddress}
                    </td>
                    <td data-th="Номер телефона" className={"tbody-item"}>
                      {user.products.map((item) => (
                        <>
                          <span>
                            {item.title} x{item.quantity}
                          </span>
                          <br />
                        </>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="no-filter-Data">
                  <td colSpan="9">{users.error}</td>
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
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default UsersPage;
