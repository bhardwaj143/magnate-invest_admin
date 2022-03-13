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
import * as functions from "../../../functions/function";

import {
  changingStatus,
  deletingUser,
  gettingAllUsers,
} from "../../../redux/actions/userAction";
import { gettingAllBlogs, deletingBlog } from "../../../redux/actions/blogAction";
import { deletingCategory, gettingAllCategories } from "../../../redux/actions/categoryAction";

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

  console.log(props.blogList);

  const getData = async () => {
    setLoading(true);
    if (search) {
      window.location.href = "/users/1";
    }
    const res = await props.getAllBlog(page, 10);
    if (res && res.status) {
      setErrorModal(res.status);
    } else if (res && res.code) {
      setErrorModal(res.code);
    }
    setLoading(false);
  };

  const searchPage = async (number) => {
    history.push(`/users/${number}`);
    setLoading(true);
    const res = await props.getAllBlog(number);
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
    const res = await props.deletBlog(deleteId);
    if (res.status && res.status === 200) {
      ToggleNotification("DeleteCategorySuccess");
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
        const time = str[1].split(".");
        return (
          res.date +
          " " +
          res.month +
          " , " +
          res.year 
        );
      }
    }
  };

  const data = [
    { name: "S.No.", style: "center", width: "14.28%" },
    { name: "Title", style: "center", width: "14.28%" },
    { name: "Description", style: "center", width: "14.28%" },
    { name: "Popular", style: "center", width: "14.28%" },
    { name: "Trending", style: "center", width: "14.28%" },
    { name: "Date", style: "center", width: "14.28%" },
    { name: "Actions", style: "center", width: "14.28%" },
  ];

  const tableData = [ { name: "update" }, {name: "delete"}];

  return (
    <>
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
              <Card.Title as="h5">Category Data</Card.Title>
              <Button
                type="button"
                color="primary"
                className="float-right"
                onClick={(e) => history.push("/add-category")}
              >
                Add
              </Button>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <ModifiedLoader />
              ) : (
                <ModifiedTable status={errorModal} data={data}>
                  {props.blogList &&
                    props.blogList.map((item, index) => {
                      return (
                        <tr
                          key={item._id}
                          style={{textAlign: "center"}}
                        >
                          <td style={{textAlign: "center"}}>{page * 10 - 10 + (index + 1)}</td>
                          <td style={{textAlign: "center"}}>{item.name ? item.name : "N/A"}</td>
                          <td style={{textAlign: "center"}}>{item.discription ? item.discription.length > 30 ? item.discription.slice(0,30) + '...' : item.discription : "N/A"}</td>
                          <td style={{textAlign: "center"}}>{item.isPopular ? "YES" : "NO"}</td>
                          <td style={{textAlign: "center"}}>{item.isTreandings ? "YES" : "NO"}</td>
                          <td style={{textAlign: "center"}}>
                            {item.createdAt
                              ? updatedDate(item.createdAt)
                              : "N/A"}
                          </td>
                          <td style={{textAlign: "center"}}>
                            <TableAction
                              data={tableData}
                              updateURL={`/update-category/${item._id}`}
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
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.users,
    totalPage: state.blog.totalBlogs,
    blogList: state.category.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deletingUser(id)),
    deletBlog: (id) => dispatch(deletingCategory(id)),
    changeStatus: (id, status) => dispatch(changingStatus(id, status)),
    getAllBlog: (page, limit) => dispatch(gettingAllCategories(page, limit))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
