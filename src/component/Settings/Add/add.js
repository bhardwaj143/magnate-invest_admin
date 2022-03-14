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
} from "reactstrap";
import { connect } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import * as functions from "../../../functions/function";
import ErrorLine from "../../ReusableComponents/ErrorLine/ErrorLine";

import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import One from "./img/profile.png";
import "./add.css";
import { addingBlog } from "../../../redux/actions/blogAction";
import { addingCategory } from "../../../redux/actions/categoryAction";

const AddUser = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [contact, setContact] = useState('');
  const [photo, setPhoto] = useState(One);
  const [prevState, setPrevState] = useState(One);
  const [photoUpload, setPhotoUpload] = useState("");
  const [des, setDes] = useState("");
  const [nameError, setNameError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [desError, setDesError] = useState("");
  const [contactError, setContactError] = useState('')
  const [loader, setLoader] = useState(false);
  const [src, selectFiles] = useState(null);

  const validate = () => {
    let error = false;
    setNameError("");
    setDesError("");
    setContactError('');
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
    // if (photo === prevState) {
    //   error = true;
    //   setPhotoError("Please upload the image of Category");
    // }
    const contactValidation = functions.mobileValidation(contact, 'Contact');
    if(contactValidation)
    {
      error=true;
      setContactError(contactValidation);
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
      formData.append("logo", photoUpload);
      formData.append("address", des);
      formData.append("contact", contact);
      const res = await props.addBlog(formData);
      if (res.status && res.status === 201) {
        ToggleNotification("AddSettingSuccess");
        history.push("/setting/1");
      } else if (res.status && res.status === 500) {
        ToggleNotification("ServerError");
      } else if (res.code && res.code === 400) {
        ToggleNotification("AddSettingFail");
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
          <h3>Add Setting</h3>
        </CardHeader>
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
              {loader ? <Spinner /> : "Add"}
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
      </Card>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBlog: (data) => dispatch(addingCategory(data))
  };
};

export default connect(null, mapDispatchToProps)(AddUser);
