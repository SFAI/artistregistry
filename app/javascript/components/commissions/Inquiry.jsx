import PropTypes from "prop-types";
import React from "react";
import BuyerSnapshot from "../buyers/BuyerSnapshot";
import classNames from 'classnames/bind';

class Inquiry extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	isBlocking: false
    };
  }

  componentDidMount = () => {
    this.isBlocking();
  }

  closeRequest = (id) => {
    const update_request_route = APIRoutes.requests.update(id);
    Requester.update(update_request_route, { open: false }).then((response) => {
      this.props.onChange();
    });
  }

  blockUser = () => {
    const payload = {
    	blocker_id: this.props.commission.artist.account_id,
        blocked_id: this.props.commission.buyer.account_id
    };
    const block_route = APIRoutes.blocks.block_user;

    Requester.post(
      block_route, payload).then(
        response => {
          window.location.href = '/commissions'
        },
        response => {
          console.error(response);
        }
      );
  }

  unblockUser = () => {
    const payload = {
    	blocker_id: this.props.commission.artist.account_id,
        blocked_id: this.props.commission.buyer.account_id
    };
    const unblock_route = APIRoutes.blocks.unblock_user;

    Requester.post(
      unblock_route, payload).then(
        response => {
          window.location.href = '/commissions'
        },
        response => {
          console.error(response);
        }
      );
  }

  isBlocking = () => {
    const payload =
      `blocker_id=${this.props.commission.artist.account_id}` +
      `&blocked_id=${this.props.commission.buyer.account_id}`;

    const isblocking_route = APIRoutes.blocks.is_blocking(payload);

    Requester.get(isblocking_route).then(
      response => {
        this.setState({ isBlocking: response });
    });
  }

  deleteInquiry = (id) => {
  	if (confirm('Are you sure you would like to delete this inquiry?')) {
	  	const delete_inquiry_route = APIRoutes.commissions.update(id);
    	Requester.update(delete_inquiry_route, { deleted: true }).then((response) => {
    		this.props.onChange();
    	})
  	}
  }
  
  render() {
    const { isBlocking } = this.state;
    const { commission } = this.props;

    const buyerAndComment = isBlocking ? 
      <div className="flex items-center flex-grow-1 pa3 i">This message is hidden due to blocked user.</div>
      : (
      <div className="flex">
        <div className="flex justify-between items-center">
          <BuyerSnapshot buyer={commission.buyer} color="moss" />
        </div>
        <div className="pa3 flex-grow-1 gray">{commission.comment}</div>
      </div>
      );

  	return (
	  	<div key={commission.id} className="request ph3 bg-white">
	      <div className="flex w-100 pv3 bb b--light-gray bt-0 bl-0 br-0">
	        { buyerAndComment }
	        <div className="flex ml-auto">
            <div className="pa3 w4">
  	          <div>{new Date(commission.created_at).toLocaleDateString()}</div>
  	          <div>
  	            {commission.types.charAt(0).toUpperCase() + commission.types.slice(1)}
              </div>
  	        </div>
            <div className="pt2 relative">
  		        <button className="request-ellipsis ml3 br-100 pa0 pointer bn outline-0"/>
  		        <ul className="request-dropdown ml3 absolute nowrap z-3">
                <li onClick={() => this.deleteInquiry(commission.id)}>
                  Delete inquiry
                </li>
                <li onClick={isBlocking ? this.unblockUser : this.blockUser}>
                  {isBlocking ? "Unblock user" : "Block user"}
                </li>
  			  		</ul>
            </div>
			  	</div>
	      </div>
	    </div>
	   )
  }
} 

export default Inquiry;
