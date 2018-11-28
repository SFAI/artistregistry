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
      <div className="artwork w-100 h-100">
        <div className="pa3">
          <Touchable onPress={() => this.navigateToWork(work.id)}>
            <img className="work-image fit-cover w-100 mb2 pointer" src={work.featured_image.url} />
          </Touchable>
          <Touchable onPress={() => this.navigateToWork(work.id)}>
            <p className="h3 mb1 pointer">{work.title}</p>
          </Touchable>
          <p className="mb1">{work.media}</p>
          <p className="i">{work.material}</p>
        </div>
      </div>
    );
  }
}

export default WorkFixedPanel;
