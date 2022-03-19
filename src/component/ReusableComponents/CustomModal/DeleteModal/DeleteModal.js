import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const DeleteModal = (props) => {
  return (
    <>
      <Modal isOpen={props.status}>
        <ModalHeader>Delete {props.name}</ModalHeader>
        <ModalBody>
          Are you sure, you want to delete this {props.name} ?
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="danger" onClick={props.deleteHandler}>
            Delete
          </Button>
          <Button type="button" color="primary" onClick={props.closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeleteModal;
