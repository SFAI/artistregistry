class WorkSerializer < ActiveModel::Serializer
  attributes :id, :title, :media, :work_type, :status, :price, :artist_id, :artist_name
  belongs_to :artist
  def artist_name
    object.artist.name
  end
end
