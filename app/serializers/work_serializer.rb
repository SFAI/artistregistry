class WorkSerializer < ActiveModel::Serializer
  attributes :id, :artist_id, :title, :media, :work_type, :status, :price, :attachment_url
  has_many :attachments
  belongs_to :artist

  def attachment_url
    object.attachments.map do |attachment|
      attachment.image.url
    end
  end
end
