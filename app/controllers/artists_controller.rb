class ArtistsController < ApplicationController
  def index

  end

  def show
    @artist = Artist.find(params[:id])
  end

  def all_artists
  end
end
