import PropTypes from "prop-types";
import React from "react";
import ReactModal from "react-modal";
import Button from "../helpers/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

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
          className="modal"
          isOpen={this.state.show}
          onRequestClose={this.hideModal}
          ariaHideApp={false}
          overlayClassName="overlay-class"
        >
          <div className={classNames("modal-head pl3 pr3", {
            [`bg-${this.props.color}`]: this.props.color
          })}>
            <h3 className="white">{this.props.title}</h3>
            <button onClick={this.hideModal} className="button-div bg-transparent">
              <FontAwesomeIcon className="white pointer" icon={faTimes} />
            </button>
          </div>
          <div className="modal-content pa4">
            {this.props.children}
          </div>
        </ReactModal>
        <Button className={classNames("w4 ", this.props.buttonClasses)} type={this.props.buttonType} color={this.props.color} onClick={this.showModal}>
          {this.props.title}
        </Button>
      </div>
    );
  }
}

export default StyledModal;
