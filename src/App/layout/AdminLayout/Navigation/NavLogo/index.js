import React from "react";
import DEMO from "./../../../../../store/constant";
import Aux from "../../../../../hoc/_Aux";
import logo from "../../../../../assets/images/logo.png"
import { Link } from "react-router-dom";
import "./index.css";

const navLogo = (props) => {
  let toggleClass = ["mobile-menu"];
  if (props.collapseMenu) {
    toggleClass = [...toggleClass, "on"];
  }

  return (
    <Aux>
      <div className="navbar-brand header-logo">
        <a href={DEMO.BLANK_LINK} className="b-brand">
          {/* <div className="b-bg">
                        <i className="feather icon-trending-up" />
                    </div> */}
          <Link to="/dashboard">
            <img alt="Bovinae" className="bovinaeLogo" src={logo} />
            {/* <span className="b-title">Admin Panel</span> */}
          </Link>
        </a>
        <a
          href={DEMO.BLANK_LINK}
          className={toggleClass.join(" ")}
          id="mobile-collapse"
          onClick={props.onToggleNavigation}
        >
          <span />
        </a>
      </div>
    </Aux>
  );
};

export default navLogo;
