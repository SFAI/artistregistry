import PropTypes from "prop-types";
import React from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    switch(this.props.type) {
      case "button-primary":
        return (
          <button className={this.props.className + " button-primary font bg-" + this.props.color} onClick={this.props.onClick} tabIndex="0">
            {this.props.children}
          </button>
        );
      case "button-secondary":
        return (
          <button className={this.props.className + " button-secondary font b--" + this.props.color} onClick={this.props.onClick} tabIndex="0">
            {this.props.children}
          </button>
        );
      case "button-tertiary":
        return (
          <button className={this.props.className + " button-tertiary " + this.props.color} onClick={this.props.onClick} tabIndex="0">
            {this.props.children}
          </button>
        )
      case "hover-button":
        return (
          <button className={this.props.className + " hover-button pa2 white font pointer"} onClick={this.props.onClick} tabIndex="0">
            {this.props.children}
          </button>
        )
      default:
        return (
          <button className={this.props.className + " button-div bg-inherit"} onClick={this.props.onClick} tabIndex="0">
            {this.props.children}
          </button>
        )
    }
  }
}

export default Button;
