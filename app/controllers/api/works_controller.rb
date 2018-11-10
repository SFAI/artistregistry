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
      @work.images.attach(attachment_attr)
    
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
                                 :attachments_attributes => []
                                )
  end

end

  # def create
  #   # work_attr = work_params
  #   # attachment_attr = work_attr.delete("attachments_attributes")
  #   @work = Work.new(work_params)
  #   if @work.save
  #     @work.images.attach(params[:work][:images])
  #     puts "mone in theb ank"
  #     puts params[:work][:images].length
  #     # @work.attachments = attachment_attr.map do |a|
  #     #   attachment_params = {}
  #     #   attachment_params[:image] = a
  #     #   attachment_params[:work_id] = @work.id
  #     #   @work.attachments.create(attachment_params)
  #     # end
  #   end
  #   render json: @work
  # end

