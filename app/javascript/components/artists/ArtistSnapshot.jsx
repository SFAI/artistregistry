import PropTypes from "prop-types";
import React from "react";
import UserSnapshot from "../helpers/UserSnapshot";
import { convertSnakeCase } from "../../utils/snake_case";

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
        program={convertSnakeCase(program)}
      >
      </UserSnapshot>
    );
  }
}

export default ArtistSnapshot;
