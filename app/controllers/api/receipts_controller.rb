class Api::ReceiptsController < ApplicationController
  respond_to :json
  def show
  end

  def create
    receipt = Receipt.new(receipt_params)
    authorize receipt

    request = receipt.request
    if receipt.save!
      receipt.request.open = false
      if receipt.request.save!
        flash[:success] = "Transaction recorded successfully!"
        RequestMailer.with(buyer: request.buyer, artist: request.artist, work: request.work).request_completed_email.deliver_later
        return render json: {"message": 'Transaction recorded successfully!'}
      end
    else
      flash[:danger] = "Transaction failed to record."
      return render json: {error: Receipt.errors.full_messages}
    end
  end

  def update
    receipt = Receipt.find(params[:id])
    authorize receipt
    
    saved = receipt.update(receipt_params)
    if saved
      flash[:success] = "Receipt updated successfully!"
      return render json: {"message": 'Receipt updated successfully!'}
    else
      flash[:danger] = "Receipt failed to update."
      return render json: {error: Receipt.errors.full_messages}
    end
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
