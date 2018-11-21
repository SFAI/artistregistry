class Api::BuyersController < ApplicationController
  respond_to :json

  def requests
    buyer = Buyer.find(params[:id])
    requests = buyer.requests
    requests_full = []
    requests.each do |request|
      this_request = {}
      this_request["request"] = request
      this_request["artist"] = request.artist
      this_request["receipt"] = request.receipt
      requests_full.append(this_request)
    end

    if requests
      render json: requests_full.to_json
    else
      render_json_message(:forbidden, errors: requests.errors.full_messages)
    end
  end

end
