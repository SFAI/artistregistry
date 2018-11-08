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
        <div className="ba bw1 pa3 modal">
          {this.props.children}
          <button onClick={this.props.handleClose}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
