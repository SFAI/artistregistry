import PropTypes from "prop-types"
import React from 'react';
import Dropzone from "react-dropzone";
import UploadThumbnail from "./UploadThumbnail";
import update from 'immutability-helper';
import FormError from '../helpers/FormError';
import LoadingOverlay from '../helpers/LoadingOverlay';
import { convertSnakeCase } from "../../utils/strings";

class WorkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: this.props.work,
      route: this.props.route,
      method: this.props.method,
      categories: null,
      componentDidMount: false,
      updatingWork: false,
      uploads: [],
      attachmentsToDelete: [],
      errors: {
        title: "",
        material: "",
        description: "",
        images: "",
        featuredImage: ""
      }
    }
  }

  componentDidMount = () => {
    const route = APIRoutes.works.categories;
    Requester.get(route).then(
      response => {
        this.setState({
          categories: response,
          componentDidMount: true
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  updateFeatured = () => {
      const works_route = APIRoutes.artists.works(this.props.work.artist_id);
      Requester.get(works_route).then(
        response => {
          if (response.length == 1) {
            let work_id = response[0].id
            let formData = new FormData();
            formData.append(`artist[featured_work_id]`, work_id);
            fetch(APIRoutes.artists.update(this.state.work.artist_id), {
              method: 'PUT',
              body: formData,
              credentials: 'same-origin',
              headers: {
                "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
              }
            }).catch(
              (data) => {
                console.error(data);
              })
          }
        },
        error => {
          console.error(error);
        }
      );
    }

  onDrop = (images) => {
    let uploads = this.state.uploads.slice();
    images.forEach((image) => {
      let upload = {
        img: image,
        preview: URL.createObjectURL(image)
      };
      uploads.push(upload);
    });
    this.setState({ uploads: uploads });
  }

  cleanFileName = (str) => {
    return str.substring(str.lastIndexOf("/") + 1)
  }

  allFileNames = () => {
    let filenames = []
    filenames.push("");
    this.state.work.attached_images_urls.forEach((attachment) => {
      filenames.push(this.cleanFileName(attachment.url));
    })
    this.state.uploads.forEach((upload) => {
      filenames.push(upload.img.name);
    })
    return filenames;
  }

  handleChange = (event) => {
    const work = this.state.work;
    work[event.target.name] = event.target.value;
    this.setState({ work: work });
  }

  checkErrors() {
    let errors = {
      title: "",
      material: "",
      dimensions: "",
      description: "",
      images: "",
      featuredImage: ""
    };
    if (!this.state.work.title) {
      errors["title"] = "This field cannot be empty.";
    }
    if (!this.state.work.material) {
      errors["material"] = "This field cannot be empty.";
    }
    if (!this.state.work.dimensions) {
      errors["dimensions"] = "This field cannot be empty.";
    }
    if (!this.state.work.description) {
      errors["description"] = "This field cannot be empty.";
    }
    let numImages = this.allFileNames().length - 1;
    if (!numImages) {
      errors["images"] = "You must attach at least one image.";
    }
    if (numImages > 4) {
      errors["images"] = "A maximum of four images is allowed.";
    }
    if (!this.state.work.featured_image) {
      errors["featuredImage"] = "You must select a featured image.";
    }
    return errors;
  }

  handleSubmit = () => {
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
      this.setState({ updatingWork: true });
      let formData = new FormData();
      const formKeys = ['artist_id', 'title', 'material', 'media', 'links', 'availability', 'hidden', 'description', 'featured_image'];
      formKeys.forEach(key => {
        formData.append(`work[${key}]`, this.state.work[key]);
      });

      this.state.attachmentsToDelete.forEach((attachment) => {
        formData.append('work[attachments_to_delete][]', attachment);
      });

      this.state.uploads.forEach((upload) => {
        formData.append('work[attachments_attributes][]', upload.img);
      });

      fetch(this.state.route, {
        method: this.state.method,
        body: formData,
        credentials: 'same-origin',
        headers: {
          "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
        }
      }).then((data) => {
        if (typeof this.state.work.id == 'number') {
          window.location = `/works/` + this.state.work.id;
        } else {
          this.updateFeatured()
          window.location = `/artists/` + this.state.work.artist_id;
        }
      }).catch((data) => {
        console.error(data);
      });
    }
  }

  deletePosted = (id) => {
    let attachmentsToDelete = this.state.attachmentsToDelete.slice();
    attachmentsToDelete.push(id);

    const newWork = update(this.state.work, {
      attached_images_urls: uploads => uploads.filter(upload => upload["id"] != id)
    });

    this.setState({ attachmentsToDelete: attachmentsToDelete, work: newWork });
  }

  deleteImage = (i) => {
    let uploads = this.state.uploads;
    delete uploads[i];
    this.setState({ uploads: uploads });
  }

  renderThumbnails = () => {
    return (
      <div className="cards">
        {
          this.state.work.attached_images_urls.map((attachment) => {
            return (
              <UploadThumbnail
                filename={this.cleanFileName(attachment.url)}
                key={attachment.id}
                src={attachment.url}
                delete={() => this.deletePosted(attachment.id)}
              />
            )
          })
        }
        {
          this.state.uploads.map((upload, i) => {
            return (
              <UploadThumbnail
                filename={upload.img.name}
                key={i}
                src={upload.preview}
                delete={() => this.deleteImage(i)}
              />
            )
          })
        }
      </div>
    );
  }

  deleteWork = () => {
    let work_id = this.state.work.id
    fetch(APIRoutes.works.delete(work_id), {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      if (work_id == this.state.work.artist.featured_work_id) {
        this.updateFeatured(work_id)
        window.location = `/artists/` + this.state.work.artist_id;
      } else {
        window.location = `/artists/` + this.state.work.artist_id;
      }
    }).catch((data) => {
      console.error(data);
    });
  }
    
  toggleHidden = (event) => {
    let new_work = this.state.work
    new_work.hidden = event.target.checked
    this.setState({ work: new_work })
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <LoadingOverlay itemType="form" fullPage={true} />
      )
    }

    let formLoadingOverlay = (this.state.updatingWork ? <LoadingOverlay /> : null);
    return (
      <div className="bg-white pa3 relative">
        {formLoadingOverlay}
        <h5>Title</h5>
        <input
          value={this.state.work.title}
          onChange={this.handleChange}
          name="title"
          type="text"
          className="textinput"
        />
        <FormError error={this.state.errors["title"]} />
        <h5>Material</h5>
        <input
          value={this.state.work.material}
          onChange={this.handleChange}
          name="material"
          type="text"
          className="textinput"
        />
        <FormError error={this.state.errors["material"]} />
        <h5>Dimensions</h5>
        <input
          value={this.state.work.dimensions}
          onChange={this.handleChange}
          name="dimensions"
          type="text"
          className="textinput"
        />
        <FormError error={this.state.errors["dimensions"]} />
        <h5>Media</h5>
        <select
          onChange={this.handleChange}
          value={this.state.work.media}
          name="media"
          className="input-dropdown ttc">
          {
            Object.keys(this.state.categories.media).map((obj, i) => {
              return <option key={i}>{convertSnakeCase(obj)}</option>
            })
          }
        </select>
        <h5>Availability</h5>
        <select
          onChange={this.handleChange}
          value={this.state.work.availability}
          name="availability"
          className="input-dropdown ttc">
          {
            Object.keys(this.state.categories.availability).map((obj, i) => {
              return <option key={i}>{obj}</option>
            })
          }
        </select>
        <div className="flex items-center mv2">
          <h5 className="mr2 mb0">Hidden</h5>
          <input
            onChange={this.toggleHidden}
            value={this.state.work.hidden}
            name="hidden"
            type="checkbox"
            checked={this.state.work.hidden}
            id="checkbox-hidden"
            className="checkbox-berry"
          />
        </div>
        <h5>Links</h5>
        <textarea
          rows={2}
          name="links"
          onChange={this.handleChange}
          type="TEXT"
          className="textarea"
          value={this.state.work.links}
        />
        <h5>Description</h5>
        <textarea
          rows={4}
          name="description"
          onChange={this.handleChange}
          type="TEXT"
          className="textarea"
          value={this.state.work.description}
        />
        <FormError error={this.state.errors["description"]} />
        <h5>Images</h5>
        <div className="dropzone-container">
          <Dropzone
            onDrop={this.onDrop}
            multiple={true}
            accept="image/jpeg, image/png"
            className="dropzone w-100 mt2 mb2"
          >
            <h2 className="gray">Drop images here to upload.</h2>
          </Dropzone>
        </div>
        <div className="mb2 mt2 w-100">
          {this.renderThumbnails()}
        </div>
        <FormError error={this.state.errors["images"]} />
        <h5>Featured Image</h5>
        <select
          onChange={this.handleChange}
          value={this.state.work.featured_image}
          name="featured_image"
          className="input-dropdown">
          {
            this.allFileNames().map((filename, i) => {
              return <option key={i}>{filename}</option>
            })
          }
        </select>
        <FormError error={this.state.errors["featuredImage"]} />
        <div className="submit-container mt3 mb3">
          <button
            onClick={() => { window.location = `/artists/` + this.state.work.artist_id }}
            className="button-tertiary berry w4"
          >
            Cancel
          </button>
          <button
            className="button-primary bg-berry w4 ml3"
            onClick={this.handleSubmit}
          >
            Save
          </button>
        </div>
        {this.state.work.id && 
          <div className="mv2">
            <h5> Remove this work permanently? </h5>
            <button
              onClick={() => {if (window.confirm('Are you sure you wish to delete this work?')) this.deleteWork() } }
              className="button-secondary berry b--berry w4 mv2"
            >
              Delete
            </button>
          </div>
        }
      </div>
    )
  }
}

export default WorkForm;
