class Api::ArtistsController < ApplicationController
  respond_to :json
  def show
    @artist = Artist.find(params[:id])
    render json: @artist
  end

  def create
    artist = Artist.create(params)
    begin
      saved = artist.save!
    rescue ActiveRecord::RecordInvalid => invalid
      render_json_message(:forbidden, errors: invalid.record.errors.full_messages)
      return
    end
    if saved
      render_json_message(:ok, message: 'Work successfully created!')
    else
      render_json_message(:forbidden, errors: artist.errors.full_messages)
    end
  end

  def update
    artist = Artist.find(params[:id])
    new_work = work.update(params)
    render_json_message(:ok, message: 'Request successfully updated!')
  end

  def destroy
    artist = Artist.find(params[:id])
    if artist.destroy
      render_json_message(:ok, message: 'Work successfully deleted')
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

end