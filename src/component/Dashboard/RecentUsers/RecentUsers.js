import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { gettingRecentUsers } from "../../../redux/actions/userAction";
import RecentUsersList from "./RecentUsersTable/RecentUsersTable";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import ModifiedTable from "../../ReusableComponents/Table/Table";

const RecentUsers = (props) => {
  const [loader, setLoader] = useState(true);
  const [response, setResponse] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoader(true);
    const res = await props.recentUsers();
    setResponse(res);
    setLoader(false);
  };

  const data = [
    { name: "" },
    { name: "Name" },
    { name: "Email" },
    { name: "Rank", style: "center" },
    { name: "Level", style: "center" },
    { name: "Earned Points", style: "center" },
    { name: "Action", style: "center" },
  ];

  const renderList = props.recentUsersList.map((el, index) => {
    return (
      <RecentUsersList
        key={index}
        name={el.name ? el.name : null}
        email={el.email ? el.email : null}
        rank={el.rank ? el.rank : null}
        level={el.level ? el.level : null}
        earned_points={el.earned_points ? el.earned_points : null}
      />
    );
  });

  return (
    <>
      {loader ? (
        <ModifiedLoader />
      ) : (
        <ModifiedTable data={data} status={response}>
          {renderList}
        </ModifiedTable>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    recentUsersList: state.users.recent_users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recentUsers: () => dispatch(gettingRecentUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentUsers);
