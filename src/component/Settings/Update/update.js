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
} from "reactstrap";
import { connect } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import * as functions from "../../../functions/function";
import ErrorLine from "../../ReusableComponents/ErrorLine/ErrorLine";
import NoDataError from "../../ReusableComponents/ErrorPage/NoDataError/NoDataError";
import ServerError from "../../ReusableComponents/ErrorPage/ServerError/ServerError";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";

import { useParams } from "react-router-dom";

import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import * as constants from "../../../constants/appConstants";

import {gettingParticularSetting, updatingSetting} from "../../../redux/actions/settingAction"; 

const AddUser = (props) => {
  const {id} = useParams();

  const history = useHistory();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoUpload, setPhotoUpload] = useState("");
  const [contact, setContact] = useState('')
  const [des, setDes] = useState("");
  const [nameError, setNameError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [desError, setDesError] = useState("");
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [contactError, setContactError] = useState('');
  const [errorCode, setErrorCode] = useState();
  const [src, selectFiles] = useState(null);

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

  useEffect(() => {
    if (props.cow) {
      setName(props.cow.name ? props.cow.name : null);
      setPhoto(
        props.cow.logo
          ? `${constants.baseURL2}/${props.cow.logo}`
          : null
      );
      setContact(props.cow.contact ? props.cow.contact : '' );
      setDes(props.cow.address ? props.cow.address : null);
    }
  }, [props.cow]);

  const validate = () => {
    let error = false;
    setNameError("");
    setDesError("");
    const nameValidation = functions.textValidation(name, "name");
    if (nameValidation) {
      setNameError(nameValidation);
      error = true;
    }
    const desValidation = functions.textValidation(des, "description");
    if (desValidation) {
      setDesError(desValidation);
      error = true;
    }
    const contactValidation = functions.mobileValidation(contact, "mobile number")
    if(contactValidation)
    {
      error = true;
      setContactError(contactValidation)
    }
    return error;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validation = validate();
    if (!validation) {
      const formData = new FormData();
      formData.append("name", name);
      if (photoUpload) {
        formData.append("logo", photoUpload);
      }
      formData.append("address", des);
      formData.append("contact", contact);
      const res = await props.updateCow(id, formData);
      if (res.status && res.status === 200) {
        ToggleNotification("UpdateSettingSuccess");
        history.push(`/update-setting`);
      } else if (res.status && res.status === 500) {
        ToggleNotification("ServerError");
      } else if (res.code && res.code === 400) {
        ToggleNotification("UpdateSettingFail", res.message);
      }
    }
    setLoader(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length !== 0) {
      imageHandler(e);
      selectFiles(URL.createObjectURL(e.target.files[0]));
    }
  };

  const imageHandler = (e) => {
    setPhotoUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPhoto(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Breadcrumb />
      <Card>
        <CardHeader>
          <h3>Update Setting</h3>
        </CardHeader>
        {pageLoader ? (
          <ModifiedLoader />
        ) : errorCode === 500 ? (
          <ServerError />
        ) : errorCode === 404 ? (
          <NoDataError />
        ) : (
          <Form onSubmit={(e) => onSubmitHandler(e)}>
            <CardBody>
              <div className="row">
                <div className="col-12 col-md-5 col-lg-4 col-xl-3">
                  <img src={photo} alt="Dummy " width="100%" height="auto" />

                  <FormGroup className="">
                    <Input
                      className="blue-button"
                      disabled={loader}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setPhotoError("");
                        handleFileChange(e);
                      }}
                    />
                    <ErrorLine error={photoError} />
                  </FormGroup>
                </div>

                <div className="col-12 col-md-7 col-lg-8 col-xl-9">
                  <FormGroup className="">
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

                  <FormGroup className="">
                    <Label>Contact</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="Mobile Number"
                      value={contact}
                      onChange={(e) => {
                        setContactError("");
                        setContact(e.target.value);
                      }}
                    />
                    <ErrorLine error={contactError} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Address</Label>
                    <Input
                      type="textarea"
                      disabled={loader}
                      row={3}
                      value={des}
                      onChange={(e) => {
                        setDesError("");
                        setDes(e.target.value);
                      }}
                    />
                    <ErrorLine error={desError} />
                  </FormGroup>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Button type="submit" disabled={loader} color="primary">
                {loader ? <Spinner /> : "Save Changes"}
              </Button>
              <Button
                type="button"
                color="danger"
                disabled={loader}
                onClick={(e) => history.go(-1)}
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

const mapStateToProps = (state) => {
  return {
    cow: state.setting.setting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCow: (id) => dispatch(gettingParticularSetting(id)),
    updateCow: (id, data) => dispatch(updatingSetting(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
