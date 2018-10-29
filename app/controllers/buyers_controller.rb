class BuyersController < ApplicationController
  load_and_authorize_resource
  def show
    @buyer = Buyer.find(params[:id])
  end
end
