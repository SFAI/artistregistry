class Api::RequestsController < ApplicationController
  respond_to :json
  def show
    @request = Request.find(params[:id])
    render json: @request
  end

  def create
    request = Request.create(request_params)
    if request.save!
      flash[:success] = "Work requested successfully!";
      return render json: {"message": 'Work requested successfully!'}
    else
      flash[:danger] = "Request failed to send."
      return render json: {error: request.errors.full_messages}
    end
  end

  def update
    #only for opening and closing requests
    @request = Request.find(params[:id])
    new_request = @request.update(request_params)
    render json: {status: 200, message: 'Request successfully updated!'}
  end

  def request_params
    params.require(:request).permit(:open,
                                    :message,
                                    :buyer_id,
                                    :artist_id,
                                    :work_id,
                                    :types
                                )

  end

end
