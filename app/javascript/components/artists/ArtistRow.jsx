import PropTypes from "prop-types";
import React from "react";

/**
* @prop name: name of artist associated with row
* @prop id: id of artist associated with row
*/
class ArtistRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.linkToPage = this.linkToPage.bind(this);
  }

  linkToPage() {
    window.location = `/artists/${this.props.id}`;
  }

  render() {
    return (
      <tr onClick={this.linkToPage} className="artist-row">
        <td>{this.props.name}</td>
      </tr>
    );
  }
}
export default ArtistRow;
