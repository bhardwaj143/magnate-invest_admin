import React, { useState, useEffect } from "react";
import { Row, Col, Card, NavItem } from "react-bootstrap";
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
import "./table.css";
import ToggleNotification from "../../ReusableComponents/Toggle Notifications/ToggleNotification";
import * as functions from "../../../functions/function";
import * as constants from "../../../constants/appConstants";

import {
  changingStatus,
  deletingUser,
  gettingAllUser,
} from "../../../redux/actions/userAction";
import { gettingAllOrders } from "../../../redux/actions/orderAction";
import { gettingRatingList } from "../../../redux/actions/ratingAction";
import {
  deletingCow,
  gettingCowListing,
} from "../../../redux/actions/cowAction";

const CowTable = (props) => {
  const history = useHistory();
  const { page, search } = useParams();
  const [nameSearch, setNameSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    if (search) {
      window.location.href = "/cows/1";
    }
    const res = await props.getAllCows(page, null);
    setErrorModal(res.status ? res.status : res.code);
    setLoading(false);
  };

  const searchName = async (pageNumber = page, name) => {
    setNameSearch(name);
    const nameString = name.replace(/[^a-zA-Z ]/g, "%20");
    history.push(`/cows/${pageNumber}/${nameString}`);
    setLoading(true);
    const res = await props.getAllCows(pageNumber, name);
    setErrorModal(res.status ? res.status : res.code);
    setLoading(false);
  };

  const searchPage = async (number) => {
    const nameString = nameSearch.replace(/[^a-zA-Z ]/g, "%20");
    history.push(`/cows/${number}/${nameString}`);
    setLoading(true);
    const res = await props.getAllCows(number, nameSearch);
    setErrorModal(res.status ? res.status : res.code);
    setLoading(false);
  };

  const userDelete = async () => {
    modalOpenHandler();
    setLoader(true);
    const res = await props.deleteCow(deleteId);
    if (res === 200) {
      ToggleNotification("DeleteCowSuccess");
      setLoader(false);
      setTimeout(() => {
        window.location.href = "/cows/1";
      }, 1000);
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
      const str = data.split(" ");
      const res = functions.dateFunction(str[0]);
      return res.date + " " + res.month + " , " + res.year;
    } else {
      return null;
    }
  };

  const data = [
    { name: "S.No.", width: "20%" },
    { name: "Photo", width: "20%" },
    { name: "Name", width: "20%" },
    // { name: "Address" },
    { name: "Likes", style: "center", width: "20%" },
    { name: "Actions", style: "center", width: "20%" },
  ];

  const tableData = [{ name: "view" }, { name: "update" }, { name: "delete" }];

  const toggleButtonHandler = async (id, status) => {
    const res = await props.changeStatus(id, status);
    return res;
  };

  return (
    <>
      {/* <LogCheck status={errorModal}> */}
      <DeleteModal
        status={modalOpen}
        name="user"
        deleteHandler={userDelete}
        closeModal={modalOpenHandler}
      />
      {loader ? <ModalSpinner data={loader} /> : null}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Cows list</Card.Title>
              <Button
                type="button"
                color="primary"
                className="float-right"
                onClick={(e) => history.push("/add-cow")}
              >
                Add
              </Button>
              {/* <SearchBar type="user" name={searchName} status={errorModal} /> */}
            </Card.Header>
            <Card.Body>
              {loading ? (
                <ModifiedLoader />
              ) : (
                <ModifiedTable status={errorModal} data={data}>
                  {props.totalCows &&
                    props.totalCows.map((el, index) => {
                      return (
                        <tr key={index}>
                          <td>{page * 10 - 10 + (index + 1)}</td>
                          <td>
                            <img
                              src={
                                el.profile_pic
                                  ? `${constants.baseURL}${el.profile_pic}`
                                  : null
                              }
                              alt="Cow Pic"
                              width="30%"
                              style={{ borderRadius: "50%" }}
                            />
                          </td>
                          <td>{el.name ? el.name : "N/A"}</td>
                          <td style={{ textAlign: "center" }}>
                            {el.points || el.points !== 0
                              ? el.points === null
                                ? 0
                                : el.points
                              : 0}
                          </td>

                          <td>
                            <TableAction
                              data={tableData}
                              updateURL={`/update-cow?id=${
                                el.id ? el.id : null
                              }`}
                              viewURL={`/cow?id=${el.id ? el.id : null}`}
                              deleteHandler={() =>
                                modalOpenHandler(el.id ? el.id : null)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  {/* {props.userList &&
                    props.userList.map((item, index) => {
                      return (
                        <tr
                          key={item.id}
                        >
                          <td>{page * 10 - 10 + (index + 1)}</td>
                          <td>{item.fname + " " + item.lname}</td>
                          <td>{item.email}</td>
                          <td>{updatedDate(item.created_at)}</td>
                          <td>
                            <ToggleButton
                              name="user"
                              changeToggle={() =>
                                toggleButtonHandler(item.id, item.status)
                              }
                              id={item.id}
                              status={item.status ? item.status : null}
                            />
                          </td>
                          <td>
                            <TableAction
                              data={tableData}
                              updateURL={`/update-user?id=${item.id}`}
                              viewURL={`/user?id=${item.id}`}
                              deleteHandler={() => modalOpenHandler(item.id)}
                            />
                          </td>
                        </tr>
                      );
                    })} */}
                </ModifiedTable>
              )}
              <Paging
                status={errorModal}
                page={page}
                type="user"
                searchPage={searchPage}
                totalCount={props.totalCowsCount ? props.totalCowsCount : null}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* </LogCheck> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.users,
    totalPage: state.users.pages,
    ordersList: state.order.orders,
    totalCount: state.order.totalRecord,
    ratingList: state.ratings.allRatings,
    totalRatingCount: state.ratings.totalRatingRecords,
    totalCows: state.cow.cowList,
    totalCowsCount: state.cow.totalCowRecords,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: (page, search) => dispatch(gettingAllUser(page, search)),
    deleteUser: (id) => dispatch(deletingUser(id)),
    changeStatus: (id, status) => dispatch(changingStatus(id, status)),
    getOrders: (page, search) => dispatch(gettingAllOrders(page, search)),
    getRatings: (page, search) => dispatch(gettingRatingList(page, search)),
    getAllCows: (page, search) => dispatch(gettingCowListing(page, search)),
    deleteCow: (id) => dispatch(deletingCow(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CowTable);
