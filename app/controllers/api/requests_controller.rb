class Api::RequestsController < ApplicationController
  respond_to :json
  def show
    @request = Request.find(params[:id])
    render json: @request
  end

  def create
    request = Request.create(params)
    begin
      saved = Request.save!
    rescue ActiveRecord::RecordInvalid => invalid
      render_json_message(:forbidden, errors: invalid.record.errors.full_messages)
      return
    end
    if saved
      render_json_message(:ok, message: 'Request successfully created!')
    else
      render_json_message(:forbidden, errors: request.errors.full_messages)
    end
  end

  def update
    #only for opening and closing requests
    @request = Request.find(params[:id])
    new_request = @request.update(params)
    render_json_message(:ok, message: 'Request successfully updated!')
  end

end