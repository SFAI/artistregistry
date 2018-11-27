class BuyersController < ApplicationController

  def index
  end

  def show
    @buyer = Buyer.find(params[:id])
  end

  def update
    @buyer = Buyer.find(params[:id])
  end

end
