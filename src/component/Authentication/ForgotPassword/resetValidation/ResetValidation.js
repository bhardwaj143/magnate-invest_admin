import React, { useState } from "react";
import { Form, FormGroup, Input, Button, Spinner } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import * as functions from "../../../../functions/function";
import ToggleNotification from "../../../ReusableComponents/Toggle Notifications/ToggleNotification";
import ErrorLine from "../../../ReusableComponents/ErrorLine/ErrorLine";

const ResetValidation = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loader, setLoader] = useState(false);

  const resetValidation = () => {
    setConfirmPasswordError("");
    setPasswordError("");
    let err = false;
    const resetPasswordValidation = functions.newPasswordValidation(
      password,
      confirmPassword
    );
    if (resetPasswordValidation !== false) {
      err = true;
      setConfirmPasswordError(resetPasswordValidation);
    }
    return err;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validation = resetValidation();
    if (!validation) {
      const res = await props.submitHandler(password);
      if (res.status === 500) {
        ToggleNotification("ServerError");
      } else if (res.status === 400) {
        setConfirmPasswordError(res.message);
      } else if (res.status === 200) {
        ToggleNotification("ForgetPasswordSuccess");
        history.replace("/auth/signin-1");
      }
    }
    setLoader(false);
  };

  return (
    <div className="card">
      <div className="card-body text-center">
        <div className="mb-4">
          <i className="feather icon-unlock auth-icon" />
        </div>
        <h3 className="mb-4">Reset Password</h3>
        <p style={{ color: "grey" }}>Enter New Password</p>
        <Form onSubmit={(e) => onSubmitHandler(e)}>
          <FormGroup>
            <Input
              type="password"
              value={password}
              placeholder="New Password"
              disabled={loader}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorLine error={passwordError} />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              disabled={loader}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <ErrorLine error={confirmPasswordError} />
          </FormGroup>
          <Button
            className="btn shadow-2 mb-4"
            color="primary"
            type="submit"
            disabled={loader}
          >
            {loader ? <Spinner /> : "Submit"}
          </Button>
        </Form>
        <p className="mb-2 text-muted">
          Back to <NavLink to="/auth/signin-1">Login </NavLink>
        </p>
        {/* <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p> */}
      </div>
    </div>
  );
};

export default ResetValidation;
