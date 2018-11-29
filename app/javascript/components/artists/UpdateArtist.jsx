import PropTypes from "prop-types"
import React from 'react';
import { Button, Dialog, Intent } from "@blueprintjs/core";


class UpdateArtist extends React.Component {
  constructor(props) {
    super(props);
    const { artist_id } = this.props.artist_id;
    this.state = {
      artist: {},
      works: [],
      categories: {},
      componentDidMount: false,
    }
  }

  componentDidMount = () => {
    const artist_route = APIRoutes.artists.show(this.props.artist_id);
    const works_route = APIRoutes.artists.works(this.props.artist_id);
    const categories_route = APIRoutes.artists.categories;
    Promise.all([
      Requester.get(artist_route),
      Requester.get(works_route),
      Requester.get(categories_route)
    ]).then(
      response => {
        const [artist_response, works_response, categories_response] = response;
        this.setState({
          artist: artist_response,
          works: works_response,
          categories: categories_response,
          componentDidMount: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  handleChange = (event) => {
    const artist = this.state.artist;
    artist[event.target.name] = event.target.value;
    this.setState({ artist: artist });
  }

  setFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      return;
    }

    this.setState({ avatar: files[0] });
  }

  handleSubmit = (event) => {

    event.preventDefault();
    let formData = new FormData();
    const formKeys = ['name', 'program', 'media', 'description', 'featured_work_id'];
    formKeys.forEach(key => {
      formData.append(`artist[${key}]`, this.state.artist[key]);
    });

    const { avatar } = this.state;
    if (avatar) {
      formData.append('artist[avatar]', avatar, avatar.name);
    }

    fetch(APIRoutes.artists.update(this.state.artist.artist_id), {
      method: 'PUT',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/artists/` + this.state.artist.artist_id;
    }).catch((data) => {
      console.error(data);
    });
  }

  render() {
    console.log(this.state.artist);
    if (!this.state.componentDidMount) {
      return (
        <div><h2>Loading</h2></div>
      )
    }
    return (
      <div className="mw6 center">
        <h1>UPDATE ARTIST</h1>
        <form action={APIRoutes.artists.update(this.state.artist.artist_id)} method="PUT" onSubmit={this.handleSubmit}>
          <h5>Name</h5>
          <input
            value={this.state.artist.name}
            onChange={this.handleChange}
            name="name"
            type="text"
            className="textinput"
            required
          />
          <h5>Program</h5>
          <select
            value={this.state.artist.program}
            onChange={this.handleChange}
            name="program"
            className="input-dropdown ttc"
            required
          >
            {
              Object.keys(this.state.categories.program).map((obj, i) => {
                return <option key={i} value={obj}>{obj.replace(/_/g, ' ').replace(/(and)/, '+')}</option>
              })
            }
          </select>
          <h5>Media</h5>
          <input
            value={this.state.artist.media}
            onChange={this.handleChange}
            name="media"
            type="text"
            className="textinput"
            required
          />
          <h5>Description</h5>
          <input
            value={this.state.artist.description}
            onChange={this.handleChange}
            name="description"
            type="text"
            className="textinput"
            required
          />

          <h5>Featured Work</h5>
          <select
            onChange={this.handleChange}
            value={this.state.artist.featured_work_id}
            name="featured_work_id"
            className="input-dropdown">
            {
              this.state.works.map(work => {
                return <option key={work.id} value={work.id}>{work.title}</option>
              })
            }
          </select>

          <h5>Profile Photo</h5>
          <input name="avatar" id="avatar" type="file" onChange={this.setFile} />

          <div className="submit-container mt3 mb3">
            <Button
              intent={Intent.PRIMARY}
              onClick={() => { window.location = `/artists/${this.state.artist.artist_id}` }}
              text="Cancel"
              className="button-secondary b--magenta w4"
            />
            <Button
              intent={Intent.SECONDARY}
              type="submit"
              text="Save"
              className="button-primary bg-magenta w4 ml3"
            />
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateArtist;
