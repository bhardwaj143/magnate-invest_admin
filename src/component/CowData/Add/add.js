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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ReactCrop from "react-image-crop";
import { connect } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import * as functions from "../../../functions/function";
import ErrorLine from "../../ReusableComponents/ErrorLine/ErrorLine";

import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import { addingCustomer } from "../../../redux/actions/customerAction";
import One from "./img/profile.png";
import { addingCow } from "../../../redux/actions/cowAction";
import "./add.css";

const AddUser = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(One);
  const [prevState, setPrevState] = useState(One);
  const [photoUpload, setPhotoUpload] = useState("");
  const [des, setDes] = useState("");
  const [nameError, setNameError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [desError, setDesError] = useState("");
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [src, selectFiles] = useState(null);
  const [crop, setCrop] = useState({ aspect: 3 / 2 });
  const [cropButton, setCropButton] = useState(false);

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
    if (photo === prevState) {
      error = true;
      setPhotoError("Please upload the image of Cow");
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
      formData.append("profile_pic", photoUpload);
      formData.append("description", des);
      const res = await props.addCow(formData);
      if (res.status && res.status === 200) {
        ToggleNotification("AddCowSuccess");
        history.push("/cows/1");
      } else if (res.status && res.status === 500) {
        ToggleNotification("ServerError");
      } else if (res.code && res.code === 400) {
        ToggleNotification("AddCowFail");
      }
    }
    setLoader(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length !== 0) {
      imageHandler(e);
      selectFiles(URL.createObjectURL(e.target.files[0]));
      setCropButton(true);
    }
  };

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    if (canvas.width !== 0 && canvas.height !== 0) {
      const base64Image = canvas.toDataURL("image/jpeg");
      if (base64Image !== "data:," && base64Image !== null) {
        setPhoto(base64Image);
      }
      // canvas.toBlob((blob) => {
      //   setResult(blob);
      // });
      setModal(false);
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setPhotoUpload(blob);
            }
            // blob.name = fileName;
            resolve(blob);
          },
          "image/jpeg",
          1
        );
      });
    }
    setModal(false);
  }

  // console.log(result);

  // const handleImageLoaded = (image) => {
  //   console.log(image);
  // };

  // const handleOnCropComplete = (crop, pixelCrop) => {
  //   console.log(crop, pixelCrop);
  // };

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
      <Modal isOpen={modal}>
        <ModalHeader>Resize</ModalHeader>
        <ModalBody>
          <ReactCrop
            src={src}
            onImageLoaded={setImage}
            // onComplete={handleOnCropComplete}
            crop={crop}
            onChange={setCrop}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="primary" onClick={getCroppedImg}>
            Save
          </Button>
          <Button color="danger" type="button" onClick={(e) => setModal(false)}>
            close
          </Button>
        </ModalFooter>
      </Modal>
      <Breadcrumb />
      <Card>
        <CardHeader>
          <h3>Add Cow</h3>
        </CardHeader>
        <Form onSubmit={(e) => onSubmitHandler(e)}>
          <CardBody>
            <div className="row">
              <div className="col-12 col-md-5 col-lg-4 col-xl-3">
                {/* {result ? (
                  <img src={result} alt="cropped " className="image-fluid" />
                ) : ( */}
                <img src={photo} alt="Dummy " width="100%" height="auto" />
                {/* )} */}
                <FormGroup className="">
                  <Input
                    className="blue-button"
                    disabled={loader}
                    type="file"
                    accept="image/*"
                    // onChange={(e) => {
                    //   setPhotoError("");
                    //   imageHandler(e);
                    // }}
                    onChange={(e) => {
                      setPhotoError("");
                      handleFileChange(e);
                    }}
                  />
                  <ErrorLine error={photoError} />
                </FormGroup>
                {photo !== prevState && cropButton && (
                  <Button
                    type="button"
                    color="primary"
                    disabled={loader}
                    onClick={(e) => {
                      setCrop({ aspect: 3 / 2 });
                      setModal(true);
                    }}
                  >
                    Crop
                  </Button>
                )}
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

                <FormGroup>
                  <Label>Cow Description</Label>
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
              {/* Add */}
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
    addCustomer: (data) => dispatch(addingCustomer(data)),
    addCow: (data) => dispatch(addingCow(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddUser);
