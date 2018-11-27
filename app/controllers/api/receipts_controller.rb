class Api::ReceiptsController < ApplicationController
  respond_to :json
  def show
  end

  def create
    receipt = Receipt.new(receipt_params)
    if receipt.save!
      receipt.request.open = false
      if receipt.request.save!
        flash[:success] = "Transaction recorded successfully!"
        NotificationMailer.with(buyer: request.buyer, artist: request.artist, work: request.work).request_completed_email.deliver_later
        return render json: {"message": 'Transaction recorded successfully!'}
      end
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
