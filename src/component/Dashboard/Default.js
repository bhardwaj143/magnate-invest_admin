import React, {useEffect, useState} from "react";
import { Row, Col, Card, Table, Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { gettingDashboardDetail } from "../../redux/actions/dashboardAction";
import DashboardCard from "./DashboardCard/DashboardCard";
import ThisWeekTable from "./ThisWeekTable/thisWeekTable";
import TodayTable from "./TodayTable/TodayTable";

const Dashboard = (props) => {
  const [status, setStatus] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoader(true);
    const res = await props.dashboardCardData();
    setStatus(res.status ? res.status : null);
    setLoader(false);
  };
  return (
    <>
      <Row>
        <Col md={6} xl={4}>
          <DashboardCard type="user" loader={loader} title="Total Blogs" data={20} />
        </Col>
        <Col md={6} xl={4}>
          <DashboardCard type="user" loader={loader} title="Popular Blogs" data={5} />
        </Col>
        <Col xl={4}>   
          <DashboardCard type="user" loader={loader} title="Trending Blogs" data={8}/>
        </Col>
        <Col md={12} xl={12} className="m-b-30">
          <Tabs defaultActiveKey="Today" id="uncontrolled-tab-example">
            <Tab eventKey="Today" title="Today">
              <TodayTable />
            </Tab>
            <Tab eventKey="week" title="This Week">
            <ThisWeekTable/>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    totalUsers: state.dashboard.total_users,
    totalAnimals: state.dashboard.total_animals,
    todayRegisteredUsers: state.dashboard.today_registered_users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dashboardCardData: () => dispatch(gettingDashboardDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
