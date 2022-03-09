import React from "react";
import { Modal } from "reactstrap";
import "./ModalSpinner.css";

const ModalSpinner = (props) => {
  return (
    <Modal isOpen={props.data} className="modalSpinner">
      <div class="Modalloader">Loading...</div>
    </Modal>
  );
};

export default ModalSpinner;
