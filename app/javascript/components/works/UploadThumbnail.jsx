import PropTypes from "prop-types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class UploadThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="thumb-wrapper pl2 pr2 pb2">
        <div className="upload-thumbnail">
          <div className="thumb-head">
            <div className="icon pt1 pb1">
              <button
                onClick={() => this.props.delete()}
                className="button-div bg-transparent pa0 pointer"
              >
                <FontAwesomeIcon className="gray" icon={faTimes} />
              </button>
            </div>
          </div>
          <img src={this.props.src} className="thumb" />
          <h4 className="thumb-head-text mt3">{this.props.filename}</h4>
        </div>
      </div>
    );
  }
}

export default UploadThumbnail;
