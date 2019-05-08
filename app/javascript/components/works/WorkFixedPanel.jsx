import PropTypes from "prop-types";
import React from "react";

class WorkFixedPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateToWork = id => {
    window.location = `works/${id}`;
  };

  render() {
    let work = this.props.work;
    return (
      <div className="artwork w-100 h-100">
        <div className="pa3">
          <a href={`works/${work.id}`} className="color-inherit normal">
            <img
              className="work-image fit-cover w-100 mb2 pointer"
              src={work.featured_image.url}
            />
            <p className="mb1 b pointer">{work.title}</p>
          </a>
          <p className="mb1 ttc">{work.media}</p>
          <p className="i">{work.material}</p>
        </div>
      </div>
    );
  }
}

export default WorkFixedPanel;
