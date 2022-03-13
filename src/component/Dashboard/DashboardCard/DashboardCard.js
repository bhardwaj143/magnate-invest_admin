import React from "react";
import { Card } from "react-bootstrap";
import { Spinner } from "reactstrap";
import "./DashboardCard.css"
import Cow from "../DashboardCard/images/cow.png";
import User from "../DashboardCard/images/user.png";

// import NoDataError from "../../ReusableComponents/ErrorPage/NoDataError/NoDataError";
// import ModifiedLoader from "../../ReusableComponents/Loader/loader";

const DashboardCard = (props) => {

    return (
        <>
        <Card className="cardColor" >   
            {
                props.loader ? <div className="SpinnerBody"><Spinner/></div> :
              <Card.Body className="cardColorBody">
                <h6 className="mb-4">{props.title ? props.title : "N/A"}</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0" className="cardBodyText1">
                      {props.data || props.data*1 === 0 ?  props.data: "N/A" }
                      {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "} */}
                      {/* {props.data && props.data*1 === 0 ? props.data : "N/A"} */}
                    </h3>
                  </div>

                  <div className="col-3 text-right">
                    {/* <p className="m-b-0">50%</p> */}
                    <img src={props.type === "cow" ? Cow: User} className="cardLogo" alt={props.type === "cow" ? "Cow" : "Users"}/>
                  </div>
                </div>
              </Card.Body>
            }
            </Card>
        </>
    )
}

export default DashboardCard;