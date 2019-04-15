class Api::WorksController < ApplicationController
  respond_to :json
  def show
    render json: Work.find(params[:id]), serializer: WorkSerializer
  end

  def create
    work_attr = work_params
    attachment_attr = work_attr.delete("attachments_attributes")
    attachments_to_delete = work_attr.delete("attachments_to_delete")
    featured_image = work_attr.delete("featured_image")

    @work = Work.new(work_attr)
    authorize @work

    if @work.save
      @work.images.attach(attachment_attr)
      self.assign_featured_image(featured_image, @work)
      flash[:success] = "Work created successfully!";
    else
      flash[:danger] = "Work failed to create.";
    end
  end

  def update
    work_attr = work_params
    attachment_attr = work_attr.delete("attachments_attributes")
    attachments_to_delete = work_attr.delete("attachments_to_delete")
    featured_image = work_attr.delete("featured_image")

    @work = Work.find(params[:id])
    authorize @work

    if @work.availability != params[:work][:availability]
      prev_status = @work.availability
      curr_status = params[:work][:availability]

      if !is_available?(@work, curr_status)
        flash[:danger] = "Unable to change work availability."
        return
      end
    end

    saved = @work.update(work_attr)
    if saved
      if attachment_attr
        @work.images.attach(attachment_attr)
      end
      if attachments_to_delete
        attachments_to_delete.each do |attachment|
          @work.images.find(attachment).purge
        end
      end
      self.assign_featured_image(featured_image, @work)
      flash[:success] = "Work updated successfully!"

      if prev_status
        requests = Request.where(work_id: @work.id)
        requests.each do |req|
          WorkMailer.with(buyer: req.buyer, work: @work, prev_status: prev_status, curr_status: curr_status).work_status_changed.deliver_later
        end
      end
    else
      flash[:danger] = "Work failed to update."
    end
  end

  def destroy
    work = Work.find(params[:id])
    requests = Request.where(work_id: work.id)

    if requests
      alerts = []
      requests.each do |req|
        alerts << {buyer: req.buyer, artist: req.artist}
        receipt = Receipt.joins(:request).where(request_id: req.id)
        if !receipt.blank? && receipt.first.transaction_type == "purchase"
          flash[:danger] = "Cannot delete a work that has been sold."
          return
        end
      end
    end

    title = work.title
    work.images.purge
    if work.destroy
      flash[:success] = "Work deleted successfully!"
      if alerts != []
        alerts.each do |a|
          RequestMailer.with(buyer: a[:buyer], artist: a[:artist], title: title).request_deleted_email.deliver_later
        end
        return render json: {"message": 'Request deleted!'}
      end
    else
      flash[:danger] = "Work failed to delete."
    end
  end

  def index
    # works = Work.all
    works = Work.page(1).per(8)
    render json: works,
      each_serializer: WorkSerializer
  end

  def filtered_works
    parsed_query = CGI.parse(params[:search_params])
    filtered_works = params[:search_params] == "" ?  Work.all : Work.where(parsed_query)
    render json: filtered_works,
      each_serializer: WorkSerializer
  end

  def filtered_artist_hidden
    filtered_works = Work.joins(:artist).where("artists.hidden=false").select{|work| work.hidden==false}
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

  def assign_featured_image(img_name, work)
    work.images.each do |i|
      if i.filename == img_name
        work.featured_image_id = i.id
        work.save!
      end
    end
  end

  private
    def is_available?(work, curr_status)
      requests = Request.where(work_id: work.id)
      if requests
        requests.each do |req|
          receipt = Receipt.joins(:request).where(request_id: req.id)
          if !receipt.blank?
            if (curr_status == "active" || curr_status == "rented") && (receipt.first.transaction_type == "purchase" || receipt.first.end_date > Date.today)
              return false
            elsif curr_status == "sold" && receipt.first.transaction_type == "rental" && receipt.first.end_date > Date.today
              return false
            end
          end
        end
      end
      return true
    end


  def work_params
    params.require(:work).permit(:title,
                                 :material,
                                 :media,
                                 :status,
                                 :availability,
                                 :links,
                                 :artist_id,
                                 :featured_image,
                                 :description,
                                 :hidden,
                                 :attachments_attributes => [],
                                 :attachments_to_delete => [],
                                )
  end

end
