import PropTypes from "prop-types"
import React from 'react';
import Touchable from 'rc-touchable';
import { convertSnakeCase, splitCommaSeparatedArray, pluralize } from "../../utils/strings";

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
  }

  navigateToArtist = (id) => {
    window.location = `/artists/${id}`;
  }

  reformatPrograms = (p) => {
    var programs = p;
    programs = splitCommaSeparatedArray(p).sort();
    for (var i = 0; i < programs.length; i++) {
      programs[i] = convertSnakeCase(programs[i]);
    }
    return programs.join(", ")
  }

  render() {
    const { userType, artist } = this.props;
    // let artist = this.props.artist;
    const featured_work = artist.works.find(work => work.id === artist.featured_work_id);
    const non_hidden_works = artist.works.filter(work => work.hidden === false);
    const hidden_works = artist.works.filter(work => work.hidden === true);
    return (
      <div className="mb3 pa3 w-100 col-item bg-white relative" key={artist.id}>
        <div className="item-overlay">
          {this.props.children}
        </div>
        <div>
          {featured_work &&
            <Touchable onPress={() => this.navigateToArtist(artist.id)}>
              {<img src={featured_work.featured_image.url} className="mb3 pointer" />}
            </Touchable>
          }
        </div>
        <Touchable onPress={() => this.navigateToArtist(artist.id)}>
          <h3 className="denim pointer">{artist.name}</h3>
        </Touchable>
        <h6 className="ttc">{this.reformatPrograms(artist.program)} {(artist.program.length > 0) && "—"} {artist.year}</h6>
        <h6 className="i">
          {`${pluralize(non_hidden_works, 'work')} available`}
        </h6>
        {userType == "admin" && hidden_works.length > 0 &&
          <h6 className="i">
            {pluralize(hidden_works, 'work')} hidden
          </h6>
        }
        {userType == "admin" && artist.hidden &&
          <h6> HIDDEN!!!!! </h6>
        }
      </div>
    );
  }
}

export default ArtistColumnPanel;
