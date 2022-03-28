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

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  gettingParticularSetting,
  updatingSetting,
} from "../../../redux/actions/settingAction";

const AddUser = (props) => {
  const { id } = useParams();

  const history = useHistory();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoUpload, setPhotoUpload] = useState("");

  const [b1, setB1] = useState("");
  const [b2, setB2] = useState("");
  const [b3, setB3] = useState("");

  const [bp1, setbP1] = useState("");
  const [bp2, setbP2] = useState("");
  const [bp3, setbP3] = useState("");

  const [abH, setAbh] = useState('');
  const [abd, setAbd] = useState('');

  const [abhError, setAbhError] = useState('');
  const [abdError, setAbdError] = useState('');

  const [fb, setFb] = useState('');
  const [fbError, setFbError] = useState('');
  const [insta, setInsta] = useState('');
  const [instaError, setInstaError] = useState('');
  const [twitter, setTwitter] = useState('');
  const [twitterError, setTwitterError] = useState('');
  const [yt, setYt] = useState('');
  const [ytError, setYtError] = useState('');

  const [contact, setContact] = useState("");
  const [des, setDes] = useState("");
  const [nameError, setNameError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [desError, setDesError] = useState("");
  const [loader, setLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [contactError, setContactError] = useState("");
  const [errorCode, setErrorCode] = useState();
  const [src, selectFiles] = useState(null);

  const [mname, setMName] = useState('');
  const [mkeyword, setMKeyword] = useState('');
  const [mdes, setMDes] = useState('')

  const [cr, setCR] = useState('');

  const [nemail, setNEmail] = useState('');
  const [npassword, setNPassword] = useState('')

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
    console.log(props.cow);
    if (props.cow) {
      setName(props.cow.name ? props.cow.name : null);
      setPhoto(
        props.cow.logo ? `${constants.baseURL2}/${props.cow.logo}` : null
      );
      setContact(props.cow.contact ? props.cow.contact : "");
      setDes(props.cow.address ? props.cow.address : null);
      setbP1(
        props.cow.banner1 ? `${constants.baseURL2}/${props.cow.banner1}` : null
      );
      setbP2(
        props.cow.banner2 ? `${constants.baseURL2}/${props.cow.banner2}` : null
      );
      setbP3(
        props.cow.banner3 ? `${constants.baseURL2}/${props.cow.banner3}` : null
      );
      setAbh(props.cow.about_us_heading ? props.cow.about_us_heading : null)
      setAbd(props.cow.about_us_detail ? props.cow.about_us_detail : null)
      setFb(props.cow.facebook ? props.cow.facebook : null)
      setInsta(props.cow.instagram ? props.cow.instagram : null)
      setTwitter(props.cow.twitter ? props.cow.twitter : null)
      setYt(props.cow.youtube ? props.cow.youtube : null)
      setMName(props.cow.metaName ? props.cow.metaName : null)
      setMKeyword(props.cow.metaKeyword ? props.cow.metaKeyword : null)
      setMDes(props.cow.metaDescription ? props.cow.metaDescription : null)
      setCR(props.cow.copyRight ? props.cow.copyRight : null)
      setNEmail(props.cow.nodeMailerEmail ? props.cow.nodeMailerEmail : null)
      setNPassword(props.cow.nodeMailerPassword ? props.cow.nodeMailerPassword : null)
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
    const contactValidation = functions.mobileValidation(
      contact,
      "mobile number"
    );
    if (contactValidation) {
      error = true;
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
      if (photoUpload) {
        formData.append("logo", photoUpload);
      }
      formData.append("address", des);
      formData.append("contact", contact);
      formData.append("about_us_detail", abd);
      formData.append("about_us_heading", abH);
      if(b1) {
        formData.append("banner1", b1);

      }
      if(b2) {
        formData.append("banner2", b2);
      }
      if(b3){
        formData.append("banner3", b3);
      }
      formData.append("facebook", fb);
      formData.append("instagram", insta);
      formData.append("twitter", twitter);
      formData.append("youtube", yt);
      formData.append("metaName", mname);
      formData.append("metaDescription", mdes);
      formData.append("metaKeyword", mkeyword);
      formData.append("nodeMailerEmail", nemail);
      formData.append("nodeMailerPassword", npassword);

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

  console.log(b1, b2, b3)
console.log(props.cow)
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

  const handleFileChange1 = (e) => {
    if (e.target.files.length !== 0) {
      imageHandler1(e);
      selectFiles(URL.createObjectURL(e.target.files[0]));
    }
  };

  const imageHandler1 = (e) => {
    setB1(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setbP1(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleFileChange2 = (e) => {
    if (e.target.files.length !== 0) {
      imageHandler2(e);
      selectFiles(URL.createObjectURL(e.target.files[0]));
    }
  };

  const imageHandler2 = (e) => {
    setB2(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setbP2(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleFileChange3 = (e) => {
    if (e.target.files.length !== 0) {
      imageHandler3(e);
      selectFiles(URL.createObjectURL(e.target.files[0]));
    }
  };

  const imageHandler3 = (e) => {
    setB3(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setbP3(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onTitleChange1 = (event, editor) => {
    setAbh(editor.getData());
  };

  const onTitleChange2 = (event, editor) => {
    setAbd(editor.getData());
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
              <hr />
              <h4>About Us</h4>
              <div className="row">
                <div className="col-12 col-md-5 col-lg-4 ">
                  <img src={bp1} alt="Dummy " width="100%" height="auto" />

                  <FormGroup className="">
                    <Input
                      className="blue-button"
                      disabled={loader}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        // setPhotoError("");
                        handleFileChange1(e);
                      }}
                    />
                    <ErrorLine error={photoError} />
                  </FormGroup>
                </div>
                <div className="col-12 col-md-5 col-lg-4 ">
                  <img src={bp2} alt="Dummy " width="100%" height="auto" />

                  <FormGroup className="">
                    <Input
                      className="blue-button"
                      disabled={loader}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        // setPhotoError("");
                        handleFileChange2(e);
                      }}
                    />
                    <ErrorLine error={photoError} />
                  </FormGroup>
                </div>
                <div className="col-12 col-md-5 col-lg-4 ">
                  <img src={bp3} alt="Dummy " width="100%" height="auto" />

                  <FormGroup className="">
                    <Input
                      className="blue-button"
                      disabled={loader}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        // setPhotoError("");
                        handleFileChange3(e);
                      }}
                    />
                    <ErrorLine error={photoError} />
                  </FormGroup>
                </div>
              </div>
              <FormGroup className="">
                  <Label>About Us Heading</Label>

                  <CKEditor
                    editor={ClassicEditor}
                    data={abH}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      setAbhError("");
                      onTitleChange1(event, editor);
                    }}
                  />
                  <ErrorLine error={abhError} />
                </FormGroup>
                <FormGroup className="">
                  <Label>About Us Detail</Label>

                  <CKEditor
                    editor={ClassicEditor}
                    data={abd}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      setAbdError("");
                      onTitleChange2(event, editor);
                    }}
                  />
                  <ErrorLine error={abdError} />
                </FormGroup>
                <FormGroup className="">
                    <Label>Facebook</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="Facebook Link"
                      value={fb}
                      onChange={(e) => {
                        setFbError("");
                        setFb(e.target.value);
                      }}
                    />
                    <ErrorLine error={fbError} />
                  </FormGroup>
                  <FormGroup className="">
                    <Label>Instagram</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="Instagram Link"
                      value={insta}
                      onChange={(e) => {
                        setInstaError("");
                        setInsta(e.target.value);
                      }}
                    />
                    <ErrorLine error={instaError} />
                  </FormGroup>
                  <FormGroup className="">
                    <Label>Twitter</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="Twitter Link"
                      value={twitter}
                      onChange={(e) => {
                        setTwitterError("");
                        setTwitter(e.target.value);
                      }}
                    />
                    <ErrorLine error={twitterError} />
                  </FormGroup>
                  <FormGroup className="">
                    <Label>Youtube</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="Youtube Link"
                      value={yt}
                      onChange={(e) => {
                        setYtError("");
                        setYt(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <hr/>
                  <h4>Meta</h4>
                  <FormGroup className="">
                    <Label>Name</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="name"
                      value={mname}
                      onChange={(e) => {
                        setMName(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="">
                    <Label>Keyword</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="keyword"
                      value={mkeyword}
                      onChange={(e) => {
                        setMKeyword(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="">
                    <Label>Description</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="description"
                      value={mdes}
                      onChange={(e) => {
                        setMDes(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="">
                    <Label>Copyright</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="Copyright"
                      value={cr}
                      onChange={(e) => {
                        setCR(e.target.value);
                      }}
                    />
                  </FormGroup>
                      <hr/>
                      <h4>Node Mailer</h4>

                  <FormGroup className="">
                    <Label>Email</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="Email"
                      value={nemail}
                      onChange={(e) => {
                        setNEmail(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="">
                    <Label>Password</Label>
                    <Input
                      disabled={loader}
                      type="text"
                      placeholder="Password"
                      value={npassword}
                      onChange={(e) => {
                        setNPassword(e.target.value);
                      }}
                    />
                  </FormGroup>
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
