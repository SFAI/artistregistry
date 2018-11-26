class ApplicationController < ActionController::Base
  before_action :set_current_user

  def toast(type, text)
    flash[:toastr] = { type => text }
  end
  
  def set_current_user
    if current_artist
      @current_user = current_artist
      @current_user_type = "artist"
    else
      @current_user = current_buyer
      @current_user_type = "buyer"
    end
  end
end
