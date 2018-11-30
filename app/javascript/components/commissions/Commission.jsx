import PropTypes from "prop-types";
import React from "react";
import BuyerSnapshot from "../buyers/BuyerSnapshot";

class Commission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commissions: [],
      componentDidMount: false
    };
  }
  
  componentDidMount() {
    const route = APIRoutes.artists.commissions(this.props.artist.id);
    Requester.get(route).then(
      response => {
        this.setState({ commissions: response, componentDidMount: true });
      },
      error => {
        console.error(error);
      }
    );
  }
  
  getAttr(commission) {
    let attr = {
      "Inquired On": new Date(commission.created_at).toLocaleDateString(),
      "Inquiry Type": commission.types,
      "Message": commission.comment,
    };
    
    return Object.keys(attr).map((key, i) => {
      return (
        <div className="attr" key={i}>
          <div className="key mr3">
            <h5>{key}</h5>
          </div>
          <div className="value">
            <h6 key={i}>{attr[key]}</h6>
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.state.componentDidMount) {
      return (
        <div><h2>Loading</h2></div>
      );
    }
    return (
      <div className="mw7 center">
        <h1>Inquiries</h1>
        {
          this.state.commissions.map((commission) => {
            return (
              <div key={commission.id} className="request pa3 bg-white mb3">
                <div className="request-container w-100">
                  <div className="request-action">
                    <BuyerSnapshot buyer={commission.buyer} />
                  </div>
                  <div className="attr-container w-100 pa3 mt2">
                    {this.getAttr(commission)}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Commission;