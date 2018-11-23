class Api::WorksController < ApplicationController
  respond_to :json
  def show
    render json: Work.find(params[:id]), serializer: WorkSerializer
  end

  def create
    work_attr = work_params
    attachment_attr = work_attr.delete("attachments_attributes")
    @work = Work.new(work_attr)
    if @work.save
      @work.images.attach(attachment_attr)
    end
    render json: @work
  end

  def update
    work_attr = work_params
    attachment_attr = work_attr.delete("attachments_attributes")
    @work = Work.find(params[:id])
    saved = @work.update(work_attr)
    if saved
      @work.images.attach(attachment_attr)
    end
    render json:@work
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

  def thumbnail
    work = Work.find(params[:id])
    images = work.images
    if work.images
      image_url = { :image_url => url_for(images[0]) }
      render json: image_url
    else
      image_url = { :image_url => {} }
      render json: image_url
    end

  end


  def work_params
    params.require(:work).permit(:title,
                                 :material,
                                 :medium,
                                 :status,
                                 :availability,
                                 :artist_id,
                                 :featured_img_index,
                                 :description,
                                 :attachments_attributes => []
                                )
  end

end
