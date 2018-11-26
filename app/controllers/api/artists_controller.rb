class Api::ArtistsController < ApplicationController
  respond_to :json
  def show
    @artist = Artist.find(params[:id])
    # image_url = { :image_url => url_for(@artist.pro_pic) }
    render json: { artist: @artist }
  end

  def index

    artists = Artist.all
    render json: artists
  end

  def update
    artist_attr = artist_params
    avatar_attr = artist_attr.delete("avatar")
    @artist = Artist.find(params[:id])
    saved = @artist.update(artist_attr)
    if saved
      @artist.avatar.attach(avatar_attr)
      puts "--------AVATAR NAME-----------"
      puts @artist.avatar.filename
      puts @artist.avatar.attached?
      flash[:success] = "Artist updated successfully!"
    else
      flash[:danger] = "Artist failed to update."
    end

    # new_work = work.update(params)
    # render_json_message(:ok, message: 'Artist successfully updated!')
  end

  def destroy
    artist = Artist.find(params[:id])
    if artist.destroy
      render_json_message(:ok, message: 'Artist successfully deleted')
    else
      render_json_message(:forbidden, errors: artist.errors.full_messages)
    end
  end

  def works
    artist = Artist.find(params[:id])
    works = artist.works
    if works
      render json: works
    else
      render_json_message(:forbidden, errors: works.errors.full_messages)
    end
  end

  def requests
    artist = Artist.find(params[:id])
    requests = artist.requests
    requests_full = []
    requests.each do |request|
      this_request = {}
      this_request["request"] = request
      this_request["buyer"] = request.buyer
      requests_full.append(this_request)
    end
    if requests
      render json: requests_full.to_json
    else
      render_json_message(:forbidden, errors: requests.errors.full_messages)
    end
  end

  def transactions
    artist = Artist.find(params[:id])
    transactions = artist.transactions
    render json: transactions,
        each_serializer: TransactionSerializer
  end

  def artist_params
    params.require(:artist).permit(:name,
                                 :program,
                                 :genres,
                                 :description,
                                 :avatar
                                )
  end

end
