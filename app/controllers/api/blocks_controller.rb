class Api::BlocksController < ApplicationController
  respond_to :json

  def block_user
    b = Block.create(blocker_id: params[:blocker_id], blocked_id: params[:blocked_id])
    if b.save!
      flash[:success] = "User successfully blocked"
      render json: {"message": "User successfully blocked"}
    else
      flash[:danger] = "Unable to block user"
      render json: {error: "Error blocking user"}
    end
  end

  def unblock_user
    b = Block.find_by(block_params)
    if b.destroy!
      flash[:success] = "User successfully unblocked"
      render json: {"message": 'User successfully unblocked!'}
    else
      flash[:danger] = "Unable to unblock user"
      render json: {error: "Error unblocking user"}
    end 
  end

  def is_blocking
    parsed_query = CGI.parse(params[:search_params])
    exists = Block.exists?(parsed_query)
    render json: exists
  end

  private
    def block_params
      params.require(:blocked_id)
      params.require(:blocker_id)
      params.permit(:blocked_id, :blocker_id)
    end
end