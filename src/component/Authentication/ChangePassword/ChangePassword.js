import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ChangePassword.css";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CardFooter,
  Modal,
  ModalBody,
  Spinner,
} from "reactstrap";
import Aux from "../../../hoc/_Aux/index";
import { connect } from "react-redux";
import { changingPassword } from "../../../redux/actions/forgetPasswordAction";
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";

const ChangePassword = (props) => {
  const history = useHistory();
  const [oldpassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [oldpasswordError, setOldPasswordError] = useState("");
  const [message, setmessageError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loader, setLoader] = useState(false);

  const validation = () => {
    setConfirmPasswordError("");
    setPasswordError("");
    let error = false;
    if (!oldpassword) {
      error = true;
      setLoader(false);
      setOldPasswordError("Please fill old password");
    }
    if (!password) {
      setLoader(false);
      error = true;
      setPasswordError("Please choose your password");
    } else if (password.length < 8) {
      error = true;
      setLoader(false);
      setPasswordError("Password should have atleast 8 characters");
    } else if (!confirmPassword) {
      error = true;
      setLoader(false);
      setConfirmPasswordError("Please confirm your password");
    } else if (confirmPassword !== password) {
      error = true;
      setLoader(false);
      setConfirmPasswordError("The passwords does not match");
    }
    return error;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validate = validation();
    if (!validate) {
      const obj = {
        newPassword: password,
        oldPassword: oldpassword,
      };
      const res = await props.changePassword(obj);
      if (res.status === 500) {
        ToggleNotification("ServerError");
      } else if (res.status === 400) {
        setConfirmPasswordError(res.message);
        ToggleNotification("ChangePasswordFail");
      } else if (res.status === 200) {
        ToggleNotification("ChangePasswordSuccess");
        history.push("/dashboard");
      }
    }
    setLoader(false);
  };

  return (
    <Aux>
      <div>
        <Card
          style={{ textAlign: "center" }}
          className="col-12 col-sm-6 m-auto"
        >
          <CardHeader>
            <h4>Change Password</h4>
          </CardHeader>
          <Form
            style={{ alignSelf: "center" }}
            className="col-12 "
            onSubmit={(e) => onSubmitHandler(e)}
          >
            <CardBody>
              <FormGroup>
                <Input
                  type="password"
                  placeholder="Old Password"
                  value={oldpassword}
                  disabled={loader}
                  className="col-12"
                  onChange={(e) => {
                    setOldPasswordError("");
                    setOldPassword(e.target.value);
                  }}
                />
              </FormGroup>
              {oldpasswordError && (
                <p style={{ color: "red" }}>{oldpasswordError}</p>
              )}
              <FormGroup>
                <Input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  className="col-12"
                  disabled={loader}
                  onChange={(e) => {
                    setPasswordError("");
                    setPassword(e.target.value);
                  }}
                />
              </FormGroup>
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
              <FormGroup>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  disabled={loader}
                  className="col-12"
                  onChange={(e) => {
                    setConfirmPasswordError("");
                    setConfirmPassword(e.target.value);
                  }}
                />
              </FormGroup>
              {confirmPasswordError && (
                <p style={{ color: "red" }}>{confirmPasswordError}</p>
              )}
            </CardBody>
            <CardFooter>
              <Button type="submit" color="primary" disabled={loader}>
                {loader ? <Spinner /> : "Change"}
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </div>
    </Aux>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePassword: (data) => dispatch(changingPassword(data)),
  };
};

export default connect(null, mapDispatchToProps)(ChangePassword);
