import React, { useEffect, useState } from "react";
import { getData } from "../../functions/requests";
import Loading from "./../../components/loading/loading";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const UsersPage = () => {
  const [users, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  // finished_projects_count;

  useEffect(() => {
    setLoading(false);
    getData(`orders/`).then((res) => {
      setUsersData(res.content);
      setLoading(true);
    });
  }, []);

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
        <Table striped className={"mb-5 table-3 tables"}>
          <thead>
            <tr>
              <th className={"thead-item"}>
                <span>Ф. И. О.</span>{" "}
              </th>
              <th className={"thead-item"}>
                <span>Логин </span>
              </th>
              <th className={"thead-item "}>
                <span>Email </span>
              </th>
            </tr>
          </thead>
          {/* <tbody className={"tbody"}>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td data-th="Ф.И.О" className={"tbody-item table-Username"}>
                    <Link to={`/user/${user.id}/`}>
                      {user.firstName ? user.firstName : user.email}{" "}
                      {user.lastName}
                    </Link>
                  </td>
                  <td data-th="Категория" className={"tbody-item"}>
                    {user.login}
                  </td>
                  <td data-th="Номер телефона" className={"tbody-item"}>
                    {user.email}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-filter-Data">
                <td colSpan="9">{users.error}</td>
              </tr>
            )}
          </tbody> */}
        </Table>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default UsersPage;
