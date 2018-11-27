import PropTypes from "prop-types";
import React from "react";
import UserSnapshot from "../helpers/UserSnapshot";

class ArtistSnapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  navigateToArtist = () => {
    window.location = `/artists/${this.props.artist.id}`;
  }
  
  render() {
    return (
      <UserSnapshot
        name={this.props.artist.name}
        avatarSrc=""
        navigate={this.navigateToArtist}
        description={""}
      >
      </UserSnapshot>
    );
  }
}

export default ArtistSnapshot;
