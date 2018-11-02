import PropTypes from "prop-types";
import React from "react";
// import { standardError } from '../../../lib/alerts';
import CreateWorkModal from './CreateWorkModal.js'


/**
* @prop buyer: buyer currently logged in
* @prop artist: artist associated with works
*/
class ArtistWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      isOpen: false,
      comment: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const works_route = APIRoutes.artists.works(0);
    Requester.get(works_route).then(
      response => {
        this.setState({ works: response });
      },
      response => {
        console.error(response);
      }
    );
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  handleSubmit(event) {
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
  render() {


    return (
      <div>
        These will be the artist works
        {this.state.works.map(work => (
          <div key={work.id}>
            <h3>{work.title}</h3>
            <p>{work.work_type}</p>
            <p>{work.media}</p>
            {work.attachment_url.map((attachment) =>
              <img src={attachment} width="200" height="200"/>
            )}
          </div>
        ))}
        <CreateWorkModal
          artist_id={this.props.artist.id}
        />

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

        <div className="fl w-100 pa2">
          <h1>aaklsdj</h1>
        </div>
      </div>
    );
  }
}

export default ArtistWorks;
