class WorkSerializer < ActiveModel::Serializer
  attributes :id, :artist_id, :title, :media, :work_type, :status, :price
  has_many_attached :attachments
  belongs_to :artist
end
