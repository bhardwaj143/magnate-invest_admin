import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
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

import {
  changingStatus,
  deletingUser,
  gettingAllUser,
} from "../../../redux/actions/userAction";

const User = (props) => {
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
      window.location.href = "/users/1";
    }
    const res = await props.getAllUser(page, null);
    setErrorModal(res);
    setLoading(false);
  };

  const searchName = async (pageNumber = page, name) => {
    setNameSearch(name);
    const nameString = name.replace(/[^a-zA-Z ]/g, "%20");
    history.push(`/users/${pageNumber}/${nameString}`);
    setLoading(true);
    const res = await props.getAllUser(pageNumber, name);
    setErrorModal(res);
    setLoading(false);
  };

  const searchPage = async (number) => {
    const nameString = nameSearch.replace(/[^a-zA-Z ]/g, "%20");
    history.push(`/users/${number}/${nameString}`);
    setLoading(true);
    const res = await props.getAllUser(number, nameSearch);
    setErrorModal(res);
    setLoading(false);
  };

  const userDelete = async () => {
    modalOpenHandler();
    setLoader(true);
    const res = await props.deleteUser(deleteId);
    if (res === 200) {
      ToggleNotification("DeleteUserSuccess");
      setLoader(false);
      setTimeout(() => {
        window.location.href = "/users/1";
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
      const str = data.split("T");
      const time = str[1].split(".");
      return time[0] + " " + str[0];
    } else {
      return null;
    }
  };

  const data = [
    { name: "S.No." },
    { name: "Name" },
    { name: "Email" },
    { name: "Created-At" },
    { name: "Status" },
    { name: "Actions", style: "center" },
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
              <Card.Title as="h5">User Data</Card.Title>
              <Button
                type="button"
                color="primary"
                className="float-right"
                onClick={(e) => history.push("/add-user")}
              >
                Add
              </Button>
              <SearchBar type="user" name={searchName} status={errorModal} />
            </Card.Header>
            <Card.Body>
              {loading ? (
                <ModifiedLoader />
              ) : (
                <ModifiedTable status={errorModal} data={data}>
                  {props.userList &&
                    props.userList.map((item, index) => {
                      return (
                        <tr
                          key={item.id}
                          // onClick={(e) => history.push(`/user/${item.id}`)}
                        >
                          <td>{page * 10 - 10 + (index + 1)}</td>
                          <td>{item.fname + " " + item.lname}</td>
                          <td>{item.email}</td>
                          <td>{updatedDate(item.created_at)}</td>
                          {/* <td>{item.created_at}</td> */}
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
      </Row>
      {/* </LogCheck> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.users,
    totalPage: state.users.pages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: (page, search) => dispatch(gettingAllUser(page, search)),
    deleteUser: (id) => dispatch(deletingUser(id)),
    changeStatus: (id, status) => dispatch(changingStatus(id, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
