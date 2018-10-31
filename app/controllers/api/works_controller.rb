class Api::WorksController < ApplicationController
  respond_to :json
  def show
    @work = Work.find(params[:id])
    render json: @work
  end

  def create
    work_params = {}
    work_params[:title] = params[:work][:title]
    work_params[:media] = params[:work][:media]
    work_params[:work_type] = params[:work][:work_type]
    work_params[:status] = params[:work][:status]
    work_params[:artist_id] = 0
    work_params[:price] = 0
    puts work_params
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

  def upload_image
    work.images.attach(params[:images])
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

  def work_params
    params.require(:work).permit(:title,
                                  :media,
                                    :work_type,
                                    :status,
                                    :artist_id,
                                    attachments: []
                                   )
  end

end
