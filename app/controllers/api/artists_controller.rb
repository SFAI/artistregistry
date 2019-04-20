class Api::ArtistsController < ApplicationController
  respond_to :json

  def get_artist_category_enums
    # return enums for filtering
    categories = { 
      degree: Artist.degrees
    }
    render json: categories
  end

  def show
    @artist = Artist.find(params[:id])
    render json: @artist, serializer: ArtistSerializer
  end

  def index
    artists = Artist.all
    render json: artists
  end

  def filtered_artists
    parsed_query = CGI.parse(params[:search_params])
    filtered_artists = params[:search_params] == "" ?  Artist.all : Artist.where(parsed_query)
    render json: filtered_artists,
      each_serializer: ArtistSerializer
  end

  def update
    artist_attr = artist_params
    avatar_attr = artist_attr.delete("avatar")

    @artist = Artist.find(params[:id])
    authorize @artist
    
    saved = @artist.update(artist_attr)
    if saved
      @artist.avatar.attach(avatar_attr)
      flash[:success] = "Artist updated successfully!"
    else
      flash[:danger] = "Artist failed to update."
    end
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
    render json: requests,
        each_serializer: RequestSerializer
  end

  def commissions
    artist = Artist.find(params[:id])
    commissions = artist.commissions
    render json: commissions,
        each_serializer: CommissionSerializer
  end

  def lock_user
    user = Artist.find(params[:id])
    user.lock_access!
  end

  def unlock_user
    user = Artist.find(params[:id])
    user.unlock_access!
  end

  def artist_params
    params.require(:artist).permit(:name,
                                 :degree,
                                 :media,
                                 :description,
                                 :avatar,
                                 :featured_work_id,
                                 :hidden,
                                 :program => []
                                )
  end
end
