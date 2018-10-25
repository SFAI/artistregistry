class WorksController < ApplicationController
  def show
    @work = work.find(params[:id])
  end
end
