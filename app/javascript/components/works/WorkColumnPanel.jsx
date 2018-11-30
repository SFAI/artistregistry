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

  navigateToArtist = (artist_id) => {
    window.location = `/artists/${artist_id}`;
  }

  render() {
    let work = this.props.work;
    return (
      <div className="mb3 pa3 w-100 col-item bg-white relative" key={work.id}>
        <div className="item-overlay">
          {this.props.children}
        </div>
        {work.featured_image &&
          <Touchable onPress={() => this.navigateToWork(work.id)}>
            {<img src={work.featured_image.url} className="mb3 pointer" />}
          </Touchable>
        }
        <Touchable onPress={() => this.navigateToWork(work.id)}>
          <h3 className="pointer">{work.title}</h3>
        </Touchable>
        {!this.props.hideArtistName &&
          <Touchable onPress={() => this.navigateToArtist(work.artist_id)}>
            <h5 className="pointer magenta">{work.artist_name}</h5>
          </Touchable>
        }
        <h6>{work.material}</h6>
      </div>
    );
  }
}

export default WorkColumnPanel;
