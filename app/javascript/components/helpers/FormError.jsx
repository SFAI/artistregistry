import PropTypes from "prop-types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

class FormError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.error) {
      return (
        <div className="w-100 bg-snow pa2 mt2 mb2 error-container">
          <FontAwesomeIcon className="gray" icon={faExclamationCircle}/>
          <p className="error ml2 gray">{this.props.error}</p>
        </div>
      );
    }
    return (
      <div />
    );
  }
}

export default FormError;
