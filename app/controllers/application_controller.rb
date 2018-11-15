class ApplicationController < ActionController::Base
  def toast(type, text)
    flash[:toastr] = { type => text }
  end
end
