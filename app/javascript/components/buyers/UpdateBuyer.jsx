import PropTypes from "prop-types"
import React from 'react';
import { Button, Dialog, Intent } from "@blueprintjs/core";



class UpdateBuyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyer: {
        id: this.props.buyer.id,
        name: this.props.buyer.name,
        email: this.props.buyer.email,
        phone_number: this.props.buyer.phone_number,
        avatar: this.props.buyer.avatar
      }
    }
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

  handleSubmit = (event) => {

    event.preventDefault();
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

  render() {
    return (
      <div>
        <h1>UPDATE BUYER</h1>
        <form action={APIRoutes.buyers.update(this.state.buyer.id)} method="PUT" onSubmit={this.handleSubmit}>
          <h5>Name</h5>
          <input
            value={this.state.buyer.name}
            onChange={this.handleChange}
            name="name"
            type="text"
            className="textinput"
            required
          />
          <h5>Phone Number</h5>
          <input
            value={this.state.buyer.phone_number}
            onChange={this.handleChange}
            name="phone_number"
            type="text"
            className="textinput"
            required
          />

          <h5>Profile Photo</h5>
          <input name="avatar" id="avatar" type="file" onChange={this.setFile}/>


          <div className="submit-container mt3 mb3">
            <Button
              intent={Intent.PRIMARY}
              onClick={() => {window.location = `/buyers/${this.state.buyer.id}`}}
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

export default UpdateBuyer;
