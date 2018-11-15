class WorksController < ApplicationController
  def index
  end

  def get_work_category_enums
    # return enums for filtering
    # Work.statuses
    categories = {
      "availability": Work.availabilities,
      "medium": Work.media
    }
    render json: categories
  end

  def show
    @work = Work.find(params[:id])
  end

  def new
    authorize! :create, Work
  end

  def edit
    @work = Work.find(params[:id])
    authorize! :update, @work
  end
end
