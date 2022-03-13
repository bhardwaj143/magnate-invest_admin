import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, FormGroup, Button, Input } from "reactstrap";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import logo from "../../../assets/images/logo.png";
import "./signin.css";
import { loggingUser } from "../../../redux/actions/loginAction";
import * as functions from "../../../functions/function";
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";

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
      setLoader(false);
    }
    if (passwordValidation !== false) {
      err = true;
      setPasswordError(passwordValidation);
      setLoader(false);
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
      if (res.status && res.status === 500) {
        ToggleNotification("ServerError");
        setLoader(false);
      } else if (res.code && (res.code === 400 || res.code === 404)) {
        ToggleNotification("Login Fail");
        setLoader(false);
      } else {
        ToggleNotification("Success Login");
        window.location.href = "/dashboard";
        setLoader(false);
      }
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
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
              <img src={logo} alt="Bovinae" className="loginLogo" />
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
                </FormGroup>
                {emailError && <p style={{ color: "red" }}>* {emailError}</p>}
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
                </FormGroup>
                {passwordError && (
                  <p style={{ color: "red" }}>* {passwordError}</p>
                )}
                <Button
                  className="btn shadow-2 mb-4"
                  color="primary"
                  type="submit"
                  disabled={loader}
                >
                  {loader ? <Spinner /> : "Login"}
                </Button>
              </Form>
              {/* <p className="mb-2 text-muted">
                <NavLink to="/auth/forgot-password">Forgot Password </NavLink>
              </p> */}
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
