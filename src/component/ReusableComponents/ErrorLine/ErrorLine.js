import React from "react";

const ErrorLine = (props) => {
  return props.error ? (
    <p style={{ color: "red", textAlign: "left" }}>* {props.error}</p>
  ) : null;
};

export default ErrorLine;
