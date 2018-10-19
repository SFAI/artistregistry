class Api::WorksController < ApplicationController
  respond_to :json
	def show
    @work = Work.find(params[:id])
    render json: @work
  end

  def create
    work = Work.create(params)
    begin
      saved = work.save!
    rescue ActiveRecord::RecordInvalid => invalid
      render_json_message(:forbidden, errors: invalid.record.errors.full_messages)
      return
    end
    if saved
      render_json_message(:ok, message: 'Work successfully created!')
    else
      render_json_message(:forbidden, errors: work.errors.full_messages)
    end
  end

  def update
    work = Work.find(params[:id])
    new_work = work.update(params)
    render_json_message(:ok, message: 'Work successfully updated!')
  end

  def destroy
    work = Work.find(params[:id])
    if work.destroy
      render_json_message(:ok, message: 'Work successfully deleted')
    else
      render_json_message(:forbidden, errors: work.errors.full_messages)
    end
  end
	
	def index
		works = Work.all
		render json: works
	end
	
end
