import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatingUser, gettingUser } from "../../../redux/actions/userAction";
import ModalSpinner from "../../ReusableComponents/Loader/ModalSpinner/ModalSpinner";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import * as functions from "../../../functions/function";
import useQuery from "../../ReusableComponents/customHooks/queryHook";

const UpdateUser = (props) => {
  const history = useHistory();

  const query = useQuery();
  const id = query.get("id") || "";

  const [fName, setFname] = useState(null);
  const [lName, setLname] = useState(null);
  const [email, setEmail] = useState(null);
  const [fNameError, setFnameError] = useState("");
  const [lNameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [saveLoader, setSaveLoader] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (props.user) {
      setFname(props.user && props.user.fname ? props.user.fname : null);
      setLname(props.user && props.user.lname ? props.user.lname : null);
      setEmail(props.user && props.user.email ? props.user.email : null);
    }
  }, [props.user]);

  const getData = async () => {
    setLoader(true);
    await props.userDetail(id);
    setLoader(false);
  };

  const updateValidation = () => {
    setFnameError("");
    setLnameError("");
    setEmailError("");
    let err = false;
    const firstNameValidation = functions.textValidation(fName, "first name");
    if (firstNameValidation !== null) {
      err = true;
      setFnameError(firstNameValidation);
      setSaveLoader(false);
    }
    const lastNameValidation = functions.textValidation(lName, "last name");
    if (lastNameValidation !== null) {
      err = true;
      setLnameError(lastNameValidation);
      setSaveLoader(false);
    }
    const emailValidation = functions.emailValidation(email);
    if (emailValidation !== false) {
      err = true;
      setSaveLoader(false);
      setEmailError(emailValidation);
    }
    return err;
  };

  const updateUserFunction = async () => {
    setSaveLoader(true);
    const validate = updateValidation();
    if (!validate) {
      const obj = {
        first_name: fName,
        last_name: lName,
        email: email,
      };
      const res = await props.userUpdate(id, obj);
      if (res === 200) {
        setSaveLoader(false);
        history.push(`/user/${id}`);
        ToggleNotification("UpdateUserSuccess");
        // window.location.href = `/user/${id}`;
      } else if (res && res.error === true) {
        ToggleNotification("UpdateUserFail");
        setEmailError(res && res.message ? res.message : null);
        setSaveLoader(false);
      } else {
        ToggleNotification("ServerError");
      }
    }
  };

  const saveButtonRender = () => {
    return (
      <>
        <Button
          type="button"
          color="primary"
          onClick={(e) => updateUserFunction()}
        >
          Save Changes
        </Button>
        <Button type="button" color="danger" onClick={(e) => history.go(-1)}>
          Cancel
        </Button>
      </>
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h3>User Update</h3>
        </CardHeader>
        {loader ? (
          <ModifiedLoader />
        ) : (
          <>
            <Form>
              <CardBody>
                <ModalSpinner data={saveLoader} />
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    className="col-12 col-sm-4"
                    value={fName}
                    onChange={(e) => {
                      setFnameError("");
                      setFname(e.target.value);
                    }}
                  />
                </FormGroup>
                {fNameError ? (
                  <p style={{ color: "red" }}>{fNameError}</p>
                ) : null}
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    className="col-12 col-sm-4"
                    value={lName}
                    onChange={(e) => {
                      setLnameError("");
                      setLname(e.target.value);
                    }}
                  />
                </FormGroup>
                {lNameError ? (
                  <p style={{ color: "red" }}>{lNameError}</p>
                ) : null}
                <FormGroup>
                  <Label>Email Name</Label>
                  <Input
                    type="text"
                    className="col-12 col-sm-4"
                    value={email}
                    onChange={(e) => {
                      setEmailError("");
                      setEmail(e.target.value);
                    }}
                  />
                </FormGroup>
                {emailError ? (
                  <p style={{ color: "red" }}>{emailError}</p>
                ) : null}
              </CardBody>
            </Form>
            <CardFooter>{saveButtonRender()}</CardFooter>
          </>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userDetail: (id) => dispatch(gettingUser(id)),
    userUpdate: (id, data) => dispatch(updatingUser(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
