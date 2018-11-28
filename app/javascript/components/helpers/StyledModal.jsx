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
          className="pa3 modal"
          isOpen={this.state.show}
          onRequestClose={this.hideModal}
          ariaHideApp={false}
          overlayClassName="overlay-class"
          >
          <h2 className="f4 lh-title submit">{this.props.title}</h2>
          {this.props.children}
          <button className="cancel-button" onClick={this.hideModal}>
            Cancel
          </button>
        </ReactModal>
        <button className={"bg-" + this.props.color + " button-primary w-100"} onClick={this.showModal}>
          {this.props.title}
        </button>
      </div>
    );
  }
}

export default StyledModal;
