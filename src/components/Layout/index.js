import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Layout = (props) => {
  return (
    <div className="main-container">
      <div className="main-content">{props.children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
