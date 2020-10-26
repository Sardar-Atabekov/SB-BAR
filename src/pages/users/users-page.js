import React, { useEffect, useState } from "react";
import Title from "../../components/title/title";
import { getData } from "../../functions/requests";
import { confirmAlert } from "../../functions/alert";
import { userStatus } from "./../../constants/status";
import Loading from "./../../components/loading/loading";
import sortsIcon from "./../../assets/icons/Polygon 5.png";
import activeIcon from "./../../assets/icons/Ellipse 43.svg";
import noActiveIcon from "./../../assets/icons/Ellipse 44.svg";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./users-page.css";

const UsersPage = () => {
  const [users, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  // finished_projects_count;

  useEffect(() => {
    setLoading(false);
    getData(`users/`).then((res) => {
      setUsersData(res);
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
                <span>Категория </span>
              </th>
              <th className={"thead-item "}>
                <span>Номер телефона </span>
              </th>
            </tr>
          </thead>
          <tbody className={"tbody"}>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td data-th="Ф.И.О" className={"tbody-item table-Username"}>
                    <Link to={`/user/${user.id}/`}>
                      {user.name ? user.name : user.email} {user.surname}
                    </Link>
                  </td>
                  <td data-th="Категория" className={"tbody-item"}>
                    {user.department_name}
                  </td>
                  <td data-th="Номер телефона" className={"tbody-item"}>
                    {user.phone}
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
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default UsersPage;
