class WorkSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :material, :medium, :availability, :price, :artist_id, :thumbnail, :attached_images_urls

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
      result.push(rails_blob_path(image, only_path: true))
    end
    return result
  end
  
  belongs_to :artist
end
