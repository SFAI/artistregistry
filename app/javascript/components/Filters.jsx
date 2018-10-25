import React, { PureComponent } from "react";

class Filters extends PureComponent {
  constructor(props) {
    super(props);
  }

  filters = [
    {
      name: "Media",
      items: [
        "painting",
        "photography",
        "sculpture",
        "prints",
        "film",
        "design"
      ]
    },
    { name: "Genre", items: ["One", "Two", "Three"] },
    { name: "Availability", items: ["One", "Two", "Three"] },
    { name: "Price", items: ["One", "Two", "Three"] },
    { name: "Size", items: ["One", "Two", "Three"] }
  ];

  render() {
    return (
      <div className="flex flex-column mr2 ba pa2 w-20">
        {this.filters.map(({ name, items }) => (
          <div>
            <h4> {name} </h4>
            <div>
              {items.map(item => (
                <div className="mb2">
                  <label>
                    <input type="checkbox" /> {item}
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
