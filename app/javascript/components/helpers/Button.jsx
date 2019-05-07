import PropTypes from "prop-types";
import React from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, className, color, onClick, children } = this.props;
    switch (type) {
      case "button-primary":
        return (
          <button
            className={className + " button-primary font bg-" + color}
            onClick={onClick}
            tabIndex="0"
          >
            {children}
          </button>
        );
      case "button-secondary":
        return (
          <button
            className={className + " button-secondary font b--" + color}
            onClick={onClick}
            tabIndex="0"
          >
            {children}
          </button>
        );
      case "button-tertiary":
        return (
          <button
            className={className + " button-tertiary " + color}
            onClick={onClick}
            tabIndex="0"
          >
            {children}
          </button>
        );
      case "hover-button":
        return (
          <button
            className={className + " hover-button pa2 white font pointer"}
            onClick={onClick}
            tabIndex="0"
          >
            {children}
          </button>
        );
      default:
        return (
          <button
            className={className + " button-div bg-inherit"}
            onClick={onClick}
            tabIndex="0"
          >
            {children}
          </button>
        );
    }
  }
}

export default Button;
