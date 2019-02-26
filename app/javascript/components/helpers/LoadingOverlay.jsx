import PropTypes from "prop-types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

/**
 * @prop itemType: Displays loading animation overlay
 * @prop fullPage: Sets loading overlay to expand over entire window
 */
class LoadingOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    fullPage: PropTypes.bool,
  }

  render() {
    let classes = ("w-100 bg-snow pa2 pt3 pb3 z-1 bg-white-90 top-0 bottom-0 left-0 flex flex-column justify-center items-center ");
    classes += (this.props.fullPage ? "fixed" : "absolute");

    return (
      <div className={classes}>
        <FontAwesomeIcon className="gray" icon={faCircleNotch} size="3x" spin/>
        <p className="mt3 f3 i gray">Loading {this.props.itemType}</p>
      </div>
    );
  }
}

export default LoadingOverlay;
