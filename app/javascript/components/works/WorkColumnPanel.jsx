import PropTypes from "prop-types"
import React from 'react';
import Touchable from 'rc-touchable';

class WorkColumnPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateToWork = (id) => {
    window.location = `/works/${id}`;
  }

  render() {
    let work = this.props.work;
    return (
      <div className="mb3 pa3 w-100 work-item bg-white relative" key={work.id}>
        <div className="item-overlay">
          {this.props.children}
        </div>
        <Touchable onPress={() => this.navigateToWork(work.id)}>
          {work.featured_image && <img src={work.featured_image.url} className="mb3 pointer"/>}
        </Touchable>
        <Touchable onPress={() => this.navigateToWork(work.id)}>
          <h3 className="pointer">{work.title}</h3>
        </Touchable>
        <h6>{work.artist_name}</h6>
        <h6 className="work-material">{work.material}</h6>
      </div>
    );
  }
}

export default WorkColumnPanel;
