class WorksController < ApplicationController
  def index
  end

  def get_work_category_enums
    # return enums for filtering
    # Work.statuses
    categories = {
      "availability": Work.availabilities,
      "media": Work.media
    }
    render json: categories
  end

  def show
    @work_id = params[:id]
  end

  def new
  end

  def edit
    @work_id = params[:id]
  end
end
