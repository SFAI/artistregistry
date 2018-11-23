class WorkSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :description, :featured_image_id, :title, :material, :medium, :availability, :price, :artist_id, :thumbnail, :attached_images_urls, :featured_image_url

  def thumbnail
    if object.images[0]
      variant = object.images[0].variant(resize: "100x100")
      return rails_representation_url(variant, only_path: true)
    else
      return ''
    end
  end

  def attached_images_urls
    result = []
    object.images.each do |image|
      payload = {
        url: rails_blob_path(image, :host => 'localhost'),
        id: image.id
      }
    end
    return result
  end

  def featured_image_url
    return rails_blob_path(object.images.find(object.featured_image_id), :host => 'localhost')
  end

  belongs_to :artist
end
