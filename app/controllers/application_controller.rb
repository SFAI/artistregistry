class ApplicationController < ActionController::Base
  before_action :set_current_user
  before_action :configure_permitted_parameters, if: :devise_controller?

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
      @current_user = current_admin
      @current_user_type = "admin"
    end
  end

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up) {
        |u| u.permit(:name, :email, :password, :password_confirmation, :terms_and_conditions)
      }
    end
end
