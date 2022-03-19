import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import ModifiedTable from "../../ReusableComponents/Table/Table";
import * as functions from "./../../../functions/function";
import ServerError from "../../ReusableComponents/ErrorPage/ServerError/ServerError";
import ModifiedPopover from "../../ReusableComponents/Popover/Popover";
import { gettingAllUsers } from "../../../redux/actions/userAction";

const TodayTable = (props) => {
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoader(true);
    const res = await props.todayRegisteredUsers(1, null, 1000, "byToday");
    setResponse(res.status ? res.status : null);
    setLoader(false);
  };

  const data = [
    { name: "S.No.", style: "center", width:"20%" },
    { name: "Name", style: "center", width:"20%" },
    { name: "Mobile No.", style: "center", width:"20%" },
    { name: "Registered At", style: "center", width:"20%" },
    { name: "Address", style: "center", width:"20%" },
  ];

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

  // console.log(props.usersList);

  const renderList =
    props.usersList &&
    props.usersList.map((el, index) => {
      return (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{index + 1}</td>
          <td style={{ textAlign: "center" }}>{el.name ? el.name : "N/A"}</td>
          <td style={{ textAlign: "center" }}>
            {el.mobile ? el.mobile : "N/A"}
          </td>
          
          {/* <td style={{ textAlign: "center" }}>
            {el.quantity ? el.quantity.toFixed(2) : 0.0}
          </td> */}
          {/* <td style={{ textAlign: "center" }}>
            {el.totalPrice ? el.totalPrice : "0"}
          </td> */}
          <td style={{ textAlign: "center" }}>
            {el.createdAt ? updatedDate(el.createdAt) : "N/A"}
          </td>
          <td style={{ textAlign: "center" }}>
            <ModifiedPopover
              id={index}
              heading="Address"
              body={
                el.address ? el.address : "N/A"
              }
            />
          </td>
          {/* <td style={{ textAlign: "center" }}>
            {el.customer && el.customer.preferredTime
              ? el.customer.preferredTime
              : "N/A"}
          </td> */}
        </tr>
      );
    });

  return (
    <>
      {loader ? (
        <ModifiedLoader />
      ) : response === 500 ? (
        <ServerError />
      ) : (
        <div className="ml-2 mr-2">
          <ModifiedTable data={data} status={response}>
            {renderList}
          </ModifiedTable>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    usersList: state.users.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    todayRegisteredUsers: (page, search,limit, date) => dispatch(gettingAllUsers(page, search,limit, date))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodayTable);
