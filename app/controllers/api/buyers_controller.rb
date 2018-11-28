class Api::BuyersController < ApplicationController
  respond_to :json

  def requests
    buyer = Buyer.find(params[:id])
    requests = buyer.requests
    render json: requests,
        each_serializer: RequestSerializer
  end

end
