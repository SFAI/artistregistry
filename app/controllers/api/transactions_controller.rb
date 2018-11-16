class Api::TransactionsController < ApplicationController
  respond_to :json
  def show
  end

  def create
    transaction = Transaction.new(transaction_params)
    if transaction.save!
      flash[:success] = "Transaction recorded successfully!"
      return render json: {"message": 'Transaction recorded successfully!'}
    else
      flash[:danger] = "Transaction failed to record."
      return render json: {error: Transaction.errors.full_messages}
    end

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
        :transaction_type,
        :start_date,
        :end_date,
        :purchase_date,
        :price,
        :comment
      )
    end
end
