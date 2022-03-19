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
import { Breadcrumb, FormCheck } from "react-bootstrap";
import * as functions from "../../../functions/function";
import ErrorLine from "../../ReusableComponents/ErrorLine/ErrorLine";

import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import One from "./img/profile.png";
import "./add.css";
import { addingBlog } from "../../../redux/actions/blogAction";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Select from 'react-select';
import { gettingAllCategories } from "../../../redux/actions/categoryAction";

const AddUser = (props) => {
  const history = useHistory();
  const [name, setName] = useState("<p>Title</p>");
  const [photo, setPhoto] = useState(One);
  const [prevState, setPrevState] = useState(One);
  const [photoUpload, setPhotoUpload] = useState("");
  const [des, setDes] = useState("<p>Description</p>");
  const [nameError, setNameError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [desError, setDesError] = useState("");
  const [metaName, setMetaName] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaDescriptionError, setmetaDescriptionError] = useState("");
  const [metaKeywordError, setmetaKeywordError] = useState("");
  const [metaNameError, setmetaNameError] = useState("");
  const [trending, setTrending] = useState(false);
  const [popular, setPopular] = useState(false);
  const [loader, setLoader] = useState(false);
  const [src, selectFiles] = useState(null);

  const [categoryId, setCategoryId] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const [options,setOptions] = useState('');

  useEffect(() => {
    getData();
  },[])

  const getData = async() => {
    await props.getCategories('','');
  }

  useEffect(() => {
    if(props.category)
    {
      const updatedArray = [];
      props.category.map((el) => {
        updatedArray.push({value:el._id, label:el.name})
      })
      setOptions(updatedArray)
    }
  },[props.category])

  const validate = () => {
    let error = false;
    setNameError("");
    setDesError("");
    setmetaDescriptionError("");
    setmetaKeywordError("");
    setmetaNameError("");
    setCategoryError('')
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
    const metaNameValidation = functions.textValidation(metaName, "metaName");
    if (metaNameValidation) {
      setmetaNameError(metaNameValidation);
      error = true;
    }
    const metaDescValidation = functions.textValidation(metaDescription, "metaDescription");
    if (metaDescValidation) {
      setmetaDescriptionError(metaDescValidation);
      error = true;
    }
    const metaKeywordValidation = functions.textValidation(metaKeyword, "metaKeyword");
    if (metaKeywordValidation) {
      setmetaKeywordError(metaKeywordValidation);
      error = true;
    }
   
    if (photo === prevState) {
      error = true;
      setPhotoError("Please upload the image of Cow");
    }
    if(!categoryId)
    {
      error = true;
      setCategoryError('Please select a category');
    }
    return error;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validation = validate();
    if (!validation) {
      const formData = new FormData();
      formData.append("title", name);
      formData.append("blog_Picture", photoUpload);
      formData.append("discription", des);
      formData.append("metaDescription", metaDescription);
      formData.append("metaKeyword", metaKeyword);
      formData.append("metaName", metaName);
      formData.append("isTreanding", trending);
      formData.append("isPopular", popular);
      formData.append("categoryId", categoryId);

      const res = await props.addBlog(formData);
      if (res.status && res.status === 201) {
        ToggleNotification("AddBlogSuccess");
        history.push("/blog/1");
      } else if (res.status && res.status === 500) {
        ToggleNotification("ServerError");
      } else if (res.code && res.code === 400) {
        ToggleNotification("AddBlogFail");
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

  const onDescChange = (event, editor) => {
    setDes(editor.getData());
  };
  const onTitleChange = (event, editor) => {
    setName(editor.getData());
  };
  return (
    <>
      <Breadcrumb />
      <Card>
        <CardHeader>
          <h3>Add Blog</h3>
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
                  <Label>Title</Label>

                  <CKEditor
                    editor={ClassicEditor}
                    data={name}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      setNameError("");
                      onTitleChange(event, editor);
                    }}
                  />
                  <ErrorLine error={nameError} />
                </FormGroup>

                <FormGroup>
                  <Label>Description</Label>

                  <CKEditor
                    editor={ClassicEditor}
                    data={des}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      onDescChange(event, editor);
                    }}
                  />
                  <ErrorLine error={desError} />
                </FormGroup>
                <FormGroup className="">
                  <Label>Meta Name</Label>
                  <Input
                    disabled={loader}
                    type="text"
                    placeholder="Meta Name"
                    value={metaName}
                    onChange={(e) => {
                      setMetaName(e.target.value);
                    }}
                  />
                  <ErrorLine error={metaNameError} />
                </FormGroup>
                <FormGroup className="">
                  <Label>Meta Description </Label>
                  <Input
                    disabled={loader}
                    type="textarea"
                    placeholder="Meta Description"
                    value={metaDescription}
                    onChange={(e) => {
                      setMetaDescription(e.target.value);
                    }}
                  />
                  <ErrorLine error={metaDescriptionError} />
                </FormGroup>
                <FormGroup className="">
                  <Label>Meta Keyword</Label>
                  <Input
                    disabled={loader}
                    type="text"
                    placeholder="Meta Keyword"
                    value={metaKeyword}
                    onChange={(e) => {
                      setMetaKeyword(e.target.value);
                    }}
                  />
                  <ErrorLine error={metaKeywordError} />
                </FormGroup>
                <FormGroup>
                  <Form>
                    Trending
                    <FormCheck
                      type="switch"
                      id="trending"
                      value={trending}
                      onClick={() => setTrending(!trending)}
                    />
                  </Form>
                </FormGroup>
                <FormGroup>
                  <Form>
                    Popular
                    <FormCheck
                      type="switch"
                      id="popular"
                      value={popular}
                      onClick={() => {setPopular(!popular)}}
                    />
                  </Form>
                </FormGroup>
                {
                  options && 
                <FormGroup>
                    <Label>
                      Category
                    </Label>
                    <Select options={options} defaultValue={categoryId} onChange={(e) => {
                      setCategoryError('')
                      setCategoryId(e.value)
                      }}/>
                    <ErrorLine error={categoryError} />
                </FormGroup>
                }
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

const mapStateToProps = (state) => {
  return {
    category: state.category.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBlog: (data) => dispatch(addingBlog(data)),
    getCategories: () => dispatch(gettingAllCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
