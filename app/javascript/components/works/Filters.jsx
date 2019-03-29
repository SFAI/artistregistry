import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { convertSnakeCase } from "../../utils/snake_case";

/**
* @prop filters: sub/categories based on Work enums
*/

class Filters extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: {},
    };
  }

  static propTypes = {
    filters: PropTypes.object,
  };

  getQuery = () => {
    const params = this.state.searchParams;
    const filteredParams = Object.keys(params).filter(
      filter_name => params[filter_name].length
    ).reduce((nonEmptyParams, filter_name) => {
      nonEmptyParams[filter_name] = params[filter_name];
      return nonEmptyParams;
    }, {})
    const stringified = Object.keys(filteredParams)
      .map(
        filter_name => {
          if (filteredParams[filter_name].length) {
            return `${filter_name}=` + filteredParams[filter_name].join(`&${filter_name}=`)
          }
        }
      )
      .join("&") + `&hidden=false`;
    return stringified;
  }

  toggleCheckbox = (filter_name, item) => {
    const prevSearchParams = this.state.searchParams[filter_name];

    let newFilterParams;
    if (prevSearchParams && prevSearchParams.includes(item)) {
      newFilterParams = prevSearchParams.filter(value => value !== item);
    } else {
      newFilterParams = prevSearchParams ? [...prevSearchParams, item] : [item];
    }

    this.setState({
      searchParams: {
        ...this.state.searchParams,
        [filter_name]: newFilterParams // is this overwriting [filtername] ???
      }
    });
  };

  render() {
    const { filters } = this.props;
    const filter_types = Object.keys(filters);
    if (filter_types !== undefined && filter_types.length) {
      return (
        <div className="w-100">
          {filter_types.map((type, index) => {
            return (
              <div key={index} className="w-100 bg-white pa3 mb3">
                <h3 className="ttu">{type}</h3>
                <div className="checkbox-container">
                  {Object.keys(filters[type]).map(item => (
                    <div className="mb2 checkbox-item" key={item}>
                      <label htmlFor={`checkbox-${item}`}>
                        <input
                          onClick={() => this.toggleCheckbox(type, item)}
                          type="checkbox"
                          className="checkbox"
                          value={item}
                          id={`checkbox-${item}`}
                        />
                        <p className="ttc dib">{convertSnakeCase(item)}</p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )
    }
    else {
      return (
        <div className="flex flex-column mr2 ba pa2 w-20">
          <p> Loading </p>
        </div>
      )
    }
  }
}

export default Filters;
