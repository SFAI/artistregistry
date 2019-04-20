import PropTypes from "prop-types"
import React from 'react';
import Button from "../helpers/Button";
import FormError from "../helpers/FormError";
import LoadingOverlay from "../helpers/LoadingOverlay";
import ConfirmEmail from "../helpers/ConfirmEmail";
import Unauthorized from "../helpers/Unauthorized";

class UpdateBuyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyer: {},
      avatar: null,
      componentDidMount: false,
      updatingBuyer: false,
      errors : {
        name: "",
        phone_number: ""
      }
    }
  }

  componentDidMount() {
    const buyerRoute = APIRoutes.buyers.show(this.props.buyer_id);
    Requester.get(buyerRoute).then(
      response => {
        this.setState({ buyer: response, componentDidMount: true });
      },
      error => {
        console.error(error);
      }
    )
  }

  handleChange = (event) => {
    const buyer = this.state.buyer;
    buyer[event.target.name] = event.target.value;
    this.setState({ buyer: buyer });
  }

  setFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      return;
    }

    this.setState({ avatar: files[0] });
  }

  selectFile = () => {
    this.avatar.click();
  }

  checkErrors = () => {
    let errors = {
      name: "",
      phone_number: ""
    }

    const phoneRegEx = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;
    const { buyer } = this.state;
    if (!buyer.phone_number.match(phoneRegEx)) {
      errors.phone_number = "This phone number is invalid.";
    }

    if (!buyer.name) {
      errors.name = "This field cannot be empty.";
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
      event.preventDefault();
      this.setState({ updatingBuyer: true });
      let formData = new FormData();
      formData.append('buyer[name]', this.state.buyer.name);
      formData.append('buyer[phone_number]', this.state.buyer.phone_number);

      let { avatar } = this.state;
      if ( avatar ) {
        formData.append(
          'buyer[avatar]',
          avatar,
          avatar.name
        );
      }

      fetch(APIRoutes.buyers.update(this.state.buyer.id), {
        method: 'PUT',
        body: formData,
        credentials: 'same-origin',
        headers: {
          "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
        }
      }).then((data) => {
        window.location = `/buyers/` + this.state.buyer.id;
      }).catch((data) => {
        console.error(data);
      });
    }
  }

  render() {
    const {buyer_id, buyer_account_id, current_user} = this.props
    if (!current_user || current_user.account_id != buyer_account_id) {
      return (
        <Unauthorized/>
      )
    }
    if (!this.state.componentDidMount) {
      return (
        <LoadingOverlay itemType="information" fullPage={true} />
      );
    }

    let formLoadingOverlay = this.state.updatingBuyer ? <LoadingOverlay /> : null;
    return (
      <div className="mw6 center">
        <h1>UPDATE BUYER</h1>
        <div className="bg-white pa3 relative">
          {formLoadingOverlay}
          <h5>Name</h5>
          <input
            value={this.state.buyer.name}
            onChange={this.handleChange}
            name="name"
            type="text"
            className="textinput"
            required
          />
          <FormError error={this.state.errors.name}/>
          <h5>Phone Number</h5>
          <input
            value={this.state.buyer.phone_number}
            onChange={this.handleChange}
            name="phone_number"
            type="text"
            className="textinput"
            placeholder="123-456-7890"
          />
          <FormError error={this.state.errors.phone_number}/>
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
              color="moss"
            >
              Select File
            </Button>
            <h5 className="ml2">
              {
                this.state.avatar ? (
                  this.state.avatar.name
                ) : (
                  this.state.buyer.avatar &&
                  this.state.buyer.avatar.name
                )
              }
            </h5>
          </div>
          <div className="submit-container mt3 mb3">
            <Button
              onClick={() => {window.location = `/buyers/${this.state.buyer.id}`}}
              type="button-secondary"
              color="moss"
              className="w4"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              type="button-primary"
              color="moss"
              className="w4 ml2"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default UpdateBuyer;
