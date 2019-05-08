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

  renderAvatar = (avatar, name) =>
    avatar.url ? (
      <img className="h2 w2 br-100 mr2 pointer" src={avatar.url} alt={name} />
    ) : (
      <FontAwesomeIcon
        className="mr2 gray pointer"
        icon={faUserCircle}
        size="2x"
      />
    );

  render() {
    const { userType, artist } = this.props;
    const { works, featured_work_id, hidden, id } = artist;
    const { avatar, name, degree, program, year } = artist;

    const featured_work = works.find(work => work.id === featured_work_id);
    const non_hidden_works = works.filter(work => work.hidden === false);
    const hidden_works = works.filter(work => work.hidden === true);

    return (
      <div
        className={classNames("mb3 pa3 w-100 col-item bg-white relative", {
          "overlay-hidden-artist": hidden,
        })}
        key={id}
      >
        <div className="item-overlay">{this.props.children}</div>
        <a href={`/artists/${id}`} className="color-inherit normal">
          {featured_work && (
            <img
              src={featured_work.featured_image.url}
              className="pointer mb3"
              alt={`${name}'s featured work: ${featured_work.title}`}
            />
          )}
          <div className="flex items-center">
            {this.renderAvatar(avatar, name)}
            <div>
              <p className="b denim pointer">{name}</p>
              <p className="ttc">
                {degree && degree.toUpperCase()} {reformatPrograms(program)}
              </p>
              {year && <p className="i">Class of {year}</p>}
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
