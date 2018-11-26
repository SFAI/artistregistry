class ApplicationController < ActionController::Base
  before_action :set_current_user

  def toast(type, text)
    flash[:toastr] = { type => text }
  end
  
  def set_current_user
    if current_artist
      @current_user = current_artist
      @current_user_type = "artist"
    elsif current_buyer
      @current_user = current_buyer
      @current_user_type = "buyer"
    else
      @current_user = Null
      @current_user_type = "not_logged_in"
    end
  end
end
