class ArtistsController < ApplicationController
  def index

  end

  def show
    @artist = Artist.find(params[:id])
    @buyer = current_buyer
  end
end