class ArtistsController < ApplicationController
  # load_and_authorize_resource

  def index
  	@artists = Artist.all
  	respond_to do |format|
      format.html { render :index }
      format.json {
        render json: @artists
      }
    end
  end

  def show
    @artist = Artist.find(params[:id])
    @buyer = current_buyer
  end

  def all_artists
  end
end
