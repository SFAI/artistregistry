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
        <div className="w-100 bg-snow pa2 mv2 flex justify-center">
          <FontAwesomeIcon className="gray" icon={faExclamationCircle} />
          <p className="i f6 ml2 gray">{this.props.error}</p>
        </div>
      );
    }
    return <div />;
  }
}

export default FormError;
