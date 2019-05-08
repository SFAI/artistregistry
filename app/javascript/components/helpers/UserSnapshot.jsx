import PropTypes from "prop-types";
import React from "react";
import { reformatPrograms } from "../../utils/strings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class UserSnapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { avatarSrc, color, name, program, degree, email } = this.props;
    return (
      <div className="bg-white flex items-center pa3">
        <a href={this.props.navigate}>
          <div className="h2 w2 br-100 self-center">
            {avatarSrc ? (
              <img className="h2 w2 br-100" src={avatarSrc} alt={name} />
            ) : (
              <FontAwesomeIcon
                className="mr2 gray pointer"
                icon={faUserCircle}
                size="2x"
              />
            )}
          </div>
        </a>
        <div className="ml3">
          <a className={`${color} pointer`} href={this.props.navigate}>
            {name}
          </a>
          {program && (
            <h6 className="ttc mb0">
              {`${degree && degree.toUpperCase()} ${reformatPrograms(program)}`}
            </h6>
          )}
          {email && <h6 className="truncate">{email}</h6>}
        </div>
      </div>
    );
  }
}

export default UserSnapshot;
