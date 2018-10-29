class ArtistsController < ApplicationController
  load_and_authorize_resource

  def index

  end

  def show
    @artist = Artist.find(params[:id])
    @buyer = current_buyer
  end

  def all_artists
  end
end
