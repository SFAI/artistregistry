class WorkSerializer < ActiveModel::Serializer
  attributes :id, :title, :material, :medium, :availability, :price, :artist_id, :artist_name
  belongs_to :artist
  def artist_name
    object.artist.name
  end
end
