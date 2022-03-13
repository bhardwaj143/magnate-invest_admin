import React, { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import { Row, Form, FormGroup, Label, Input } from "reactstrap";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import ModifiedTable from "../../ReusableComponents/Table/Table";
import Paging from "../../ReusableComponents/Pagination/Paging";
import { connect } from "react-redux";
import SearchBar from "../../ReusableComponents/SearchBar/SearchBar";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import ToggleButton from "../../ReusableComponents/ToggleButton/ToggleButton";
import TableAction from "../../ReusableComponents/Actions/TableAction";
import DeleteModal from "../../ReusableComponents/CustomModal/DeleteModal/DeleteModal";
import ModalSpinner from "../../ReusableComponents/Loader/ModalSpinner/ModalSpinner";
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import * as functions from "../../../functions/function";
import * as constants from "../../../constants/appConstants";
// import ShowImageOnClick from "../../ReusableComponents/CustomModal/ShowImageOnClick/ShowImageOnClick";
import "./table.css";

import {
  changingStatus,
  deletingUser,
  gettingAllUsers,
} from "../../../redux/actions/userAction";
import {
  deletingAnimal,
  gettingAnimalsData,
} from "../../../redux/actions/animalAction";

const User = (props) => {
  const history = useHistory();
  const { page, search } = useParams();
  const [nameSearch, setNameSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [animalType, setAnimalType] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    if (search) {
      window.location.href = "/animals/1";
    }
    const res = await props.getAllAnimals(page, null);
    if (res && res.status) {
      setErrorModal(res.status);
    } else if (res && res.code) {
      setErrorModal(res.code);
    }
    setLoading(false);
  };

  const searchName = async (pageNumber = page, name, type = animalType) => {
    setNameSearch(name);
    const nameString = name.replace(/[^a-zA-Z ]/g, "%20");
    history.push(`/animals/${pageNumber}/${nameString}`);
    setLoading(true);
    // console.log(type);
    const res = await props.getAllAnimals(pageNumber, name, type);
    if (res && res.status) {
      setErrorModal(res.status);
    } else if (res && res.code) {
      setErrorModal(res.code);
    }
    setLoading(false);
  };

  const searchPage = async (number, type = animalType) => {
    const nameString = nameSearch.replace(/[^a-zA-Z ]/g, "%20");
    history.push(`/animals/${number}/${nameString}`);
    setLoading(true);
    // console.log(type);
    const res = await props.getAllAnimals(number, nameSearch, type);
    if (res && res.status) {
      setErrorModal(res.status);
    } else if (res && res.code) {
      setErrorModal(res.code);
    }
    setLoading(false);
  };

  const userDelete = async () => {
    modalOpenHandler();
    setLoader(true);
    const res = await props.deleteUser(deleteId);
    if (res.status && res.status === 200) {
      ToggleNotification("DeleteUserSuccess");
      setLoader(false);
      getData();
      // history.push("/users/1");
    } else {
      setLoader(false);
      ToggleNotification("ServerError");
    }
  };

  const modalOpenHandler = (id) => {
    setModalOpen(!modalOpen);
    setDeleteId(id);
  };

  const updatedDate = (data) => {
    if (data) {
      const str = data.split("T");
      if (str.length === 2) {
        const res = functions.dateFunction(str[0]);
        return res.date + " " + res.month + " , " + res.year;
      }
    }
  };

  const data = [
    { name: "S.No.", style: "center", width: "11.1%" },
    { name: "Photo", style: "center", width: "11.1%" },
    { name: "Name", style: "center", width: "11.1%" },
    { name: "Owner", style: "center", width: "11.1%" },
    { name: "Type", style: "center", width: "11.1%" },
    { name: "Breed", style: "center", width: "11.1%" },
    { name: "Produce Milk", style: "center", width: "11.1%" },
    { name: "View Qr", style: "center", width: "11.1%" },
    { name: "Actions", style: "center", width: "11.1%" },
  ];

  const tableData = [{ name: "view" }, { name: "delete" }];

  const toggleButtonHandler = async (id, status) => {
    const res = await props.changeStatus(id, status);
    return res;
  };

  return (
    <>
      <DeleteModal
        status={modalOpen}
        name="user"
        deleteHandler={userDelete}
        closeModal={modalOpenHandler}
      />
      {loader ? <ModalSpinner data={loader} /> : null}
      <Col>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Animals Data</Card.Title>
            <SearchBar
              type="user"
              name={searchName}
              status={errorModal}
              searchBy="Name "
            />
            <Row>
              <FormGroup className="col-12">
                <Label>Animal Type</Label>
                <Input
                  type="select"
                  defaultValue={animalType}
                  value={animalType}
                  onChange={(e) => {
                    setAnimalType(e.target.value);
                    searchPage(page, e.target.value);
                  }}
                >
                  <option value="">All</option>
                  <option value="calf">Calf</option>
                  <option value="cow">Cow</option>
                  <option value="buffalo">Bufallo</option>
                </Input>
              </FormGroup>
            </Row>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <ModifiedLoader />
            ) : (
              <ModifiedTable status={errorModal} data={data}>
                {props.animalList &&
                  props.animalList.map((item, index) => {
                    return (
                      <tr
                        key={item._id}
                        // onClick={(e) => history.push(`/user/${item.id}`)}
                      >
                        <td style={{ textAlign: "center" }}>
                          {page * 10 - 10 + (index + 1)}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <div className="productImage ">
                            <img
                              src={
                                item.animalDetail && item.animalDetail.photo
                                  ? `${constants.baseURL}/${item.animalDetail.photo}`
                                  : null
                              }
                              alt="Animal"
                            />
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.animalDetail && item.animalDetail.name
                            ? item.animalDetail.name
                            : "N/A"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.user && item.user.name ? item.user.name : "N/A"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.animalType ? item.animalType : "N/A"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.animalDetail && item.animalDetail.breed
                            ? item.animalDetail.breed
                            : "N/A"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.produceMilk && item.produceMilk === true
                            ? "Yes"
                            : "No"}
                        </td>

                        {/* <td>
                            <ToggleButton
                              name="user"
                              changeToggle={() =>
                                toggleButtonHandler(item._id, item.status)
                              }
                              id={item.id}
                              status={item.status ? item.status : null}
                            />
                          </td> */}
                          
                        <td style={{ textAlign: "center" }}>
                          <TableAction
                            data={tableData}
                            updateURL={`/update-user/${item._id}`}
                            viewURL={`/animal-detail/${item._id}`}
                            deleteHandler={() => modalOpenHandler(item._id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </ModifiedTable>
            )}
            <Paging
              status={errorModal}
              page={page}
              type="user"
              searchPage={searchPage}
              totalCount={props.totalPage ? props.totalPage : null}
            />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.users,
    totalPage: state.animal.total_record,
    animalList: state.animal.animals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: (page, search) => dispatch(gettingAllUsers(page, search)),
    deleteUser: (id) => dispatch(deletingAnimal(id)),
    changeStatus: (id, status) => dispatch(changingStatus(id, status)),
    getAllAnimals: (page, search, type) =>
      dispatch(gettingAnimalsData(page, search, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
