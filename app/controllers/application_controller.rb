class ApplicationController < ActionController::Base
  include Pundit
  before_action :set_current_user
  before_action :set_work_count
  before_action :configure_permitted_parameters, if: :devise_controller?
  # after_action :verify_authorized
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def toast(type, text)
    flash[:toastr] = { type => text }
  end

  def set_current_user
    if current_artist
      @current_user = current_artist
      @current_user_type = "artist"
    elsif current_admin
      @current_user = current_admin
      @current_user_type = "admin"
    else current_buyer
      @current_user = current_buyer
      @current_user_type = "buyer"
    end
  end

  def set_work_count
    @work_count = Work.count
  end

  def pundit_user
    @current_user
  end

  private

    def user_not_authorized
      render json: { message: 'You are not authorized to perform this action.' }, status: :unauthorized
    end

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up) {
        |u| u.permit(:name, :email, :password, :password_confirmation, :terms_and_conditions)
      }
    end
end
