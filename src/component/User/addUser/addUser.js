import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Form,
  FormGroup,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import { addingUser } from "../../../redux/actions/userAction";
import * as functions from "../../../functions/function";
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";

const AddUser = (props) => {
  const history = useHistory();
  const [first_name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [lastnameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [loader, setLoader] = useState(false);

  const validation = () => {
    setNameError("");
    setLastNameError("");
    setPasswordError("");
    setEmailError("");
    setConfirmPasswordError("");
    let error = false;
    const firstNameValidation = functions.textValidation(
      first_name,
      "first name"
    );
    if (firstNameValidation) {
      error = true;
      setNameError(firstNameValidation);
    }
    const lastNameValidation = functions.textValidation(last_name, "last name");
    if (lastNameValidation) {
      error = true;
      setLastNameError(lastNameValidation);
    }
    const emailValidation = functions.emailValidation(email);
    if (emailValidation) {
      error = true;
      setEmailError(emailValidation);
    }
    if (!password) {
      error = true;
      setPasswordError("Please choose your password");
    } else if (password.length < 8) {
      error = true;
      setPasswordError("Password should have atleast 8 characters");
    } else if (!password_confirmation) {
      error = true;
      setConfirmPasswordError("Please confirm your password");
    } else if (password_confirmation !== password) {
      error = true;
      setConfirmPasswordError("The passwords does not match");
    }
    return error;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const validate = validation();
    if (!validate) {
      setLoader(true);
      const obj = {
        first_name: first_name,
        last_name: last_name,
        password: password,
        password_confirmation: password_confirmation,
        email: email,
      };
      const res = await props.addUser(obj);
      setLoader(false);
      console.log(res);
      if (res && res === 200) {
        ToggleNotification("AddUserSuccess");
        history.push("/users/1");
      } else if (res && res.error === true) {
        ToggleNotification("AddUserfail");
        setEmailError(res.message);
      } else {
        ToggleNotification("AddUserfail");
      }
    }
    e.preventDefault();
  };

  return (
    <>
      <Breadcrumb />
      <Card>
        <CardHeader>
          <h3>Add User</h3>
        </CardHeader>
        <Form onSubmit={(e) => onSubmitHandler(e)}>
          <CardBody>
            <FormGroup>
              <Input
                type="text"
                placeholder="First Name"
                value={first_name}
                disabled={loader}
                onChange={(e) => {
                  setNameError("");
                  setName(e.target.value);
                }}
              />
              {nameError && <p style={{ color: "red" }}>{nameError}</p>}
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                placeholder="Last Name"
                value={last_name}
                disabled={loader}
                onChange={(e) => {
                  setLastNameError("");
                  setLastName(e.target.value);
                }}
              />
              {lastnameError && <p style={{ color: "red" }}>{lastnameError}</p>}
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                disabled={loader}
                onChange={(e) => {
                  setEmailError("");
                  setEmail(e.target.value);
                }}
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                className="col-12"
                disabled={loader}
                onChange={(e) => {
                  setPasswordError("");
                  setPassword(e.target.value);
                }}
              />
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={password_confirmation}
                className="col-12"
                disabled={loader}
                onChange={(e) => {
                  setConfirmPasswordError("");
                  setConfirmPassword(e.target.value);
                }}
              />
              {confirmpasswordError && (
                <p style={{ color: "red" }}>{confirmpasswordError}</p>
              )}
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button type="submit" color="primary" disabled={loader}>
              {loader ? <Spinner /> : "Add"}
            </Button>
            {!loader && (
              <Button
                type="button"
                color="danger"
                onClick={(e) => history.go(-1)}
              >
                Back
              </Button>
            )}
          </CardFooter>
        </Form>
      </Card>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => dispatch(addingUser(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddUser);
