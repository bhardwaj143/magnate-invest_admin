import React, { Component, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import ChatList from "./ChatList";
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import "./index.css";
import ToggleNotification from "../../../../../component/ReusableComponents/Toggle Notifications/ToggleNotification";

import Avatar1 from "../../../../../assets/images/user/avatar-1.jpg";
import Avatar2 from "../../../../../assets/images/user/avatar-2.jpg";
import Avatar3 from "../../../../../assets/images/user/avatar-3.jpg";
import { loggingOut } from "../../../../../redux/actions/loginAction";

const NavRight = (props) => {
  const history = useHistory();

  const [listOpen, setListOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const logoutHandler = async () => {
    setLoader(true);
    const res = await props.loggingOut();
    if (res === true) {
      setLoader(false);
      ToggleNotification("Logout");
      window.location.href = "/auth/signin-1";
    }
  };

  return (
    <Aux>
      <ul className="navbar-nav ml-auto">
        <li>
          <Dropdown alignRight={!props.rtlLayout}>
            <Dropdown.Toggle variant={"link"} id="dropdown-basic">
              <i className="icon feather icon-bell" />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className="notification">
              <div className="noti-head">
                <h6 className="d-inline-block m-b-0">Notifications</h6>
                <div className="float-right">
                  <a href={DEMO.BLANK_LINK} className="m-r-10">
                    mark as read
                  </a>
                  <a href={DEMO.BLANK_LINK}>clear all</a>
                </div>
              </div>
              <ul className="noti-body">
                <li className="n-title">
                  <p className="m-b-0">NEW</p>
                </li>
                <li className="notification">
                  <div className="media">
                    <img
                      className="img-radius"
                      src={Avatar1}
                      alt="Generic placeholder"
                    />
                    <div className="media-body">
                      <p>
                        <strong>John Doe</strong>
                        <span className="n-time text-muted">
                          <i className="icon feather icon-clock m-r-10" />
                          30 min
                        </span>
                      </p>
                      <p>New ticket Added</p>
                    </div>
                  </div>
                </li>
                <li className="n-title">
                  <p className="m-b-0">EARLIER</p>
                </li>
                <li className="notification">
                  <div className="media">
                    <img
                      className="img-radius"
                      src={Avatar2}
                      alt="Generic placeholder"
                    />
                    <div className="media-body">
                      <p>
                        <strong>Joseph William</strong>
                        <span className="n-time text-muted">
                          <i className="icon feather icon-clock m-r-10" />
                          30 min
                        </span>
                      </p>
                      <p>Prchace New Theme and make payment</p>
                    </div>
                  </div>
                </li>
                <li className="notification">
                  <div className="media">
                    <img
                      className="img-radius"
                      src={Avatar3}
                      alt="Generic placeholder"
                    />
                    <div className="media-body">
                      <p>
                        <strong>Sara Soudein</strong>
                        <span className="n-time text-muted">
                          <i className="icon feather icon-clock m-r-10" />
                          30 min
                        </span>
                      </p>
                      <p>currently login</p>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="noti-footer">
                <a href={DEMO.BLANK_LINK}>show all</a>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        {/* <li className={props.rtlLayout ? "m-r-15" : "m-l-15"}>
          <a
            href={DEMO.BLANK_LINK}
            className="displayChatbox"
            onClick={() => {
              setListOpen({ listOpen: true });
            }}
          >
            <i className="icon feather icon-mail" />
          </a>
        </li> */}
        <li>
          <Dropdown alignRight={!props.rtlLayout} className="drp-user">
            <Dropdown.Toggle variant={"link"} id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className="profile-notification">
              <div className="pro-head">
                <img src={Avatar1} className="img-radius" alt="User Profile" />
                <span>John Doe</span>
                <p
                  className="dud-logout logout"
                  onClick={logoutHandler}
                  title="Logout"
                >
                  <i className="feather icon-log-out" />
                </p>
              </div>
              <ul className="pro-body">
                <li>
                  <Link to="/change-password" className="dropdown-item">
                    <i className="feather icon-settings" /> Change Password
                  </Link>
                </li>
                {/* <li>
                  <a href={DEMO.BLANK_LINK} className="dropdown-item">
                    <i className="feather icon-user" /> Profile
                  </a>
                </li>
                <li>
                  <a href={DEMO.BLANK_LINK} className="dropdown-item">
                    <i className="feather icon-mail" /> My Messages
                  </a>
                </li>
                <li>
                  <a href={DEMO.BLANK_LINK} className="dropdown-item">
                    <i className="feather icon-lock" /> Lock Screen
                  </a>
                </li> */}
                <li>
                  <a
                    onClick={logoutHandler}
                    href={DEMO.BLANK_LINK}
                    className="dropdown-item"
                  >
                    <i className="feather icon-lock" /> LogOut
                  </a>
                </li>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
      <ChatList
        listOpen={listOpen}
        closed={() => {
          setListOpen({ listOpen: false });
        }}
      />
    </Aux>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loggingOut: () => dispatch(loggingOut()),
  };
};

export default connect(null, mapDispatchToProps)(NavRight);
