import React, { useState } from "react";
import { Form, FormGroup, Input, Button, Spinner } from "reactstrap";
import { NavLink } from "react-router-dom";
import ToggleNotification from "../../../ReusableComponents/Toggle Notifications/ToggleNotification";
import ErrorLine from "../../../ReusableComponents/ErrorLine/ErrorLine";
import * as functions from "../../../../functions/function";

import logo from "../../../../assets/images/logo.png";

const EmailValidation = (props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loader, setLoader] = useState(false);

  const emailValidation = () => {
    let err = false;
    setEmailError("");
    const emailValidation = functions.emailValidation(email);
    if (emailValidation !== false) {
      err = true;
      setEmailError(emailValidation);
    }
    return err;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validation = emailValidation();
    if (!validation) {
      const res = await props.submitHandler(email);
      if (res.status && res.status === 500) {
        ToggleNotification("ServerError");
      } else if (res.status && res.status === 400) {
        setEmailError(res.message);
      }
    }
    setLoader(false);
  };

  return (
    <div className="card">
      <div className="card-body text-center">
        <div className="mb-4">
          <img src={logo} alt="Bovinae" className="forgotPasswordLogo" />
        </div>
        <h3 className="mb-4">Forgot Password</h3>
        <Form onSubmit={(e) => onSubmitHandler(e)}>
          <FormGroup>
            <Input
              type="text"
              value={email}
              placeholder="Email"
              disabled={loader}
              onChange={(e) => {
                setEmailError("");
                setEmail(e.target.value);
              }}
            />
            <ErrorLine error={emailError} />
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

export default EmailValidation;
