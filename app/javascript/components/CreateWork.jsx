import PropTypes from "prop-types"
import React from 'react';
import WorkForm from './WorkForm.jsx';

class CreateWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      work: {
        title: '',
        material: '',
        medium: "painting",
        availability: "active",
        attached_images_urls: [],
        description: '',
        featured_image: '',
        artist_id: this.props.artist_id
      },
      route: APIRoutes.works.create,
      method: 'POST',
    }
  }

  render() {
    // TODO: Render thumbnails of images upon upload.
    // TODO: Retrieve enums using works#get_work_category_enums method, rendering a dropdown
    // rather than a text box below.
    // Add error handling
    // Also address the classNames. I think that they are part of the palantir CSS import,
    // but we can't import this since it screws with our styles :(
    return (
      <div className="mw8 center pt3">
        <h1>Add New Art</h1>
        <WorkForm
          work={this.state.work}
          route={this.state.route}
          method={this.state.method} />
      </div>
    )
  }
}

export default CreateWork;
