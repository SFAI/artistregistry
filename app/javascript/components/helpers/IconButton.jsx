import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton({
  className,
  onClick,
  isActiveIcon,
  activeIcon,
  inactiveIcon,
  text,
}) {
  return (
    <Button type="hover-button" className={className} onClick={onClick}>
      <FontAwesomeIcon
        className="white"
        icon={isActiveIcon ? activeIcon : inactiveIcon}
      />
      <h4 className="ml2 white">{text}</h4>
    </Button>
  );
}

IconButton.defaultProps = {
  isActiveIcon: true,
};

IconButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isActiveIcon: PropTypes.bool,
  activeIcon: PropTypes.object.isRequired,
  inactiveIcon: PropTypes.object,
  text: PropTypes.string.isRequired,
};
