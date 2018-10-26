import React from 'react';
import { Button, Text, ScrollView } from 'react-native';
import { Form, InputField } from 'react-native-form-generator';
import { Button, Dialog, Intent } from "@blueprintjs/core"
import { getCSRFToken } from '../../shared/helpers/form_helpers'


// import { APIRoutes } from '../../config/routes';
// import PropTypes from 'prop-types';
/**
 * @prop onCreateWork - callback function when work create form is submitted
 */
class CreateWorkModal extends React.Component {
  constructor(props) {
    super(props);

    this._getInitialFormValues = this._getInitialFormValues.bind(this);
    this._handleFormChange = this._handleFormChange.bind(this);
    this._handleSaveWork = this._handleSaveWork.bind(this);


    this.state = {
      formValues: this._getInitialFormValues(),
      isOpen: false
    }
  }

  // _handleFormChange(values){
  //   //formData will be a json object that will contain refs of every field
  //   this.setState({ formValues : values });
  // }

  _getInitialFormValues() {
    let values = {
      title: this.props.title,
      media: this.props.media,
      work_type: this.props.work_type,
      status: this.props.status,
      price: this.props.price,
    }
    return values
  }

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
    const formValues = this.state.formValues
    formValues[event.target.name] = event.target.value
    this.setState({ formValues: formValues })
  }

  handleSubmit(event) {
    event.preventDefault()

    fetch(APIRoutes.artists.works(0), {
      method: 'POST',
      body: formValues,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": getCSRFToken()
      }
    }).then((resp) => {
      if (resp.status != 200) {
        alert("There was an error. Try again!")
      }
      window.location.reload()
    })
  }

  render() {
    return (
      <div>
        <Button className='add-work-button pt-icon-add pt-large' onClick={this.toggleAddResource}>Add Resources</Button>
        <Dialog
          iconName="pt-icon-add"
          isOpen={this.state.isOpen}
          onClose={this.toggleAddWork}
          title="Add"
        >
          <form action=APIRoutes.artists.works(0) method='POST' onSubmit={this.handleSubmit}>
            <div className="pt-dialog-body">
              <p className="pt-ui-text">Title:
                <input
                  value={this.state.formValues.title}
                  onChange={this.handleChange}
                  name="title"
                  type="text"
                  className="pt-input"
                  required
                />
              </p>
              <p className="pt-ui-text">Media:
                <input
                  value={this.state.formValues.media}
                  onChange={this.handleChange}
                  name="media"
                  type="text"
                  className="pt-input"
                  required
                />
              </p>
              <p className="pt-ui-text">Work Type:
                <input
                  value={this.state.formValues.work_type}
                  onChange={this.handleChange}
                  name="work_type"
                  type="text"
                  className="pt-input"
                  required
                />
              </p>
              <p className="pt-ui-text">Status:
                <input
                  value={this.state.formValues.status}
                  onChange={this.handleChange}
                  name="status"
                  type="text"
                  className="pt-input"
                  required
                />
              </p>
              <p className="pt-ui-text">Price:
                <input
                  value={this.state.formValues.price}
                  onChange={this.handleChange}
                  name="price"
                  type="text"
                  className="pt-input"
                  required
                />
              </p>

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
