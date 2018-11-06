class ArtistsController < ApplicationController
  def index

  end

  def show
    @artist = Artist.find(params[:id])
    @buyer = current_buyer
  end

  def generate_new_password_email
   artist = Artist.find(params[:user_id])
   artist.send_reset_password_instructions flash[:notice] = 'Reset password instructions have been sent to #{user.email}.'
   redirect_to artist_user_path(artist)
  end

  def all_artists
  end
end
