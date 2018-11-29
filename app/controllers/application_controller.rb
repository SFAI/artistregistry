class ApplicationController < ActionController::Base
  before_action :set_current_user
	def current_ability
		if buyer_signed_in?
			@current_ability ||= ::Ability.new(current_buyer)
		else
			@current_ability ||= ::Ability.new(current_artist)
		end
	end

	rescue_from CanCan::AccessDenied do |exception|
		redirect_to '/buyers/sign_in'
	end

	def after_sign_in_path_for(user)
	    root_path
	end

	def after_sign_out_path_for(user)
	    root_path
	end

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
