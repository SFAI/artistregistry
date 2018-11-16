class Api::CommissionsController < ApplicationController
  respond_to :json
  def show
  end

  def create
    commission = Commission.new(commission_params)
    if commission.save!
      flash[:success] = "Commission requested successfully!";
      return render json: {"message": 'Commission requested successfully!'}
    else
      flash[:danger] = "Commission failed to send."
      return render json: {error: commission.errors.full_messages}
    end
  end

  def update
  end

  def destroy
    @commission.destroy
  end

  private
    def commission_params
      params.permit(
        :buyer_id,
        :artist_id,
        :comment
      )
    end
end
