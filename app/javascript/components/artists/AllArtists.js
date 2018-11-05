import PropTypes from "prop-types";
import React from "react";
import ArtistRow from "./ArtistRow.js";

class AllArtists extends React.Component {
  constructor(props) {
    super(props);
  }

  renderArtistRows() {
    return this.props.artists.map((artist, i) => {
      return <ArtistRow name={artist.name} key={i} id={artist.id} />;
    });
  }

  render() {
    return (
      <div className="all-artists-page">
        <table className="artists-table">
          <tbody className="all-artists-container">
            {this.renderArtistRows()}
          </tbody>
        </table>
      </div>
    );
  }
}
export default AllArtists;
