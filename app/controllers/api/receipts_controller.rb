class Api::ReceiptsController < ApplicationController
  respond_to :json
  def show
  end

  def create
    transaction = Receipt.new(receipt_params)
    if transaction.save!
      transaction.request.open = false
      flash[:success] = "Transaction recorded successfully!"
      return render json: {"message": 'Transaction recorded successfully!'}
    else
      flash[:danger] = "Transaction failed to record."
      return render json: {error: Receipt.errors.full_messages}
    end
  end

  def update
  end

  def destroy
  end

  private
    def receipt_params
      params.permit(
        :request_id,
        :transaction_type,
        :start_date,
        :end_date,
        :purchase_date,
        :price,
        :comment
      )
    end
end
