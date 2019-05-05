import PropTypes from "prop-types";
import React from "react";
import UserSnapshot from "../helpers/UserSnapshot";
import { convertSnakeCase } from "../../utils/strings";

class ArtistSnapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, avatar, degree, program } = this.props.artist;
    return (
      <UserSnapshot
        name={name}
        avatarSrc={avatar.url || ""}
        navigate={`/artists/${this.props.artist.id}`}
        program={program}
        degree={degree}
        color={this.props.color}
      >
      </UserSnapshot>
    );
  }
}

export default ArtistSnapshot;
