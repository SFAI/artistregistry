import PropTypes from "prop-types"
import React from 'react';
import { Button, Dialog, Intent } from "@blueprintjs/core"
import { getCSRFToken } from '../shared/helpers/form_helpers.js'
import Dropzone from "react-dropzone";

class CreateWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      work: {
        title: '',
        material: '',
        medium: 0,
        availability: 0,
        images: [],
        artist_id: this.props.artist_id
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleChange(event) {
    const work = this.state.work;
    work[event.target.name] = event.target.value;
    this.setState({ work: work });
  }

  handleSubmit(event) {

    event.preventDefault();

    let formData = new FormData();
    formData.append('work[title]', this.state.work.title);
    formData.append('work[material]', this.state.work.material);
    formData.append('work[medium]', this.state.work.medium);
    formData.append('work[availability]', this.state.work.availability);
    formData.append('work[artist_id]', this.props.artist.id);

    this.state.work.images.forEach((img) => {
      console.log(img);
      formData.append('work[attachments_attributes][]', img);
    });

    fetch(APIRoutes.works.create, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {



    }).catch((data) => {
      console.error(data);
    });
  }

  onDrop(images) {
    var work = this.state.work;
    work.images = images
    this.setState({ work: work });
  }

  render() {
    // TODO: Render thumbnails of images upon upload.
    // TODO: Retrieve enums using works#get_work_category_enums method, rendering a dropdown
    // rather than a text box below.
    // Add error handling
    // Also address the classNames. I think that they are part of the palantir CSS import,
    // but we can't import this since it screws with our styles :(
    return (
      <div>
        <form action={APIRoutes.works.create} method='POST' onSubmit={this.handleSubmit}>
          <div className="pt-dialog-body">
            <p className="pt-ui-text">Title:
              <input
                value={this.state.work.title}
                onChange={this.handleChange}
                name="title"
                type="text"
                className="pt-input"
                required
              />
            </p>
            <p className="pt-ui-text">Material:
              <input
                value={this.state.work.material}
                onChange={this.handleChange}
                name="material"
                type="text"
                className="pt-input"
                required
              />
            </p>
            <p className="pt-ui-text">Medium:
              <input
                value={this.state.work.medium}
                onChange={this.handleChange}
                name="medium"
                type="text"
                className="pt-input"
                required
              />
            </p>
            <p className="pt-ui-text">Availability:
              <input
                value={this.state.work.availability}
                onChange={this.handleChange}
                name="availability"
                type="text"
                className="pt-input"
                required
              />
            </p>
            <div className="upload-image-component">Images:
              <Dropzone
                onDrop={this.onDrop}
                multiple={true}
              />
            </div>
          </div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button
                intent={Intent.SECONDARY}
                type="submit"
                text="Submit"
              />
              <Button
                intent={Intent.PRIMARY}
                onClick={() => {window.location = `/artists/` + this.props.artist.id}}
                text="Cancel"
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateWork;