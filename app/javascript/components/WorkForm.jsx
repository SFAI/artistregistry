import PropTypes from "prop-types"
import React from 'react';
import { Button, Dialog, Intent } from "@blueprintjs/core"
import { getCSRFToken } from '../shared/helpers/form_helpers.js'
import Dropzone from "react-dropzone";
import UploadThumbnail from "./UploadThumbnail";
import update from 'immutability-helper';

class WorkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: this.props.work,
      route: this.props.route,
      method: this.props.method,
      categories: null,
      componentDidMount: false,
      uploads: [],
      attachmentsToDelete: []
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

  onDrop = (images) => {
    this.setState({
      uploads: images.map(image => ({
        img: image,
        preview: URL.createObjectURL(image)
      }))
    });
  }

  cleanFileName = (str) => {
    return str.substring(str.lastIndexOf("/") + 1)
  }

  allFileNames = () => {
    let filenames = []
    filenames.push("");
    this.state.work.attached_images_urls.forEach((attachment) => {
      filenames.push(this.cleanFileName(attachment.url));
    })
    this.state.uploads.forEach((upload) => {
      filenames.push(upload.img.name);
    })
    return filenames;
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

    this.state.attachmentsToDelete.forEach((attachment) => {
      formData.append('work[attachments_to_delete][]', attachment);
    })

    formData.append('work[featured_image]', this.state.work.featured_image);

    this.state.uploads.forEach((upload) => {
      formData.append('work[attachments_attributes][]', upload.img);
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

  deletePosted = (id) => {
    let attachmentsToDelete = this.state.attachmentsToDelete.slice();
    attachmentsToDelete.push(id);

    const newWork = update(this.state.work, {
      attached_images_urls: uploads => uploads.filter(upload => upload["id"] != id)
    });

    this.setState({ attachmentsToDelete: attachmentsToDelete, work: newWork });
  }

  deleteImage = (i) => {
    let uploads = this.state.uploads;
    delete uploads[i];
    this.setState({ uploads: uploads });
  }

  renderThumbnails = () => {
    return (
      <div className="cards">
        {
          this.state.work.attached_images_urls.map((attachment) => {
            return (
              <UploadThumbnail
                filename={this.cleanFileName(attachment.url)}
                key={attachment.id}
                src={attachment.url}
                delete={() => this.deletePosted(attachment.id)}
              />
            )
          })
        }
        {
          this.state.uploads.map((upload, i) => {
            return (
              <UploadThumbnail
                filename={upload.img.name}
                key={i}
                src={upload.preview}
                delete={() => this.deleteImage(i)}
              />
            )
          })
        }
      </div>
    );
  }

  render() {
    console.log(this.state.work);
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
            className="textinput"
            required
          />
          <h5>Material</h5>
          <input
            value={this.state.work.material}
            onChange={this.handleChange}
            name="material"
            type="text"
            className="textinput"
            required
          />
          <h5>Medium</h5>
          <select
            onChange={this.handleChange}
            value={this.state.work.medium}
            name="medium"
            className="input-dropdown">
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
            name="availability"
            className="input-dropdown">
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
            className="textarea"
            value={this.state.work.description}
          />
          <h5>Images</h5>
          <div className="dropzone-container">
            <Dropzone
              onDrop={this.onDrop}
              multiple={true}
              accept="image/jpeg, image/png"
              className="dropzone w-100 mt2 mb2"
            >
              <h2>Drop images here to upload.</h2>
            </Dropzone>
          </div>
          <div className="mb2 mt2 w-100">
            {this.renderThumbnails()}
          </div>
          <h5>Featured Image</h5>
          <select
            onChange={this.handleChange}
            value={this.state.work.featured_image}
            name="featured_image"
            className="input-dropdown">
            {
              this.allFileNames().map((filename, i) => {
                return <option key={i}>{filename}</option>
              })
            }
          </select>
          <div className="submit-container mt3 mb3">
            <Button
              intent={Intent.PRIMARY}
              onClick={() => {window.location = `/artists/` + this.state.work.artist_id}}
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

export default WorkForm;
