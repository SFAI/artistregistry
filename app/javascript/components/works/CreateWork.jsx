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
    return (
      <div className="mw6 center pt3">
        <h1>Create New Work</h1>
        <WorkForm
          work={this.state.work}
          route={this.state.route}
          method={this.state.method} />
      </div>
    )
  }
}

export default CreateWork;