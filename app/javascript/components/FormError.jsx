import PropTypes from "prop-types";
import React from "react";

class FormError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.error) {
      return (
        <div className="w-100 bg-snow pa2 mt2">
          <p className="error">{this.props.error}</p>
        </div>
      );
    }
    return (
      <div />
    );
  }
}

export default FormError;
