class Api::WorksController < ApplicationController
  respond_to :json
  def show
    @work = Work.find(params[:id])
    render json: @work
  end

  def create
    work_params = {}
    work_params[:title] = params[:work][:title]
    work_params[:material] = params[:work][:media]
    work_params[:medium] = params[:work][:work_type]
    work_params[:availability] = params[:work][:status]
    work_params[:artist_id] = params[:work][:artist_id]
    @work = Work.new(work_params)
    if @work.save
      @work.attachments = params[:attachments].map do |a|
        attachment_params = {}
        attachment_params[:image] = a
        attachment_params[:work_id] = @work.id
        @work.attachments.create(attachment_params)
      end
    end
    render json: @work
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
    render json: works,
      each_serializer: WorkSerializer
  end

  def filtered_works
    parsed_query = CGI.parse(params[:search_params])
    filtered_works = params[:search_params] == "" ?  Work.all : Work.where(parsed_query)
    render json: filtered_works,
      each_serializer: WorkSerializer
  end


  def work_params
    params.require(:work).permit(:title,
                                  :material,
                                    :medium,
                                    :status,
                                    :availability
                                    :artist_id,
                                    attachments: []
                                   )
  end

end
