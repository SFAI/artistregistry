import PropTypes from "prop-types";
import React from "react";
import { getCSRFToken } from '../shared/helpers/form_helpers.js'


/**
* @prop buyer: buyer currently logged in
* @prop artist: artist associated with works
*/
class ArtistWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      comment: "",
      errors: [],
      componentDidMount: false
    }
  }

  componentDidMount = () => {
    const artist_id = this.props.artist.id;
    const works_route = APIRoutes.artists.works(artist_id);
    Requester.get(works_route).then(
      response => {
        this.setState({
          works: response,
          componentDidMount: true
        });
      },
      response => {
        console.error(response);
      }
    );
  }

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  checkErrors = () => {
    let errors = [];
    if (this.state.comment === "") {
      errors.push("This field cannot be empty.");
    }
    if (!this.props.buyer) {
      errors.push("You must be logged in to request a commission.");
    }
    return errors;
  }

  handleSubmit = (event) => {
    let errors = this.checkErrors();
    if (errors.length) {
      this.setState({ errors: errors });
    } else {
      const artist_id = this.props.artist.id;
      const buyer_id = this.props.buyer.id;
      const commissions_route = APIRoutes.commissions.create;

      const payload = {
        "buyer_id": buyer_id,
        "artist_id": artist_id,
        "comment": this.state.comment
      }
      Requester.post(commissions_route, payload).then(
        response => {
          window.location.href = '/artists/' + this.props.artist.id
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  createNewWork = () => {
    window.location = `/works/new`;
  }

  updateWork = (work_id) => {
    window.location = `/works/${work_id}/edit`;
  }

  deleteWork (work_id) => {
    fetch(APIRoutes.works.delete(work_id), {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/artists/` + this.props.artist.id;
    }).catch((data) => {
      console.error(data);
    });
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }
    return (
      <div className="artist-profile-page">
        <button onClick={this.createNewWork}>
          New Work
        </button>
        <h2>These will be the artist works</h2>
        {this.state.works.map(work => (
          <div key={work.id}>
            <h3>{work.title}</h3>
            <p>{work.work_type}</p>
            <p>{work.media}</p>
            {work.attachment_url.map((attachment) =>
              <img src={attachment} width="200" height="200"/>
            )}
            <button onClick={() => {this.updateWork(work.id)}}>Edit Work</button>
            <button onClick={() => {this.deleteWork(work.id)}}>Delete Work</button>
          </div>
        ))}
        <textarea
          type="TEXT"
          name="comment"
          id="comment"
          value={this.state.comment}
          onChange = {this.handleChange}
        />
        {
          this.state.errors.map((error, i) => {
            return (
              <span key={i}>{error}</span>
            );
          })
        }
        <button onClick={this.handleSubmit}>
          Create
        </button>
      </div>
    );
  }
}

export default ArtistWorks;
