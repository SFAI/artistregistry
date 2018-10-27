class BuyersController < ApplicationController
  def show
    @buyer = Buyer.find(params[:id])
  end
end
