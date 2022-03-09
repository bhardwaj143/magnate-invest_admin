import React, { useState } from "react";
import {
  CardBody,
  CardFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { deletingUser } from "../../../redux/actions/userAction";
import ModalSpinner from "../../ReusableComponents/Loader/ModalSpinner/ModalSpinner";
import DeleteModal from "../../ReusableComponents/CustomModal/DeleteModal/DeleteModal";
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";

const ShowUser = (props) => {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const userDelete = async () => {
    setLoader(true);
    const res = await props.deleteUser(props.id);
    if (res === 200) {
      // window.location.href = "/users/1";
      ToggleNotification("DeleteUserSuccess");
      history.push("/users/1");
    } else {
      ToggleNotification("DeleteUserFail");
      setLoader(false);
    }
  };

  const ModalOpenHandler = () => {
    setModalOpen(!modalOpen);
  };

  const updateButtonRender = () => {
    return (
      <>
        <Button
          type="button"
          color="primary"
          onClick={(e) => history.push(`/update-user/${props.id}`)}
        >
          Update
        </Button>
        <Button
          type="button"
          color="danger"
          onClick={(e) => history.push("/users/1")}
        >
          Back
        </Button>
        {/* <Button
          type="button"
          color="danger"
          className="float-right"
          onClick={(e) => setModalOpen(true)}
        >
          Delete
        </Button> */}
      </>
    );
  };

  return (
    <>
      <DeleteModal
        status={modalOpen}
        name="user"
        deleteHandler={userDelete}
        closeModal={ModalOpenHandler}
      />
      {loader ? <ModalSpinner data={loader} /> : null}
      <Form>
        <CardBody>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              className="col-12 col-sm-4"
              disabled={true}
              value={props.fName}
            />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              disabled={true}
              className="col-12 col-sm-4"
              value={props.lName}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email Name</Label>
            <Input
              type="text"
              disabled={true}
              className="col-12 col-sm-4"
              value={props.email}
            />
          </FormGroup>
        </CardBody>
        <CardFooter>{updateButtonRender()}</CardFooter>
      </Form>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deletingUser(id)),
  };
};

export default connect(null, mapDispatchToProps)(ShowUser);
