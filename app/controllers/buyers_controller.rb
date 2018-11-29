class BuyersController < ApplicationController
  def index

  end

  def show
    @buyer = Buyer.find(params[:id])
  end

  def update
    @buyer_id = params[:id]
  end

  def generate_new_password_email
   buyer = Buyer.find(params[:user_id])
   buyer.send_reset_password_instructions flash[:notice] = 'Reset password instructions have been sent to #{user.email}.'
   redirect_to buyer_user_path(buyer)
  end
end
