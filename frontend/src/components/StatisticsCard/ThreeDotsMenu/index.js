import React from "react";
import PropTypes from "prop-types";

import "./ThreeDotsMenu.scss";

const ThreeDotsMenu = ({ onClick }) => {
  return (
    <div className="three-dots-menu" onClick={onClick}>
      <svg
        width="16"
        height="4"
        viewBox="0 0 16 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.86667 3.73333C0.835739 3.73333 4.05312e-06 2.8976 4.05312e-06 1.86667C4.05312e-06 0.835735 0.835739 0 1.86667 0C2.8976 0 3.73334 0.835735 3.73334 1.86667C3.73334 2.8976 2.8976 3.73333 1.86667 3.73333Z"
          fill="#252525"
        />
        <path
          d="M7.99997 3.73333C6.96904 3.73333 6.1333 2.8976 6.1333 1.86667C6.1333 0.835735 6.96904 0 7.99997 0C9.0309 0 9.86664 0.835735 9.86664 1.86667C9.86664 2.8976 9.0309 3.73333 7.99997 3.73333Z"
          fill="#252525"
        />
        <path
          d="M14.1333 3.73333C13.1024 3.73333 12.2667 2.8976 12.2667 1.86667C12.2667 0.835735 13.1024 0 14.1333 0C15.1643 0 16 0.835735 16 1.86667C16 2.8976 15.1643 3.73333 14.1333 3.73333Z"
          fill="#252525"
        />
      </svg>
    </div>
  );
};

ThreeDotsMenu.propTypes = {
  onClick: PropTypes.func
};

export default ThreeDotsMenu;
