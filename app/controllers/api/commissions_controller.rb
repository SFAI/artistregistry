class Api::CommissionsController < ApplicationController
  respond_to :json
  def show
  end

  def create
    commission = Commission.new(commission_params)
    commission.save!
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
