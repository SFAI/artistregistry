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
    const { name, avatar, program } = this.props.artist;
    return (
      <UserSnapshot
        name={name}
        avatarSrc={avatar.url || ""}
        navigate={this.navigateToArtist}
        program={program.replace(/_/g, ' ').replace(/(and)/, '+')}
      >
      </UserSnapshot>
    );
  }
}

export default ArtistSnapshot;
