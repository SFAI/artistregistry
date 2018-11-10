import PropTypes from "prop-types";
import React from "react";

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (!this.props.show) {
      return (
        <div />
      );
    }
    return (
      <div>
        <div className="ba pa3 modal">
          {this.props.children}
          <button className="cancel-button" onClick={this.props.handleClose}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
