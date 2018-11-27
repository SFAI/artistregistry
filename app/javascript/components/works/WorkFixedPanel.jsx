import PropTypes from "prop-types"
import React from 'react';
import Touchable from 'rc-touchable';

class WorkFixedPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  navigateToWork = (id) => {
    window.location = `works/${id}`;
  }

  render() {
    let work = this.props.work;
    return (
      <Touchable onPress={() => this.navigateToWork(work.id)}>
        <div className="artwork w-100 h-100 pointer">
          <div className="pa3">
            <img className="work-image fit-cover w-100 mb2" src={work.featured_image.url} />
            <p className="work-title mb1">{work.title}</p>
            <p className="work-medium mb1">{work.medium}</p>
            <p className="work-material">{work.material}</p>
          </div>
        </div>
      </Touchable>
    );
  }
}

export default WorkFixedPanel;
