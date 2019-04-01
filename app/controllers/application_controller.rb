class ApplicationController < ActionController::Base
  include Pundit
  before_action :set_current_user
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_action :verify_authorized

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

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up) {
        |u| u.permit(:name, :email, :password, :password_confirmation, :terms_and_conditions)
      }
    end
end
