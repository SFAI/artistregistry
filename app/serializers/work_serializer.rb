class WorkSerializer < ActiveModel::Serializer
<<<<<<< HEAD
  attributes :id, :artist_id, :title, :media, :work_type, :status, :price, :attachment_url
  has_many :attachments
  belongs_to :artist

  def attachment_url
    object.attachments.map do |attachment|
      attachment.image.url
    end
=======
  attributes :id, :title, :material, :medium, :availability, :price, :artist_id, :artist_name
  belongs_to :artist
  def artist_name
    object.artist.name
>>>>>>> master
  end
end
