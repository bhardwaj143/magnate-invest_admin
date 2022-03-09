import React from "react";
import { useHistory } from "react-router-dom";
import DeleteModal from "../CustomModal/DeleteModal/DeleteModal";
import "./TableAction.css";

const Action = (props) => {
  const history = useHistory();

  const viewComponent = (key) => (
    <div key={key} className="Fontawesome Faeye">
      <i
        className="fa fa-lg fa-eye"
        title="View"
        onClick={() => history.push(props.viewURL)}
        aria-hidden="true"
      ></i>
    </div>
  );

  const updatedComponent = (key) => (
    <div key={key} className="Fontawesome Fapencil">
      <i
        className="fa fa-lg fa-pencil"
        title="Update"
        onClick={() => history.push(props.updateURL)}
        aria-hidden="true"
      ></i>
    </div>
  );

  const deleteComponent = (key) => (
    <div key={key} className="Fontawesome Fadelete">
      <i
        className="fa fa-lg fa-trash-o"
        title="Delete"
        aria-hidden="true"
        onClick={props.deleteHandler}
      ></i>
    </div>
  );

  const renderComponent =
    props.data &&
    props.data.length > 0 &&
    props.data.map((el, index) => {
      switch (el.name) {
        case "view":
          return viewComponent(index);
        case "update":
          return updatedComponent(index);
        case "delete":
          return deleteComponent(index);
        default:
          return;
      }
    });

  return (
    <>
      <DeleteModal />
      <div className="row tableActionRow">{renderComponent}</div>
    </>
  );
};

export default Action;
