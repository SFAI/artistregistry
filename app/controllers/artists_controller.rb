class ArtistsController < ApplicationController
  # before_action :set_current_buyer
  def index
  end

  def show
    @artist = Artist.find(params[:id])
    artist_account_id = @artist.account.id
    user_account_id = @current_user.account.id

    @blocked = (
      Block.where(
        blocker_id: artist_account_id,
        blocked_id: user_account_id).exists? ||
      Block.where(
        blocked_id: artist_account_id,
        blocker_id: user_account_id).exists?
      )
  end

  def update
    @artist_id = params[:id]
  end

  def generate_new_password_email
   artist = Artist.find(params[:user_id])
   artist.send_reset_password_instructions flash[:notice] = 'Reset password instructions have been sent to #{user.email}.'
   redirect_to artist_user_path(artist)
  end

  def all_artists
  end

  def transactions
  end

  def commissions
  end
end
