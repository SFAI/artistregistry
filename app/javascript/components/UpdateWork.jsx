import PropTypes from "prop-types"
import React from 'react';
import { Button, Dialog, Intent } from "@blueprintjs/core"
import { getCSRFToken } from '../shared/helpers/form_helpers.js'
import Dropzone from "react-dropzone";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class UpdateWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      work: {
        id: this.props.work.id,
        title: this.props.work.title,
        material: this.props.work.material,
        medium: this.props.work.medium,
        availability: this.props.work.availability,
        images: [],
        artist_id: this.props.work.artist_id,
      },
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
    console.log(event.target.name);
    console.log(event.target.value);
    work[event.target.name] = event.target.value;
    this.setState({ work: work });
    console.log(this.state.work);
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
      console.log(img);
      formData.append('work[attachments_attributes][]', img);
    });

    fetch(APIRoutes.works.update(this.state.work.id), {
      method: 'PUT',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      window.location = `/artists/` + this.props.work.artist_id;
    }).catch((data) => {
      console.error(data);
    });
  }

  onDrop(images) {
    var currentImages = this.state.work.images;
    const [newImages] = images;
    currentImages.push(newImages);
    console.log("ON DROP IMAGES-----------");
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
        <form action={APIRoutes.works.update(this.state.work.id)} method='PUT' onSubmit={this.handleSubmit}>
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

export default UpdateWork;
