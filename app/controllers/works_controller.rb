class WorksController < ApplicationController
  def index
  end

  def get_work_category_enums
    # return enums for filtering
    # Work.statuses
    categories = {
      availability: Work.availabilities,
      media: Work.media
    }
    render json: categories
  end

  def show
    @work_id = params[:id]
    @work = Work.find(@work_id)
    @artist = Artist.find(@work.artist_id)

    if @current_user
      artist_account_id = @work.artist.account_id
      user_account_id = @current_user.account_id

      @blocked = (
        Block.where(
          blocker_id: artist_account_id,
          blocked_id: user_account_id).exists? ||
        Block.where(
          blocked_id: user_account_id,
          blocker_id: artist_account_id).exists?)
    end
  end

  def new
  end

  def edit
    @work_id = params[:id]
    @work = Work.find(@work_id)
    @artist_account_id = Artist.find(@work.artist_id).account_id
  end
end
