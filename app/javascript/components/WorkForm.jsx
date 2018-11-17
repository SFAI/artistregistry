import PropTypes from "prop-types"
import React from 'react';
import { Button, Dialog, Intent } from "@blueprintjs/core"
import { getCSRFToken } from '../shared/helpers/form_helpers.js'
import Dropzone from "react-dropzone";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class WorkForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      work: {
        title: this.props.title,
        material: this.props.material,
        medium: this.props.medium,
        availability: this.props.availability,
        images: this.props.images,
        artist_id: this.props.artist_id,
      },
      route: this.props.route,
      method: this.props.method,
      categories: {
        "medium": 0,
        "availability": 0
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.mediumHandleChange = this.mediumHandleChange.bind(this);
    this.availabilityHandleChange = this.availabilityHandleChange.bind(this);
  }

  componentDidMount() {
    console.log("---------PROPS WORK-----------");
    console.log(this.props.work);
    const route = APIRoutes.works.categories;
    Requester.get(route).then(
      response => {
        this.setState({
          categories: response,
          componentDidMount: true
        });
        console.log(this.state.categories);
      },
      error => {
        console.error(error);
      }
    );
  }

  handleChange(event) {
    const work = this.state.work;
    work[event.target.name] = event.target.value;
    this.setState({ work: work });
  }

  mediumHandleChange(event) {
    const work = this.state.work;
    work["medium"] = event.target.value;
    console.log(event.target.value);
    this.setState({ work: work });
    console.log(this.state.work);
  }

  availabilityHandleChange(event) {
    const work = this.state.work;
    work["availability"] = event.target.value;
    console.log(event.target.value);
    this.setState({ work: work });
    console.log(this.state.work);
  }

  handleSubmit(event) {

    event.preventDefault();

    let formData = new FormData();
    formData.append('work[title]', this.state.work.title);
    formData.append('work[material]', this.state.work.material);
    formData.append('work[medium]', this.state.work.medium);
    formData.append('work[availability]', this.state.work.availability);
    formData.append('work[artist_id]', this.state.work.artist_id);

    this.state.work.images.forEach((img) => {
      formData.append('work[attachments_attributes][]', img);
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

  onDrop(images) {
    var currentImages = this.state.work.images;
    const [newImages] = images;
    currentImages.push(newImages);
    console.log(currentImages);

    // Assign files dropped into component into state
    var work = this.state.work;
    work.images = currentImages;
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
        <form action={this.state.route} method={this.state.method} onSubmit={this.handleSubmit}>
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
            <div className="drop-down"> Medium:
                <select onChange={this.mediumHandleChange} value={this.state.work.medium}>{
                   Object.keys(this.state.categories.medium).map((obj) => {
                       return <option>{obj}</option>
                   })
                }</select>
              </div>
              <div className="drop-down"> Availability:
                <select onChange={this.availabilityHandleChange} value={this.state.work.availability}>{
                   Object.keys(this.state.categories.availability).map((obj) => {
                       return <option>{obj}</option>
                   })
                }</select>
              </div>

            <div className="upload-image-component">Images:
              <Dropzone
                onDrop={this.onDrop}
                multiple={true}
              />
              <div>
                {this.state.work.images.map((img) => {
                  return <div>{img.name}</div>
                })
              }</div>
            </div>
          </div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button
                intent={Intent.SECONDARY}
                type="submit"
                text="Save Changes"
              />
              <Button
                intent={Intent.PRIMARY}
                onClick={() => {window.location = `/artists/` + this.state.work.artist_id}}
                text="Cancel"
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default WorkForm;
