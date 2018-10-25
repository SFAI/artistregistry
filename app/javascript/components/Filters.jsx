import React, { PureComponent } from "react";

class Filters extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: {}
    };
  }

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
    }
  ];

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
        [filter_name]: newFilterParams
      }
    });
  };

  render() {
    return (
      <div className="flex flex-column mr2 ba pa2 w-20">
        {this.filters.map(({ type, filter_name, items }) => (
          <div>
            <h4> {type} </h4>
            <div>
              {items.map(item => (
                <div className="mb2">
                  <label>
                    <input
                      key={item}
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
