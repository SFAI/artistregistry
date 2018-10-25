import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Filters extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: {}
    };
  }

  static propTypes = {
    onFiltersChange: PropTypes.func
  };

  filters = [
    {
      type: "Media",
      filter_name: "work_type",
      items: [
        "painting",
        "photography",
        "sculpture",
        "prints",
        "film",
        "design"
      ]
    },
    {
      type: "Availability",
      filter_name: "status",
      items: ["available", "sold", "rented"]
    }
  ];

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
    return (
      <div className="flex flex-column mr2 ba pa2 w-20">
        {this.filters.map(({ type, filter_name, items }, index) => (
          <div key={index}>
            <h4> {type} </h4>
            <div>
              {items.map(item => (
                <div className="mb2" key={item}>
                  <label>
                    <input
                      onClick={() => this.toggleCheckbox(filter_name, item)}
                      type="checkbox"
                    />
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Filters;
