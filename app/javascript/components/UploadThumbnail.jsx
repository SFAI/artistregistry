import PropTypes from "prop-types";
import React from "react";

class UploadThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="thumb-wrapper pa2">
        <div className="upload-thumbnail">
          <div className="thumb-head">
            <button onClick={() => this.props.delete()}>
              X
            </button>
          </div>
          <img
            src={this.props.src}
            className="thumb"
          />
          <h4 className="thumb-head-text mt3">{this.props.filename}</h4>
        </div>
      </div>
    )
  }
}

export default UploadThumbnail;
