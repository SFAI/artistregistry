class RequestsController < ApplicationController
  def index
    if !(artist_signed_in? or buyer_signed_in?)
      redirect_to root_path
    end
    @artist = current_artist
    @buyer = current_buyer
  end

  def get_type_enum
    types = Request.types
    render json: types
  end

end
