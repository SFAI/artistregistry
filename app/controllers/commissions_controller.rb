class CommissionsController < ApplicationController
  def get_type_enum
    render json: Commission.types
  end
end
