import PropTypes from "prop-types"
import React from 'react';
import WorkForm from './WorkForm.jsx';

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
      route: APIRoutes.works.update(this.props.work.id),
      method: 'PUT',
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
      <WorkForm
        title={this.state.work.title}
        material={this.state.work.material}
        medium={this.state.work.medium}
        availability={this.state.work.availability}
        images={this.state.work.images}
        featured_image={this.state.work.featured_image}
        artist_id={this.state.work.artist_id}
        route={this.state.route}
        method={this.state.method} />
    )
  }
}

export default UpdateWork;
