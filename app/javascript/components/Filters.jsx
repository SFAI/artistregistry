import React, { PureComponent } from "react";

class Filters extends PureComponent {
  constructor(props) {
    super(props);
    state = {
      checked: []
    };
  }

  filters = [
    {
      type: "Media",
      items: [
        "painting",
        "photography",
        "sculpture",
        "prints",
        "film",
        "design"
      ]
    },
    { type: "Genre", items: ["One", "Two", "Three"] },
    { type: "Availability", items: ["One", "Two", "Three"] },
    { type: "Price", items: ["One", "Two", "Three"] },
    { type: "Size", items: ["One", "Two", "Three"] }
  ];

  toggleCheckbox = item => {
    console.log(item.target.name);
    this.setState({
      checked: [item]
    });
  };

  render() {
    return (
      <div className="flex flex-column mr2 ba pa2 w-20">
        {this.filters.map(({ type, items }) => (
          <div>
            <h4> {type} </h4>
            <div>
              {items.map(item => (
                <div className="mb2">
                  <label>
                    <input
                      key={item}
                      name={item}
                      type="checkbox"
                      onClick={this.toggleCheckbox}
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
