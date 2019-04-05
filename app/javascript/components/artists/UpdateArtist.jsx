import PropTypes from "prop-types"
import React from 'react';
import Button from "../helpers/Button";
import FormError from "../helpers/FormError";
import LoadingOverlay from "../helpers/LoadingOverlay";
import { convertSnakeCase } from "../../utils/snake_case";

class UpdateArtist extends React.Component {
  constructor(props) {
    super(props);
    const { artist_id } = this.props.artist_id;
    this.state = {
      artist: {},
      works: [],
      categories: {},
      componentDidMount: false,
      apiFetchError: false,
      updatingArtist: false,
      avatar: null,
      errors: {
        name: "",
        media: "",
        description: "",
        featured_work: ""
      }
    }
  }

  componentDidMount = () => { this.fetchData(); }

  fetchData = () => {
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
        this.setState({ apiFetchError: true })
      }
    );
  }

  selectFile = () => {
    this.avatar.click();
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

  checkErrors() {
    const { artist } = this.state;
    let errors = {};
    if (!artist.name) {
      errors.name = "This field cannot be empty."
    }
    if (!artist.media) {
      errors.media = "This field cannot be empty."
    }
    if (!artist.description) {
      errors.description = "This field cannot be empty."
    }
    return errors;
  }

  handleSubmit = (event) => {

    let errors = this.checkErrors();

    let hasErrors = false;
    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      this.setState({ errors: errors });
    } else {
      this.setState({ updatingArtist: true })
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

      fetch(APIRoutes.artists.update(this.state.artist.id), {
        method: 'PUT',
        body: formData,
        credentials: 'same-origin',
        headers: {
          "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
        }
      }).then((data) => {
        window.location = `/artists/` + this.state.artist.id;
      }).catch((data) => {
        console.error(data);
      });
    }
  }

  render() {
    if (this.state.apiFetchError) {
      return (
        <div className="mw6 center pt4">
          <h2>Unable to load page.</h2>
          <button onClick={this.fetchData}>Try again</button>
        </div>
      )
    }
    if (!this.state.componentDidMount) {
      return <LoadingOverlay itemType="information" fullPage={true} />;
    }

    let formLoadingOverlay = this.state.updatingArtist ? <LoadingOverlay /> : null;
    return (
      <div className="mw6 center">
        <h1>UPDATE ARTIST</h1>
        <div className="bg-white pa3 relative">
          {formLoadingOverlay}
          <h5>Name</h5>
          <input
            value={this.state.artist.name}
            onChange={this.handleChange}
            name="name"
            type="text"
            className="textinput"
            required
          />
          <FormError error={this.state.errors.name}/>
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
                return <option key={i} value={obj}>{convertSnakeCase(obj)}</option>
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
          <FormError error={this.state.errors.media}/>
          <h5>Description</h5>
          <input
            value={this.state.artist.description}
            onChange={this.handleChange}
            name="description"
            type="text"
            className="textinput"
            required
          />
          <FormError error={this.state.errors.description}/>
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
          <div className="avatar-sel">
            <input
              name="avatar"
              id="avatar"
              type="file"
              ref={(node) => this.avatar = node}
              onChange={this.setFile}
            />
            <Button
              onClick={this.selectFile}
              className="w4"
              type="button-secondary"
              color="indigo"
            >
              Select File
            </Button>
            <h5 className="ml2">
              {
                this.state.avatar ? (
                  this.state.avatar.name
                ) : (
                  this.state.artist.avatar &&
                  this.state.artist.avatar.name
                )
              }
            </h5>
          </div>
          <div className="submit-container mt3">
            <Button
              onClick={() => { window.location = `/artists/${this.state.artist.id}` }}
              className="w4"
              type="button-secondary"
              color="indigo"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              type="button-primary"
              color="indigo"
              className="w4 ml2"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default UpdateArtist;
