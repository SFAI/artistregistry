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
        title: 'hello',
        media: 'ahhhh',
        work_type: 1,
        status: 1,
        images: [],
        artist_id: 0
      },
      isOpen: false,
    }

    // this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this.toggleAddWork = this.toggleAddWork.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    // this._handleFormChange = this._handleFormChange.bind(this);
    // this._handleSaveWork = this._handleSaveWork.bind(this);
  }

  // _handleFormChange(values){
  //   //formData will be a json object that will contain refs of every field
  //   this.setState({ formValues : values });
  // }

  // _getInitialFormValues() {
  //   let values = {
  //     title: "",
  //     media: "",
  //     work_type: 0,
  //     status: 0,
  //     artist: 0,
  //   }
  //   return values
  // }

  // _handleSaveWork() {
  //   if (this.state.formValues) {
  //     this.props.onSaveWork({work: this.state.formValues})
  //   } else {
  //   }
  // }

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
      formData.append('work[media]', this.state.work.media)
      formData.append('work[work_type]', "painting")
      formData.append('work[status]', "sold")
      formData.append('work[images]', this.state.work.images)
    /*
    for (var x = 0; x < this.state.work.images.length; x++) {
        formData.append("work[images][]", this.state.work.images[x],this.state.work.images[x].name);
    }*/
    /*
    this.state.work.images.forEach((img, i) => {
      formData.append("doc[]", {
        uri: img.uri,
        type: "image/jpeg",
        name: img.filename || `filename${i}.jpg`,
      });
    });
    */

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
    // Get existing files from state
    // (or just the empty array if there are no files in state)
    var currentImages = this.state.work.images;


    // Push file(s) from function parameters to `currentFiles` array
    const [newImages] = images;
    currentImages.push(newImages);

    // Assign files dropped into component into state
    var work = this.state.work;
    work.images = currentImages
    this.setState({
     work: work
    });
    console.log("after upload")
    console.log(this.state.work)
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
              <p className="pt-ui-text">Media:
                <input
                  value={this.state.work.media}
                  onChange={this.handleChange}
                  name="media"
                  type="text"
                  className="pt-input"
                  required
                />
              </p>
              <p className="pt-ui-text">Work Type:
                <input
                  value={this.state.work.work_type}
                  onChange={this.handleChange}
                  name="work_type"
                  type="text"
                  className="pt-input"
                  required
                />
              </p>
              <p className="pt-ui-text">Status:
                <input
                  value={this.state.work.status}
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
