class ApplicationController < ActionController::Base
  def current_ability
    if current_artist
      @current_ability ||= Ability.new(current_artist)
    else
      @current_ability ||= Ability.new(current_buyer)
    end
  end
end
