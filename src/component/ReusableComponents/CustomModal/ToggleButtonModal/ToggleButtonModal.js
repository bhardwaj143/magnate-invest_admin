import React from "react";
import { ModalBody } from "react-bootstrap";
import { Modal, ModalHeader, ModalFooter, Button, Spinner } from "reactstrap";

const ToggleButtonModal = (props) => {
  return (
    <>
      <Modal isOpen={props.open}>
        <ModalHeader>Change Status</ModalHeader>
        <ModalBody>
          Do you want to change the status of this {props.name} ?
        </ModalBody>
        <ModalFooter>
          <Button
            className="float-right"
            type="button"
            color="primary"
            disabled={props.loading}
            onClick={props.changeHandler}
          >
            {props.loading ? <Spinner /> : "Yes"}
          </Button>
          {!props.loading ? (
            <Button
              className="float-right"
              type="button"
              color="danger"
              onClick={props.closeModal}
            >
              No
            </Button>
          ) : null}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ToggleButtonModal;
