import PropTypes from "prop-types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

class WorkToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImageIndex: 0
    };
  }

  renderButton = direction => {
    const { work } = this.props;
    const { activeImageIndex } = this.state;
    const canMove = {
      left: activeImageIndex > 0,
      right: activeImageIndex < work.attached_images_urls.length - 1
    }[direction];

    const moveAction = {
      left: () => this.setState({ activeImageIndex: activeImageIndex - 1 }),
      right: () => this.setState({ activeImageIndex: activeImageIndex + 1 })
    }[direction];

    const faChevron = {
      left: faChevronLeft,
      right: faChevronRight
    }[direction];

    return (
      <button
        disabled={!canMove}
        className={classNames("input-reset b--none", {
          pointer: canMove
        })}
        onClick={() => {
          if (canMove) moveAction();
        }}
      >
        <FontAwesomeIcon
          size="4x"
          icon={faChevron}
          className={classNames("pa3", {
            "pale-gray hover-snow": canMove,
            snow: !canMove
          })}
        />
      </button>
    );
  };

  render() {
    let work = this.props.work;
    const { activeImageIndex } = this.state;
    return (
      <div className="bg-white w-100 full-image-container pa3">
        <div className="w-100 flex items-center justify-between">
          {this.renderButton("left")}
          <div className="work-toggle-container">
            <img
              src={work.attached_images_urls[activeImageIndex].url}
              className="full-image"
            />
          </div>
          {this.renderButton("right")}
        </div>
        <div className="flex mt3">
          {work.attached_images_urls.map((image, index) => {
            return (
              <button
                className="button-div pa0 mr2"
                disabled={this.state.activeImageIndex == index}
                onClick={() => this.setState({ activeImageIndex: index })}
                key={index}
              >
                <div className="relative pointer">
                  <img
                    className={classNames("fit-cover h3 w3", {
                      "o-50": index !== activeImageIndex
                    })}
                    src={image.url}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default WorkToggle;
