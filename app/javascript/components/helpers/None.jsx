import PropTypes from "prop-types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

/**
 * @prop itemType: Displays "No {itemType} to show."
 */
class None extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.itemType) {
      return (
        <div className="w-100 bg-snow ph2 pv3 flex justify-center">
          <FontAwesomeIcon className="gray" icon={faExclamationCircle} />
          <p className="i f6 ml2 gray">No {this.props.itemType} to show.</p>
        </div>
      );
    }
    return <div />;
  }
}

export default None;
