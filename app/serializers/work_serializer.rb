class WorkSerializer < ActiveModel::Serializer
  attributes :id, :artist_id, :title, :media, :work_type, :status, :price
  has_many :attachments, :path => ":rails_root/public/system/attachments/:id/:style/:filename"
  belongs_to :artist

  def attachment
    object.attachments.map do |attachment|
      attachment.path
    end
  end
end
