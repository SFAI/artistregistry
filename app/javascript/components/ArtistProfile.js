import PropTypes from "prop-types";
import React from "react";


/**
* @prop buyer: buyer currently logged in
* @prop artist: artist associated with works
*/
class ArtistProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      artist: [],
      comment: "",
      activeFilter: 'All works',
      errors: [],
      componentDidMount: false
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
        artist: artist_route,
        componentDidMount: true
      });
    });
  }

  handleChange = event => {
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

  handleSubmit = () => {
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

  deleteWork = (work_id) => {
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
    const { componentDidMount, activeFilter, artist } = this.state;
    const { name, program } = artist;

    if (!componentDidMount) {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }

    return (
      <div>
        <h1> {name} </h1>
        <div className="row-bio flex">
          <div className="w-20-l flex flex-column pa3 w5 bg-white">
            <div className="h4 w4 br-100 mb4 bg-gray self-center">
              <img src="" />
            </div>
            <div className="info">
              <h3> Education </h3>
              <p> {program} </p>
            </div>
            <div className="mt-auto self-center">
              <button className="bg-gray white button pv3 ph4 f5">contact</button>
            </div>
          </div>
          <div className="w-50-l mw-400 flex mh3">
            <img className="fit-cover h-100" src={"https://images.unsplash.com/photo-1542347369-65f48a3018c8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9dded3ad2cbb6ec3ccfe4a9c5f5c0715&auto=format&fit=crop&w=900&q=60"} />
          </div>
          <div className="w-30-l mw-400 pa3 bg-white">
            <h2>About the artist</h2>
            <p> Some words</p>
          </div>
        </div>
        <div className="mt5 mb3">
          {['All works', 'Available', 'Sold/Rented'].map(filter => {
            const className = activeFilter == filter
              ? "filter-button bg-gray white f6 mr3"
              : "filter-button bg-white gray f6 mr3";
            return <button onClick={() => this.setState({ activeFilter: filter })} key={filter} className={className}>{filter}</button>
          })}
        </div>
        <div className="flex">
          {this.state.works.map(work => (
            <div key={work.id} className="artwork pa3 mr3 bg-white">
              <div className="work-image bg-gray mb2" >
                <img src={""} />
              </div>
              <p className="work-title mb1">{work.title}</p>
              <p className="work-medium mb1">{work.medium}</p>
              <p className="work-material">{work.material}</p>
              <img src={work.featured_image.url} width="200" height="200" />
              <div>
                <button onClick={() => {this.updateWork(work.id)}}>Edit Work</button>
                <button onClick={() => {this.deleteWork(work.id)}}>Delete Work</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mv3">
          <form onSubmit={this.handleSubmit} name="commissionsForm">
            <textarea
              type="TEXT"
              name="comment"
              id="comment"
              value={this.state.comment}
              onChange={this.handleChange}
            />
            {
              this.state.errors.map((error, i) => {
                return (
                  <span key={i}>{error}</span>
                );
              })
            }
            <input type="submit" value="Submit" />
          </form>
          <button onClick={this.createNewWork}>
            New Work
          </button>
        </div>
      </div>
    );
  }
}

export default ArtistProfile;
