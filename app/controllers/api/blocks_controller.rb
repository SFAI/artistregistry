class Api::BlocksController < ApplicationController
  respond_to :json

  def block_user
    b = Block.create(block_params)
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