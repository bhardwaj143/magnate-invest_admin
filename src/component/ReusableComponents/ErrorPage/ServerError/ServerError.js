import React from "react";
import One from "./img/server-error.jpg";
import "./ServerError.css";

const ServerError = () => {
  return (
    <div className="serverErrorImage">
      <img src={One} />
      <h1>Something went wrong</h1>
      <h3>Please try again later</h3>
    </div>
  );
};

export default ServerError;
