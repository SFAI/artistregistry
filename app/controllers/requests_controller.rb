class RequestsController < ApplicationController
  def home
    if !(artist_signed_in? or buyer_signed_in?)
      redirect_to root_path
    end
    @artist = current_artist
    @buyer = current_buyer

  end

end