import React from "react";
import "./deleteBtn.css";
import { deleteAlert } from "./../../functions/alert";

const DeleteBtn = ({ title, subTitle, url, toUrl, props, data = "" }) => {
  const deleteMessage = () => {
    deleteAlert(title, subTitle, url, toUrl, props, data);
  };
  return (
    <div className="delete-btn-block btn" onClick={deleteMessage}>
      Удалить
    </div>
  );
};
export default DeleteBtn;
