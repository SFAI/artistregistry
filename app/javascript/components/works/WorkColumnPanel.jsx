import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

class WorkColumnPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let work = this.props.work;
    return (
      <div
        className={classNames("mb3 pa3 w-100 col-item bg-white relative", {
          "overlay-hidden-work": work.hidden,
        })}
        key={work.id}
      >
        <div className="item-overlay">{this.props.children}</div>
        <a href={`/works/${work.id}`} className="color-inherit">
          <div
            className={classNames("relative flex items-center mb3", {
              [`overlay-${work.availability}`]:
                work.availability == "sold" || work.availability == "rented",
            })}
          >
            {work.featured_image && (
              <img
                src={work.featured_image.url}
                className="pointer"
                alt={work.title}
              />
            )}
          </div>
          <h3 className="pointer">{work.title}</h3>
        </a>
        {!this.props.hideArtistName && (
          <a href={`/artists/${work.artist.id}`}>
            <p className="pointer b berry mb1">{work.artist_name}</p>
          </a>
        )}
        <h6>{work.material}</h6>
      </div>
    );
  }
}

export default WorkColumnPanel;
