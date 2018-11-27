import PropTypes from "prop-types";
import React from "react";
import Touchable from 'rc-touchable';

class WorkToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 0
    };
  }
  
  render() {
    let work = this.props.work;
    console.log(work);
    return (
      <div className="bg-white w-100 full-image-container pa3">
        <div className="work-toggle-container">
          <img src={work.attached_images_urls[this.state.image].url} className="full-image"/>
        </div>
        <div className="thumbs">
          {
            work.attached_images_urls.map((image, i) => {
              return (
                <Touchable onPress={() => this.setState({ image: i })}>
                  <div className="relative thumb pointer">
                    <div className={i === this.state.image ? "" : "toggle-thumb-opacity"} />
                    <img className="toggle-thumb" src={image.url}/>
                  </div>
                </Touchable>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default WorkToggle;
