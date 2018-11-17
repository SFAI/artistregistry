class Api::WorksController < ApplicationController
  respond_to :json
  def show
    @work = Work.find(params[:id])
    render json: @work
  end

  def create
    work_attr = work_params
    attachment_attr = work_attr.delete("attachments_attributes")
    @work = Work.new(work_attr)
    if @work.save
      @work.attachments = attachment_attr.map do |a|
        attachment_params = {}
        attachment_params[:image] = a
        attachment_params[:work_id] = @work.id
        @work.attachments.create(attachment_params)
      end
    end
    render json: @work
  end

  def update
    work_attr = work_params
    attachment_attr = work_attr.delete("attachments_attributes")
    @work = Work.find(params[:id])
    new_work = @work.update(work_attr)
    if new_work
      @work.attachments = attachment_attr.map do |a|
        attachment_params = {}
        attachment_params[:image] = a
        attachment_params[:work_id] = @work.id
        @work.attachments.create(attachment_params)
      end
      return render json: {message: 'User successfully updated!',
                     work: @work}
    else
      return render json: {error: new_work.errors.full_messages}
    end
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
                                 :availability,
                                 :artist_id,
                                 :attachments_attributes => []
                                )
  end

end
