class Api::BlocksController < ApplicationController
  respond_to :json

  def block_user
    blocker_id = params[:blocker_id]
    blocked_id = params[:blocked_id]
    b = Block.create(blocker_id: blocker_id, blocked_id: blocked_id);
    b.save
  end

  def unblock_user
    blocker_id = params[:blocker_id]
    blocked_id = params[:blocked_id]
    b = Block.find_by(blocker_id: blocker_id, blocked_id: blocked_id)
    b.destroy
  end
end