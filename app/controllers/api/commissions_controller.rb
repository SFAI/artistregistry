class Api::CommissionsController < ApplicationController
  respond_to :json
  def show
  end

  def create
    commission = Commission.new(commission_params)
    if commission.save!
      flash[:success] = "Document successfully created!";
      return render json: {"message": 'Document successfully created!'}
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
