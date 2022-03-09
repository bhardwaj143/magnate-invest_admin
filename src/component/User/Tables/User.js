import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Card, CardHeader } from "reactstrap";
import { gettingUser } from "../../../redux/actions/userAction";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import ShowUser from "../showUser/ShowUser";
import ServerError from "../../ReusableComponents/ErrorPage/ServerError/ServerError";
import NoDataError from "../../ReusableComponents/ErrorPage/NoDataError/NoDataError";
import useQuery from "../../ReusableComponents/customHooks/queryHook";

const User = (props) => {
  // const { id } = useParams();
  const query = useQuery();
  const id = query.get("id") || "";
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
    if (res === 404) {
      setErrorCode(res);
    } else if (res === 500) {
      setErrorCode(res);
    }
    setPageLoader(false);
  };

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
            fName={props.user && props.user.fname ? props.user.fname : null}
            lName={props.user && props.user.lname ? props.user.lname : null}
            email={props.user && props.user.email ? props.user.email : null}
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
