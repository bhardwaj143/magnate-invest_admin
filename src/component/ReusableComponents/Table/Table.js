import React from "react";
import { Table } from "react-bootstrap";
import ServerError from "../ErrorPage/ServerError/ServerError";
import NoDataError from "../ErrorPage/NoDataError/NoDataError";

const ModifiedTable = (props) => {
  const tableHead =
    props.data &&
    props.data.map((el, index) => {
      return (
        <th
          style={el.style === "center" ? { textAlign: "center" } : null}
          key={index}
          width={el.width ? el.width : ""}
        >
          {el.name}
        </th>
      );
    });
  return (
    <>
      {props.status === 200 ? (
        <Table responsive hover>
          <thead>
            <tr>{tableHead}</tr>
          </thead>
          <tbody>{props.children}</tbody>
        </Table>
      ) : props.status === 500 ? (
        <ServerError />
      ) : props.status === 404 || props.status === 400 ? (
        <NoDataError />
      ) : null}
    </>
  );
};

export default ModifiedTable;
