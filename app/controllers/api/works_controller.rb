class Api::WorksController < ApplicationController
  respond_to :json
  def show
    render json: Work.find(params[:id]), serializer: WorkSerializer
  end

  def create
    work_attr = work_params
    attachment_attr = work_attr.delete("attachments_attributes")
    attachments_to_delete = work_attr.delete("attachments_to_delete")
    @work = Work.new(work_attr)
    if @work.save
      @work.images.attach(attachment_attr)
      flash[:success] = "Work created successfully!";
      render json: @work
    else
      flash[:danger] = "Work failed to create.";
    end
  end

  def update
    work_attr = work_params
    attachment_attr = work_attr.delete("attachments_attributes")
    attachments_to_delete = work_attr.delete("attachments_to_delete")
    @work = Work.find(params[:id])
    saved = @work.update(work_attr)
    if saved
      if attachment_attr
        @work.images.attach(attachment_attr)
      end
      attachments_to_delete.each do |attachment|
        @work.images.find(attachment).purge
      end
      flash[:success] = "Work updated successfully!";
      render json: @work
    else
      flash[:danger] = "Work failed to create.";
    end
  end

  def destroy
    work = Work.find(params[:id])
    work.images.purge
    if work.destroy
      flash[:success] = "Work deleted successfully!";
    else
      flash[:danger] = "Work failed to delete.";
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
                                 :attachments_attributes => [],
                                 :attachments_to_delete => []
                                )
  end

end
