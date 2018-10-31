class Api::WorksController < ApplicationController
  respond_to :json
  def show
    @work = Work.find(params[:id])
    render json: @work
  end

  def create
    puts work_params
    @work = Work.new(work_params)
    puts @work
    puts params[:images]
    if @work.save

      if params[:images]
        params[:images].each { |image|
          @work.attachments.create(image: image)
        }
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
                                    :images => [:attachment]
                                   )
  end

end
