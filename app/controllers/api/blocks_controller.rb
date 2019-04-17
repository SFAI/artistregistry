class Api::BlocksController < ApplicationController
  respond_to :json

  def block_user
    b = Block.create(blocker_id: params[:blocker_id], blocked_id: params[:blocked_id])
    b.save!
  end

  def unblock_user
    b = Block.find_by(block_params)
    b.destroy!
  end

  def is_blocking
    parsed_query = CGI.parse(params[:search_params])
    Block.exists?(parsed_query)
  end

  private
    def block_params
      params.require(:blocked_id)
      params.require(:blocker_id)
      params.permit(:blocked_id, :blocker_id)
    end
end