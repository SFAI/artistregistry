class Api::TransactionsController < ApplicationController
  respond_to :json
  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  private
    def transaction_params
      params.permit(
        :buyer_id,
        :artist_id,
        :work_id,
        
        :comment
      )
    end
end
