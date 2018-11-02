import PropTypes from "prop-types"
import React from 'react';
import { Button, Dialog, Intent } from "@blueprintjs/core"
import { getCSRFToken } from '../shared/helpers/form_helpers.js'
import Dropzone from "react-dropzone";


// import { APIRoutes } from '../../config/routes';
// import PropTypes from 'prop-types';
/**
 * @prop onCreatbeWork - callback function when work create form is submitted
 */
class CreateWorkModal extends React.Component {
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
      },
      isOpen: false,
    }

    this.toggleAddWork = this.toggleAddWork.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);

  toggleAddWork() {
    if (this.state.isOpen == true) {
      this.setState({ isOpen: false })
    } else {
      this.setState({ isOpen: true })
    }
  }

  handleChange(event) {
    console.log("HANDLE CHANGE!!!!!!")
    const work = this.state.work;
    work[event.target.name] = event.target.value
    this.setState({ work: work })
  }

  handleSubmit(event) {

    event.preventDefault()

    let formData = new FormData()
      formData.append('work[title]', this.state.work.title)
      formData.append('work[material]', this.state.work.material)
      formData.append('work[medium]', this.state.work.medium)
      formData.append('work[availability]', this.state.work.availability)

    this.state.work.images.forEach((img) => {
      formData.append('attachments[]', img)
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
      console.error(data)
    });

  }

  onDrop(images) {
    var currentImages = this.state.work.images;


    const [newImages] = images;
    currentImages.push(newImages);

    // Assign files dropped into component into state
    var work = this.state.work;
    work.images = currentImages
    this.setState({
     work: work
    });
  }

  render() {
    return (
      <div>
        <Button className='add-work-button pt-icon-add pt-large' onClick={this.toggleAddWork}>Create New Work</Button>
        <Dialog
          iconName="pt-icon-add"
          isOpen={this.state.isOpen}
          onClose={this.toggleAddWork}
          title="Add"
        >
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
                  name="media"
                  type="text"
                  className="pt-input"
                  required
                />
              </p>
              <p className="pt-ui-text">Medium:
                <input
                  value={this.state.work.medium}
                  onChange={this.handleChange}
                  name="work_type"
                  type="text"
                  className="pt-input"
                  required
                />
              </p>
              <p className="pt-ui-text">Availability:
                <input
                  value={this.state.work.availability}
                  onChange={this.handleChange}
                  name="status"
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
                  onClick={this.toggleAddResource}
                  text="Close"
                />
              </div>
            </div>
          </form>
        </Dialog>
      </div>
    )
  }
}

export default CreateWorkModal;
