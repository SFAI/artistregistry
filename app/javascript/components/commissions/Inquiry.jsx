import PropTypes from "prop-types";
import React from "react";
import BuyerSnapshot from "../buyers/BuyerSnapshot";
import classNames from 'classnames/bind';

class Inquiry extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	dropDownVisible: false
    };
  }
  
  render() {
  	const commission = this.props.commission;

  	return (
	  	<div key={commission.id} className="request ph3 bg-white">
	      <div className="request-container w-100 flex justify-between pv3 bb b--light-gray bt-0 bl-0 br-0">
	        <div className="request-action">
	          <BuyerSnapshot buyer={commission.buyer} />
	        </div>
	        <div className="pa3 flex-grow-1 gray">{commission.comment}</div>
	        <div className="pa3 w-20 flex-shrink-0">
	          <div>{new Date(commission.created_at).toLocaleDateString()}</div>
	          <div>
	            {commission.types.charAt(0).toUpperCase() + commission.types.slice(1)}
	          </div>
	        </div>
	        <div className={classNames("relative", {"requests-dropdown-selected" : this.state.dropDownVisible})}>
		        <button 
		        	onClick={() => this.setState({ dropDownVisible: !this.state.dropDownVisible })}
		        	className="request-ellipsis ml3 self-start br-100 pa0 pointer bn outline-0">
		        </button>
		        <ul className="request-dropdown ml3 absolute nowrap z-3">
			  			<li>Archive</li>
			  			<li>Delete inquiry</li>
			  			<li>Block user</li>
			  		</ul>
			  	</div>
	      </div>
	    </div>
	   )
  }
}

export default Inquiry;
