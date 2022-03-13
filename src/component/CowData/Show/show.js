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
import ErrorLine from "../../ReusableComponents/ErrorLine/ErrorLine";
import useQuery from "../../ReusableComponents/customHooks/queryHook";

import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import { addingCustomer } from "../../../redux/actions/customerAction";
import { gettingCow } from "../../../redux/actions/cowAction";
import NoDataError from "../../ReusableComponents/ErrorPage/NoDataError/NoDataError";
import ServerError from "../../ReusableComponents/ErrorPage/ServerError/ServerError";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import * as constants from "../../../constants/appConstants";
import "./show.css";

const AddUser = (props) => {
  const query = useQuery();
  const id = query.get("id") || "";

  const history = useHistory();
  const [loader, setLoader] = useState(true);
  const [pageLoader, setPageLoader] = useState(false);
  const [errorCode, setErrorCode] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setPageLoader(true);
    const res = await props.getCow(id);
    if (res === 404) {
      setErrorCode(res);
    } else if (res === 500) {
      setErrorCode(res);
    }
    setPageLoader(false);
  };

  return (
    <>
      <Breadcrumb />
      <Card>
        <CardHeader>
          <h3>Cow</h3>
        </CardHeader>
        {pageLoader ? (
          <ModifiedLoader />
        ) : errorCode === 500 ? (
          <ServerError />
        ) : errorCode === 404 ? (
          <NoDataError />
        ) : (
          <Form>
            <CardBody>
              <div className="row">
                <div className="col-12 col-md-5 col-lg-4 col-xl-3">
                  <img
                    alt="Cow Pic "
                    src={
                      props.cow && props.cow.profile_pic
                        ? `${constants.baseURL}${props.cow.profile_pic}`
                        : null
                    }
                    width="100%"
                    height="auto"
                  />

                  {/* <FormGroup className="">
                    <Input
                      className="blue-button"
                      disabled={loader}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setPhotoError("");
                        imageHandler(e);
                      }}
                    />
                  </FormGroup> */}
                </div>

                <div className="col-12 col-md-7 col-lg-8 col-xl-9">
                  <FormGroup className="">
                    <Label>Name</Label>
                    <Input
                      disabled={true}
                      type="text"
                      value={
                        props.cow && props.cow.name ? props.cow.name : null
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Cow Description</Label>
                    <Input
                      type="textarea"
                      row={3}
                      disabled={true}
                      value={
                        props.cow && props.cow.description
                          ? props.cow.description
                          : null
                      }
                    />
                  </FormGroup>
                </div>
              </div>
            </CardBody>
            {/* <CardBody>
              <Row>
                <FormGroup className="col-12 col-md-3">
                  <img
                    width="200px"
                    alt="Cow Pic "
                    src={
                      props.cow && props.cow.profile_pic
                        ? `${constants.baseURL}${props.cow.profile_pic}`
                        : null
                    }
                    height="200px"
                  />
                </FormGroup>
                <FormGroup className="col-12 col-md-3">
                  <Label>Name</Label>
                  <Input
                    disabled={true}
                    type="text"
                    value={props.cow && props.cow.name ? props.cow.name : null}
                  />
                </FormGroup>
              </Row>
              <FormGroup>
                <Label>Cow Description</Label>
                <Input
                  type="textarea"
                  row={3}
                  disabled={true}
                  value={
                    props.cow && props.cow.description
                      ? props.cow.description
                      : null
                  }
                />
              </FormGroup>
            </CardBody> */}
            <CardFooter>
              <Button
                type="submit"
                color="primary"
                onClick={(e) =>
                  history.push(
                    `/update-cow?id=${props.cow.id ? props.cow.id : null}`
                  )
                }
              >
                {/* {loader ? <Spinner /> : "Add"} */}
                Edit
              </Button>
              <Button
                type="button"
                color="danger"
                onClick={(e) => history.push(`/cows/1`)}
              >
                Back
              </Button>
            </CardFooter>
          </Form>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    cow: state.cow.cow,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCustomer: (data) => dispatch(addingCustomer(data)),
    getCow: (id) => dispatch(gettingCow(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
