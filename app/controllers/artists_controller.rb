class ArtistsController < ApplicationController
  # before_action :set_current_buyer
  def index
  end

  def get_artist_category_enums
    # return enums for filtering
    categories = {
      "major": Artist.programs
    }
    render json: categories
  end

  def show
    @artist = Artist.find(params[:id])
  end

  def update
    @artist = Artist.find(params[:id])
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
