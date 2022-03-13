import React, { useState } from "react";
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
import { addingUser } from "../../../redux/actions/userAction";
import ErrorLine from "../../ReusableComponents/ErrorLine/ErrorLine";

const AddUser = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [loader, setLoader] = useState(false);

  const validate = () => {
    let error = false;
    setNameError("");
    setMobileError("");
    setAddressError("");
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
    const mobileValidation = functions.mobileValidation(
      mobile,
      "mobile number"
    );
    if (mobileValidation) {
      error = true;
      setMobileError(mobileValidation);
    }
    return error;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validation = validate();
    if (!validation) {
      const obj = {
        name: name,
        mobile: mobile,
        address: address,
      };
      const res = await props.addUser(obj);
      if (res.status && res.status === 201) {
        ToggleNotification("AddUserSuccess");
        history.push("/users/1");
      } else if (res.status && res.status === 500) {
        ToggleNotification("ServerError");
      } else if (res.code && res.code === 400) {
        ToggleNotification("AddUserFail", res.message);
      }
    }
    setLoader(false);
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
              <FormGroup className="col-6 col-md-6">
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
              </FormGroup>
            </Row>
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
              {loader ? <Spinner /> : "Add"}
            </Button>
            <Button
              disabled={loader}
              type="button"
              color="danger"
              onClick={(e) => history.go(-1)}
            >
              Back
            </Button>
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
