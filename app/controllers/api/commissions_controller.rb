class Api::CommissionsController < ApplicationController
  respond_to :json

  def show
  end

  def create
    commission = Commission.new(commission_params)
    authorize commission

    if commission.save!
      flash[:success] = "Commission requested successfully!";
      CommissionMailer.with(buyer: commission.buyer, artist: commission.artist).new_commission_email.deliver_later
      return render json: {"message": 'Commission requested successfully!'}
    else
      flash[:danger] = "Commission failed to send."
      return render json: {error: commission.errors.full_messages}
    end
  end

  def update
    # Used to "delete" a commission
    commission = Commission.find(params[:id])
    commission = commission.update!(commission_params)

    render json: {status: 200, message: 'Commission successfully deleted!'}
  end

  def destroy
    @commission.destroy
  end

  private
    def commission_params
      params.permit(
        :buyer_id,
        :artist_id,
        :comment,
        :types,
        :deleted
      )
    end
end
