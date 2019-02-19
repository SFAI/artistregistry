import PropTypes from "prop-types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

/**
 * @prop itemType: Displays loading animation overlay
 */
class Load extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.itemType) {
      return (
        <div className="w-100 bg-snow pa2 pt3 pb3 overlay-full-centered">
          <FontAwesomeIcon className="gray" icon={faCircleNotch} size="3x" spin/>
          <p className="mt3 f3 i gray">Loading {this.props.itemType}</p>
        </div>
      );
    }
    return (
      <div />
    );
  }
}

export default Load;