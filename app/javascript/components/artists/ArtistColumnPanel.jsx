import PropTypes from "prop-types"
import React from 'react';
import Touchable from 'rc-touchable';
import { convertSnakeCase } from "../../utils/snake_case";

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

  render() {
    let artist = this.props.artist;
    const featured_work = artist.works.find(work => work.id === artist.featured_work_id);
    return (
      <div className="mb3 pa3 w-100 col-item bg-white relative" key={artist.id}>
        <div className="item-overlay">
          {this.props.children}
        </div>
        <Touchable onPress={() => this.navigateToArtist(artist.id)}>
          {<img src={featured_work.featured_image.url} className="mb3 pointer" />}
        </Touchable>
        <Touchable onPress={() => this.navigateToArtist(artist.id)}>
          <h3 className="indigo pointer">{artist.name}</h3>
        </Touchable>
        <h6 className="ttc">{convertSnakeCase(artist.program)}, {artist.year}</h6>
        <h6 className="i">{artist.works.length} work{artist.works.length > 1 && "s"} available</h6>
      </div>
    );
  }
}

export default ArtistColumnPanel;
