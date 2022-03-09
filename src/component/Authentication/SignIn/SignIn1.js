import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Button, Input } from "reactstrap";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import "./signin.css";
import { loggingUser } from "../../../redux/actions/loginAction";
import * as functions from "../../../functions/function";
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import ErrorLine from "../../ReusableComponents/ErrorLine/ErrorLine";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loader, setLoader] = useState(false);

  const loginValidation = () => {
    setEmailError("");
    setPasswordError("");
    let err = false;
    const emailValidation = functions.emailValidation(email);
    const passwordValidation = functions.passwordValidation(password);
    if (emailValidation !== false) {
      err = true;
      setEmailError(emailValidation);
    }
    if (passwordValidation !== false) {
      err = true;
      setPasswordError(passwordValidation);
    }
    return err;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validate = loginValidation();
    if (!validate) {
      const obj = {
        email,
        password,
      };
      const res = await props.loginUser(obj);
      if (res && res.status && res.status === 200)
      {
        ToggleNotification("Success Login");
        window.location.href = "/dashboard";
      }
    }
    setLoader(false);
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
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              <Form onSubmit={(e) => onSubmitHandler(e)}>
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmailError("");
                      setEmail(e.target.value);
                    }}
                    disabled={loader}
                  />
                  <ErrorLine error={emailError} />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => {
                      setPasswordError("");
                      setPassword(e.target.value);
                    }}
                    disabled={loader}
                  />
                  <ErrorLine error={passwordError} /> 
                </FormGroup>
                <Button
                  className="btn shadow-2 mb-4"
                  color="primary"
                  type="submit"
                  disabled={loader}
                >
                  {loader ? <Spinner /> : "Login"}
                </Button>
              </Form>
              <p className="mb-2 text-muted">
                <NavLink to="/auth/forgot-password">Forgot password </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (data) => dispatch(loggingUser(data)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
