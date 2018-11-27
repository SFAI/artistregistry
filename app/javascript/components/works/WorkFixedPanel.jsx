import PropTypes from "prop-types"
import React from 'react';

class WorkFixedPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    let work = this.props.work;
    return (
      <div className="artwork w-25 h-100 pa2">
        <div className="bg-white pa3">
          <img className="work-image fit-cover w-100 mb2" src={work.featured_image.url} />
          <p className="work-title mb1">{work.title}</p>
          <p className="work-medium mb1">{work.medium}</p>
          <p className="work-material">{work.material}</p>
        </div>
      </div>
    );
  }
}