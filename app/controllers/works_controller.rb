class WorksController < ApplicationController
  def show
    @work = Work.find(params[:id])
  end
end
