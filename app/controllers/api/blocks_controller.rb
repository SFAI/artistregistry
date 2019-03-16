class Api::BlocksController < ApplicationController
  respond_to :json

  def block_user
    # Right now, the blocked_id is a buyer_id as 
    # Artists can only block from requests/inquiries,
    # which are always buyers.
    blocked_account_id = Buyer.find(params[:blocked_id]).account_id
    b = Block.create(blocker_id: params[:blocker_id], blocked_id: blocked_account_id)
    b.save
  end

  def unblock_user
    b = Block.find_by(block_params)
    b.destroy
  end

  private
    def block_params
      params.require(:blocked_id)
      params.require(:blocker_id)
      params.permit(:blocked_id, :blocker_id)
    end
end