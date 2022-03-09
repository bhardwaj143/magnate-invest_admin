import React from "react";
import One from "./Img/empty-box.png";
import "./NoDataError.css";

const NoDataError = () => {
  return (
    <div className="noDataError">
      <img src={One} />
      <h1>No data to show !</h1>
    </div>
  );
};

export default NoDataError;
