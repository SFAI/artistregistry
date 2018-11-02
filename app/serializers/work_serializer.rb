class WorkSerializer < ActiveModel::Serializer
  attributes :id, :title, :material, :medium, :availability, :price, :artist_id, :artist_name, :attachment_url
  has_many :attachments
  belongs_to :artist

  def artist_name
    object.artist.name
  end

  def attachment_url
    object.attachments.map do |attachment|
      attachment.image.url
    end
  end
end
