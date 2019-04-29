import PropTypes from "prop-types"
import React from 'react';
import Touchable from 'rc-touchable';
import classNames from "classnames";

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
      <div 
        className={
          classNames("mb3 pa3 w-100 col-item bg-white relative", {
            "overlay-hidden-work": work.hidden
          })}
        key={work.id}
      >
        <div className="item-overlay">
          {this.props.children}
        </div>
        <Touchable onPress={() => this.navigateToWork(work.id)}>
          <div
            className={classNames("relative flex items-center mb3", {
              [`overlay-${work.availability}`]:
                work.availability == "sold" || work.availability == "rented"
            })}>
            {work.featured_image && (
              <img src={work.featured_image.url} className="pointer" />
            )}
          </div>
        </Touchable>
        <Touchable onPress={() => this.navigateToWork(work.id)}>
          <h3 className="pointer">{work.title}</h3>
        </Touchable>
        {!this.props.hideArtistName &&
          <Touchable onPress={() => this.navigateToArtist(work.artist_id)}>
            <p className="pointer b berry">{work.artist_name}</p>
          </Touchable>
        }
        <h6>{work.material}</h6>
    </div>
    );
  }
}

export default WorkColumnPanel;
