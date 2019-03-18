class WorkSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :description, :title, :material, :media, :availability, :price, :artist_id, :artist_name, :thumbnail, :attached_images_urls, :featured_image, :hidden

  belongs_to :artist

  def artist_name
    object.artist.name
  end

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
        url: rails_blob_path(image, only_path: true),
        id: image.id
      }
      result.push(payload)
    end
    return result
  end

  def featured_image
    if object.featured_image_id
      img = object.images.find(object.featured_image_id)
      payload = {
        name: img.filename,
        url: rails_blob_path(img, only_path: true),
        id: object.featured_image_id
      }
      return payload
    else
      return nil
    end
  end
end
