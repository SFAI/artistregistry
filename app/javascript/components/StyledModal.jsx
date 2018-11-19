import PropTypes from "prop-types";
import React from "react";
import ReactModal from "react-modal";

class StyledModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <ReactModal
          className="ba pa3 modal"
          isOpen={this.state.show}
          onRequestClose={this.hideModal}
          ariaHideApp={false}>
          {this.props.children}
          <button className="cancel-button" onClick={this.hideModal}>
            Cancel
          </button>
        </ReactModal>
        <br />
        <button className="record-button" onClick={this.showModal}>
          Mark as Complete
        </button>
      </div>
    );
  }
}

export default StyledModal;
