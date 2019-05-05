class Api::ArtistsController < ApplicationController
  respond_to :json

  def get_artist_category_enums
    # return enums for filtering
    categories = {
      program: Artist.programs, 
      degree: Artist.degrees
    }
    render json: categories
  end

  def show
    @artist = Artist.find(params[:id])
    render json: @artist, serializer: ArtistSerializer
  end

  def index
    artists = current_admin ? 
      Artist.all : 
      Artist.joins(:works).group('artists.id, works.hidden').where("works.hidden=false").where("artists.hidden=false")
    artists_page = artists.page(params[:page])
    artist_count = artists.length
    render json: {
      artists: ActiveModel::Serializer::CollectionSerializer.new(artists_page, each_serializer: ArtistSerializer),
      artist_count: artists.length,
      per_page: Artist.default_per_page
    }
  end

  def filtered_artists
    parsed_query = CGI.parse(params[:search_params])
    all_artists = Artist.all
    filtered_artists = Artist.all

    filter_categories = parsed_query.keys
    for category in filter_categories
      if category == "program"
        query_programs = parsed_query["program"]
        filtered_artists = Artist.where(["program @> ?", "{#{query_programs[0]}}"])
        for programs in parsed_query["program"][1..query_programs.length]
          @programs = programs
          filtered_artists = filtered_artists.or(all_artists.where(["program @> ?", "{#{@programs}}"]))
        end
      else
        filters = parsed_query[category]
        filtered_artists = filtered_artists.where(["#{category}=?", Artist.degrees[filters[0]]])
        for filter in filters[1..filters.length]
          @filter = filter
          filtered_artists = filtered_artists.or(all_artists.where(["#{category}=?", Artist.degrees[@filter]]))
        end
      end
    end

    # if "program".in?(parsed_query.keys)
    #   filtered_artists = Artist.all.select{|artist| ((artist.program & parsed_query.values[0]).length > 0) }
    #   if (parsed_query.keys.length > 1)
    #     for key in parsed_query.keys
    #       if key != "program"
    #         filtered_artists = filtered_artists.select{|artist| (artist[key] == parsed_query[key][0])}
    #       end
    #     end
    #   end
    # end
    # filtered_artists = current_admin ? 
    #   Artist.where(parsed_query) : 
    #   Artist.where(parsed_query).joins(:works).group('artists.id, works.hidden').where("works.hidden=false").where("artists.hidden=false")
    filtered_artists_page = filtered_artists.page(params[:page])
    artist_count = filtered_artists.length
    render json: {
      artists: ActiveModel::Serializer::CollectionSerializer.new(filtered_artists_page, each_serializer: ArtistSerializer),
      artist_count: artist_count,
      per_page: Artist.default_per_page
    }
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
    requests = artist.requests.sort_by { |req| req.open ? 0 : 1 }
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
                                 :year,
                                 :media,
                                 :description,
                                 :avatar,
                                 :featured_work_id,
                                 :hidden,
                                 :page,
                                 :program => []
                                )
  end
end
