import PropTypes from "prop-types";
import React from "react";


/**
* @prop buyer: buyer currently logged in
* @prop artist: artist associated with works
*/
class ArtistWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      artist: [],
      comment: ""
    }
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const works_route = APIRoutes.artists.works(artist_id);
    const artist_route = APIRoutes.artists.show(artist_id);
    Promise.all([
      Requester.get(works_route),
      Requester.get(artist_route)
    ]).then(response => {
      const [works_response, artist_route] = response;
      this.setState({
        works: works_response,
        artist: artist_route
      });
    });
  }

  handleChange = event => {
    this.setState({ comment: event.target.value });
  }

  handleSubmit = () => {
    const artist_id = this.props.artist.id;
    const commissions_route = APIRoutes.commissions.create;
    const buyer_id = this.props.buyer.id;
    const payload = {
      "buyer_id": buyer_id,
      "artist_id": artist_id,
      "comment": this.state.comment
    }

    Requester.post(commissions_route, payload)
  }

  createNewWork = () => {
    window.location = `/works/new`;
  }

  render() {
    const { name, program } = this.state.artist;
    return (
      <div>
        <h1> {name} </h1>
        <div className="row-bio">
          <div className="col-info">
            <div className="avatar">
              <img src="" />
            </div>
            <div className="info">
              <h3> Education </h3>
              <p> {program} </p>
            </div>
            <div className="contact-button-container">
              <button className="contact-button">contact</button>
            </div>
          </div>
          <div className="col-featured-artwork">
            <img src={""} />
          </div>
          <div className="col-about">
            <h2>About the artist</h2>
            <p> Some words</p>
          </div>
        </div>

        <button onClick={this.createNewWork}>
          New Work
        </button>
        <h2>These will be the artist works</h2>
        {this.state.works.map(work => (
          <div key={work.id}>
            <p className="work-title">{work.title}</p>
            <p className="work-medium">{work.medium}</p>
            <p className="work-material">{work.material}</p>
            {work.attachment_url.map((attachment) =>
              <img src={attachment} width="200" height="200" />
            )}
          </div>
        ))}
        <form onSubmit={this.handleSubmit} name="commissionsForm">
          <textarea
            type="TEXT"
            name="comment"
            id="comment"
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ArtistWorks;
