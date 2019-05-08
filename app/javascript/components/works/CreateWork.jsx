import PropTypes from "prop-types";
import React from "react";
import WorkForm from "./WorkForm.jsx";

class CreateWork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      work: {
        title: "",
        material: "",
        media: "painting",
        availability: "active",
        hidden: false,
        attached_images_urls: [],
        description: "",
        links: "",
        featured_image: "",
        artist_id: this.props.artist.id,
      },
      route: APIRoutes.works.create,
      method: "POST",
    };
  }

  render() {
    return (
      <div className="mw6 center pt3">
        <h1>Create New Work</h1>
        <WorkForm
          work={this.state.work}
          route={this.state.route}
          method={this.state.method}
        />
      </div>
    );
  }
}

export default CreateWork;
