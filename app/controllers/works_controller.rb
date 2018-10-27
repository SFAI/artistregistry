class WorksController < ApplicationController
  def index
  end

  def get_work_category_enums
    # return enums for filtering
    # Work.statuses
    categories = {
      "work_type": Work.work_types,
      "status": Work.statuses
    }
    render json: categories
  end
  def show
    @work = Work.find(params[:id])
  end
end
