import PropTypes from "prop-types";
import React from "react";


class DetailedWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: this.props.work
    }
  }

  componentDidMount = () => {
    
  }


  render() {

   
    return (
      <div>
        Button will go here
      </div>
    );
  }
}

export default DetailedWork;