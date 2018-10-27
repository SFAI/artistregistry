import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Filters extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: {},
    };
  }

  static propTypes = {
    onFiltersChange: PropTypes.func,
    filters: PropTypes.object,
  };

  setNewFilters = params => {
    const stringified = Object.keys(params)
      .map(
        filter_name =>
          `${filter_name}=` + params[filter_name].join(`&${filter_name}=`)
      )
      .join("&");
    this.props.onFiltersChange(stringified); // lifting params up to Works as querystring
  };

  toggleCheckbox = (filter_name, item) => {
    const prevSearchParams = this.state.searchParams[filter_name];

    let newFilterParams;
    if (prevSearchParams && prevSearchParams.includes(item)) {
      newFilterParams = prevSearchParams.filter(value => value !== item);
    } else {
      newFilterParams = prevSearchParams ? [...prevSearchParams, item] : [item];
    }

    const newSearchParams = {
      ...this.state.searchParams,
      [filter_name]: newFilterParams
    };

    this.setNewFilters(newSearchParams);

    this.setState({
      searchParams: newSearchParams
    });
  };

  render() {
    const { filters } = this.props;
    const filter_types = Object.keys(filters);
    if (filter_types !== undefined && filter_types.length) {
      return (
        <div className="flex flex-column mr2 ba pa2 w-20">
          {filter_types.map((type, index) => {
            return (
              <div key={index}>
                <h4> {type} </h4>
                <div>
                  {Object.keys(filters[type]).map(item => (
                    <div className="mb2" key={item}>
                      <label>
                        <input
                          onClick={() => this.toggleCheckbox(type, item)}
                          type="checkbox"
                        />
                        {item}
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
