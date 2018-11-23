import PropTypes from "prop-types"
import React from 'react';
import { Button, Dialog, Intent } from "@blueprintjs/core"
import { getCSRFToken } from '../shared/helpers/form_helpers.js'
import Dropzone from "react-dropzone";

class WorkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: this.props.work,
      route: this.props.route,
      method: this.props.method,
      categories: null,
      componentDidMount: false,
      uploads: []
    }
  }

  componentDidMount = () => {
    const route = APIRoutes.works.categories;
    Requester.get(route).then(
      response => {
        this.setState({
          categories: response,
          componentDidMount: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  onDrop = (uploads) => {
    this.setState({
      images: images.map(img => ({
        img: img,
        preview: URL.createObjectURL(img)
      }))
    });
  }

  handleChange = (event) => {
    const work = this.state.work;
    work[event.target.name] = event.target.value;
    this.setState({ work: work });
  }

  handleSubmit = (event) => {

    event.preventDefault();

    let formData = new FormData();
    formData.append('work[title]', this.state.work.title);
    formData.append('work[material]', this.state.work.material);
    formData.append('work[medium]', this.state.work.medium);
    formData.append('work[availability]', this.state.work.availability);
    formData.append('work[artist_id]', this.state.work.artist_id);
    formData.append('work[description]', this.state.work.description);

    let featuredImgIndex = 0;
    this.state.images.forEach((img, i) => {
      if (img.img.name === this.state.featured_image) {
        featuredImgIndex = i;
      }
    });

    formData.append('work[featured_img_index]', featuredImgIndex);

    this.state.images.forEach((img) => {
      formData.append('work[attachments_attributes][]', img.img);
    });

    fetch(this.state.route, {
      method: this.state.method,
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/artists/` + this.state.work.artist_id;
    }).catch((data) => {
      console.error(data);
    });
  }

  deleteImage = (img) => {
    var work = this.state.work;
    var images = work.images;
    var index = images.indexOf(img);
    delete images[index];
    this.setState({work: work});
  }

  render() {
    console.log(this.state.images);
    // TODO: error handling
    if (!this.state.componentDidMount) {
      return (
        <div><h2>Loading</h2></div>
      )
    }
    return (
      <div>
        <form action={this.state.route} method={this.state.method} onSubmit={this.handleSubmit}>
          <h5>Title</h5>
          <input
            value={this.state.work.title}
            onChange={this.handleChange}
            name="title"
            type="text"
            required
          />
          <h5>Material</h5>
          <input
            value={this.state.work.material}
            onChange={this.handleChange}
            name="material"
            type="text"
            required
          />
          <h5>Medium</h5>
          <select
            onChange={this.handleChange}
            value={this.state.work.medium}
            name="medium">
            {
              Object.keys(this.state.categories.medium).map((obj, i) => {
                return <option key={i}>{obj}</option>
              })
            }
          </select>
          <h5>Availability</h5>
          <select
            onChange={this.handleChange}
            value={this.state.work.availability}
            name="availability">
            {
              Object.keys(this.state.categories.availability).map((obj, i) => {
                return <option key={i}>{obj}</option>
              })
            }
          </select>
          <h5>Description</h5>
          <textarea
            rows={4}
            name="description"
            onChange={this.handleChange}
            type="TEXT"
            value={this.state.work.description}
          />
          <h5>Images</h5>
          <Dropzone
            onDrop={this.onDrop}
            multiple={true}
            accept="image/jpeg, image/png"
            className="dropzone"
          >
            {
              this.state.images.map((img, i) => {
                return (
                  <img
                    src={img.preview}
                    className="upload-thumbnail"
                  />
                )
              })
            }
          </Dropzone>
          <h5>Featured Image</h5>
          <select
            onChange={this.handleChange}
            value={this.state.work.featured_image}
            name="featured_image">
            {
              this.state.images.map((img, i) => {
                return <option key={i}>{img.img.name}</option>
              })
            }
          </select>
          <Button
            intent={Intent.SECONDARY}
            type="submit"
            text="Save"
          />
          <Button
            intent={Intent.PRIMARY}
            onClick={() => {window.location = `/artists/` + this.state.work.artist_id}}
            text="Cancel"
          />
        </form>
      </div>
    )
  }
}

export default WorkForm;
