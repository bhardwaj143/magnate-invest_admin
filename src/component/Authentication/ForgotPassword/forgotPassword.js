import React, { useState } from "react";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { connect } from "react-redux";
import "./forgotPassword.css";
import {
  forgetPasswordEmail,
  forgetPasswordOtp,
  resetForgetPassword,
} from "../../../redux/actions/forgetPasswordAction";
import EmailValidation from "./emailValidation/EmailValidation";
import OtpValidation from "./otpValidation/otpValidation";
import ResetValidation from "./resetValidation/ResetValidation";
// import { ModalHeader } from 'react-bootstrap';

const ForgotPassword = (props) => {
  const [render, setRender] = useState("email");
  const [email, setEmail] = useState("");

  const renderFunction = (renderComponent) => {
    setRender(renderComponent);
  };

  const onSubmitHandlerEmail = async (email) => {
    const obj = { email: email };
    const res = await props.emailVerification(obj);
    // console.log(res);
    if (res.status && res.status === 500) {
      return { status: 500, message: null };
    } else if (res.status && res.status === 400) {
      return { status: 400, message: res.message };
    } else if (res.status && res.status === 200) {
      renderFunction("otp");
      setEmail(email);
      return { status: 200 };
    }
  };

  const onSubmitHandlerOTP = async (otp) => {
    const obj = {
      otp: otp * 1,
    };
    const res = await props.otpVerification(obj);
    if (res.status && res.status === 500) {
      return { status: 500 };
    } else if (res.status && res.status === 400) {
      return { status: 400, message: res.message };
    } else if (res.status && res.status === 200) {
      renderFunction("resetPassword");
      return { status: 200 };
    }
  };

  const onSubmitHandlerReset = async (password) => {
    const obj = {
      password: password,
    };
    const res = await props.resetPassword(obj);
    if (res.status && res.status === 500) {
      return { status: 500 };
    } else if (res.status && res.status === 400) {
      return { status: 400, message: res.message };
    } else if (res.status && res.status === 200) {
      return { status: 200 };
    }
  };

  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          {render === "email" ? (
            <EmailValidation submitHandler={onSubmitHandlerEmail} />
          ) : render === "otp" ? (
            <OtpValidation submitHandler={onSubmitHandlerOTP} />
          ) : (
            render === "resetPassword" && (
              <ResetValidation submitHandler={onSubmitHandlerReset} />
            )
          )}
        </div>
      </div>
    </Aux>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    emailVerification: (data) => dispatch(forgetPasswordEmail(data)),
    otpVerification: (data) => dispatch(forgetPasswordOtp(data)),
    resetPassword: (data) => dispatch(resetForgetPassword(data)),
  };
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
