class ApplicationController < ActionController::Base
	def current_ability
		if buyer_signed_in?
			@current_ability ||= ::Ability.new(current_artist)
		else
			@current_ability ||= ::Ability.new(current_buyer)
		end
	end

	rescue_from CanCan::AccessDenied do 
		redirect_to '/buyers/sign_in'
	end

	def after_sign_in_path_for(user)
	    case
	    when user.is_a?(Artist)
	        artist_path
	    when user.is_a?(Buyer)
	        buyer_path
	    else
	        super
	    end
	end

	def after_sign_out_path_for(user)
	    if user == :artist
	        artist_path
	    elsif user == :buyer
	        buyer_path
	    else
	        root_path
	   	end
	end
end
