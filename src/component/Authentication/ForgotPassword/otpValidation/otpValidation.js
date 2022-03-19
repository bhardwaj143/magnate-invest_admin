import React, { useState } from "react";
import { Form, FormGroup, Input, Button, Spinner } from "reactstrap";
import { NavLink } from "react-router-dom";
import * as functions from "../../../../functions/function";
import ToggleNotification from "../../../ReusableComponents/Toggle Notifications/ToggleNotification";
import ErrorLine from "../../../ReusableComponents/ErrorLine/ErrorLine";

import logo from "../../../../assets/images/logo.png";

const OtpValidation = (props) => {
  const [otp, setOTP] = useState("");
  const [otpError, setOTPError] = useState("");
  const [loader, setLoader] = useState(false);

  const otpValidation = () => {
    let err = false;
    setOTPError("");
    const otpValidation = functions.OTPValidation(otp);
    if (otpValidation !== false) {
      err = true;
      setOTPError(otpValidation);
    }
    return err;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validation = otpValidation();
    if (!validation) {
      const res = await props.submitHandler(otp);
      // console.log(res);
      if (res.status && res.status === 500) {
        ToggleNotification("ServerError");
      } else if (res.status && res.status === 400) {
        setOTPError(res.message);
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
        <h3 className="mb-4">Reset Password</h3>
        <p style={{ color: "grey" }}>Enter Your OTP!</p>
        <Form onSubmit={(e) => onSubmitHandler(e)}>
          <FormGroup>
            <Input
              type="text"
              value={otp}
              placeholder="OTP"
              disabled={loader}
              onChange={(e) => {
                setOTPError("");
                setOTP(e.target.value);
              }}
            />
            <ErrorLine error={otpError} />
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

export default OtpValidation;
