import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Card, CardHeader } from "reactstrap";
import { gettingUser } from "../../../redux/actions/userAction";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import ShowUser from "../showUser/ShowUser";
import ServerError from "../../ReusableComponents/ErrorPage/ServerError/ServerError";
import NoDataError from "../../ReusableComponents/ErrorPage/NoDataError/NoDataError";
import { useParams } from "react-router-dom";

const User = (props) => {
  const { id } = useParams();
  // const query = useQuery();
  // const id = query.get("id") || "";
  // const [fName, setFname] = useState("");
  // const [lName, setLname] = useState("");
  // const [email, setEmail] = useState("");
  const [pageLoader, setPageLoader] = useState(true);
  const [errorCode, setErrorCode] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setPageLoader(true);
    const res = await props.getUser(id);
    if (res.code && (res.code === 404 || res.code === 400)) {
      setErrorCode(res.code);
    } else if (res.status && res.status === 500) {
      setErrorCode(res.status);
    }
    setPageLoader(false);
  };

  // console.log(props.user);

  return (
    <>
      <Card>
        <CardHeader>
          <h3>User Detail</h3>
        </CardHeader>
        {pageLoader ? (
          <ModifiedLoader />
        ) : errorCode === 500 ? (
          <ServerError />
        ) : errorCode === 404 ? (
          <NoDataError />
        ) : (
          <ShowUser
            name={props.user && props.user.name ? props.user.name : "N/A"}
            mobile={props.user && props.user.mobile ? props.user.mobile : "N/A"}
            address={
              props.user && props.user.address ? props.user.address : "N/A"
            }
            id={id}
          />
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (data) => dispatch(gettingUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
