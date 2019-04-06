class Api::BuyersController < ApplicationController
  respond_to :json

  def show
    @buyer = Buyer.find(params[:id])
    render json: @buyer, serializer: BuyerSerializer
  end

  def requests
    buyer = Buyer.find(params[:id])
    requests = buyer.requests
    render json: requests,
        each_serializer: RequestSerializer
  end

  def update
    buyer_attr = buyer_params
    avatar_attr = buyer_attr.delete("avatar")
    @buyer = Buyer.find(params[:id])
    authorize @buyer
    
    saved = @buyer.update(buyer_attr)
    if saved
      @buyer.avatar.attach(avatar_attr)
      flash[:success] = "Buyer updated successfully!"
    else
      flash[:danger] = "Buyer failed to update."
    end
  end

  def buyer_params
    params.require(:buyer).permit(:name,
                                 :email,
                                 :phone_number,
                                 :avatar
                                )
  end

end
