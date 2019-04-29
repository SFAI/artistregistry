import PropTypes from "prop-types";
import React from "react";
import Touchable from 'rc-touchable';
import { reformatPrograms } from "../../utils/strings";

class UserSnapshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { avatarSrc, color, name, program, degree, email } = this.props;
    return (
      <div className="bg-white snapshot pa3">
        <Touchable onPress={() => this.props.navigate()}>
          <div className="h2 w2 mr3 br-100 bg-gray self-center snapshot-nav">
            {avatarSrc !== "" &&
              <img className="h2 w2 br-100" src={avatarSrc} alt={name} />
            }
          </div>
        </Touchable>
        <div className="snapshot-content">
          <Touchable onPress={() => this.props.navigate()}>
          <a className={`snapshot-nav ${color}`}>{name}</a>
          </Touchable>
          {program &&
            <h6 className="ttc mb0">
              {`${degree && degree.toUpperCase()} ${reformatPrograms(program)}`}
            </h6>
          }
          {email && <h6 className="truncate">{email}</h6>}
        </div>
      </div>
    );
  }
}

export default UserSnapshot;
