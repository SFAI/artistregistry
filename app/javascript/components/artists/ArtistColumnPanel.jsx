import PropTypes from "prop-types";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { pluralize, reformatPrograms } from "../../utils/strings";
import classNames from "classnames";

/**
 * @prop artist: artist for this panel
 * @prop userType: { "artist", "buyer", "admin" }
 */

class ArtistColumnPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    artist: PropTypes.object.isRequired,
  };

  render() {
    const { userType, artist } = this.props;
    // let artist = this.props.artist;
    const featured_work = artist.works.find(
      work => work.id === artist.featured_work_id
    );
    const non_hidden_works = artist.works.filter(work => work.hidden === false);
    const hidden_works = artist.works.filter(work => work.hidden === true);
    return (
      <div
        className={classNames("mb3 pa3 w-100 col-item bg-white relative", {
          "overlay-hidden-artist": artist.hidden,
        })}
        key={artist.id}
      >
        <div className="item-overlay">{this.props.children}</div>
        <a href={`/artists/${artist.id}`} className="color-inherit normal">
          {featured_work && (
            <img
              src={featured_work.featured_image.url}
              className="pointer mb3"
              alt={`${artist.name}'s featured work: ${featured_work.title}`}
            />
          )}
          <div className="flex items-center">
            {artist.avatar.url ? (
              <img
                className="h2 w2 br-100 mr2 pointer"
                src={artist.avatar.url}
                alt={artist.name}
              />
            ) : (
              <FontAwesomeIcon
                className="mr2 gray pointer"
                icon={faUserCircle}
                size="2x"
              />
            )}
            <div>
              <p className="b denim pointer">{artist.name}</p>
              <p className="ttc">
                {artist.degree && artist.degree.toUpperCase()}{" "}
                {reformatPrograms(artist.program)}
              </p>
              {artist.year && <p className="i">Class of {artist.year}</p>}
            </div>
          </div>
        </a>
        <p className="i mv2">{pluralize(non_hidden_works, "work")} available</p>
        {userType == "admin" && hidden_works.length > 0 && (
          <p className="i mb2">{pluralize(hidden_works, "work")} hidden</p>
        )}
      </div>
    );
  }
}

export default ArtistColumnPanel;
