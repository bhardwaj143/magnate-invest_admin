import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Label,
  Input,
  Form,
  FormGroup,
  Spinner,
  Row,
} from "reactstrap";
import { connect } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import * as functions from "../../../functions/function";
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import ErrorLine from "../../ReusableComponents/ErrorLine/ErrorLine";
import { useParams } from "react-router";

import ServerError from "../../ReusableComponents/ErrorPage/ServerError/ServerError";
import NoDataError from "../../ReusableComponents/ErrorPage/NoDataError/NoDataError";
import { gettingUser, updatingUser } from "../../../redux/actions/userAction";

const AddUser = (props) => {
  const { id } = useParams();

  const history = useHistory();
  const [name, setName] = useState("");
  // const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState("");
  // const [mobileError, setMobileError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [pageLoader, setPageLoader] = useState(true);
  const [errorCode, setErrorCode] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setPageLoader(true);
    const res = await props.getUser(id);
    if (res.code && (res.code === 404 || res.code === 400)) {
      setErrorCode(res.code);
    } else if (res.status && res.status === 500) {
      setErrorCode(res.status);
    }
    setPageLoader(false);
  };

  useEffect(() => {
    if (props.user) {
      setName(props.user.name ? props.user.name : "N/A");
      setAddress(props.user.address ? props.user.address : "N/A");
      // setMobile(props.user.mobile ? props.user.mobile : "N/A");
    }
  }, [props.user]);

  const validate = () => {
    let error = false;
    setNameError(""); //done
    // setMobileError("");
    setAddressError(""); //done
    const nameValidation = functions.textValidation(name, "name");
    if (nameValidation) {
      error = true;
      setNameError(nameValidation);
    }
    const addressValidation = functions.textValidation(address, "address");
    if (addressValidation) {
      error = true;
      setAddressError(addressValidation);
    }
    // const mobileValidation = functions.mobileValidation(
    //   mobile,
    //   "mobile number"
    // );
    // if (mobileValidation) {
    //   error = true;
    //   setMobileError(mobileValidation);
    // }
    return error;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validation = validate();
    if (!validation) {
      const obj = {
        name: name,
        // mobile: mobile,
        address: address,
      };
      const res = await props.updateUser(id, obj);
      if (res.status && res.status === 200) {
        ToggleNotification("UpdateUserSuccess");
        history.push(`/user-detail/${id}`);
      } else if (res.status && res.status === 500) {
        ToggleNotification("ServerError");
      } else if (res.code && (res.code === 400 || res.code === 404)) {
        ToggleNotification("UpdateUserFail", res.message);
      }
    }
    setLoader(false);
  };

  // console.log(props.user);

  return (
    <>
      <Breadcrumb />
      <Card>
        <CardHeader>
          <h3>Update User</h3>
        </CardHeader>
        {pageLoader ? (
          <ModifiedLoader />
        ) : errorCode === 500 ? (
          <ServerError />
        ) : errorCode === 404 ? (
          <NoDataError />
        ) : (
          <>
            <Form onSubmit={(e) => onSubmitHandler(e)}>
              <CardBody>
                <Row>
                  <FormGroup className="col-6 col-md-6">
                    <Label>Name</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setNameError("");
                        setName(e.target.value);
                      }}
                    />
                    <ErrorLine error={nameError} />
                  </FormGroup>
                  {/* <FormGroup className="col-6 col-md-6">
                    <Label>Mobile Number</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="Mobile Number"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => {
                        setMobileError("");
                        setMobile(e.target.value);
                      }}
                    />
                    <ErrorLine error={mobileError} />
                  </FormGroup> */}
                </Row>
                <Row></Row>
                <Row>
                  <FormGroup className="col-12">
                    <Label>Address</Label>
                    <Input
                      disabled={loader}
                      type="textarea"
                      row={3}
                      value={address}
                      onChange={(e) => {
                        setAddressError("");
                        setAddress(e.target.value);
                      }}
                    />
                    <ErrorLine error={addressError} />
                  </FormGroup>
                </Row>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary" disabled={loader}>
                  {loader ? <Spinner /> : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  color="danger"
                  onClick={(e) => history.go(-1)}
                  disabled={loader}
                >
                  Back
                </Button>
              </CardFooter>
            </Form>
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
    updateUser: (id, data) => dispatch(updatingUser(id, data)),
    getUser: (id) => dispatch(gettingUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
