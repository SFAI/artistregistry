class Api::RequestsController < ApplicationController
  respond_to :json
  def show
    @request = Request.find(params[:id])
    render json: @request
  end

  def create
    request = Request.new(request_params)
    authorize request

    if request.save!
      flash[:success] = "Work requested successfully!";
      RequestMailer.with(buyer: request.buyer, artist: request.artist, work: request.work).new_request_email.deliver_later
      return render json: {"message": 'Work requested successfully!'}
    else
      flash[:danger] = "Request failed to send."
      return render json: {error: request.errors.full_messages}
    end
  end

  def update
    #only for opening and closing requests
    @request = Request.find(params[:id])
    authorize @request
    
    new_request = @request.update!(request_params)
    if (new_request) #since requests can only be closed after open
      RequestMailer.with(buyer: @request.buyer, artist: @request.artist, work: @request.work).request_closed_email.deliver_later
    end


    render json: {status: 200, message: 'Request successfully updated!'}
  end

  def delete
    request = Request.find(params[:id])
    # TODO: Pundit authorization, possibly? Not sure if needed.
    # authorize request
    new_request = request.update!(request_params)

    render json: {status: 200, message: 'Request successfully deleted!'}
  end

  def request_exist
    parsed_query = CGI.parse(params[:search_params])
    parsed_query[:deleted] = [false, nil]
    exist = Request.where(parsed_query)
    render json: exist
  end

  def request_params
    params.require(:request).permit(:open,
                                    :message,
                                    :buyer_id,
                                    :artist_id,
                                    :work_id,
                                    :types,
                                    :deleted
                                )

  end

end
