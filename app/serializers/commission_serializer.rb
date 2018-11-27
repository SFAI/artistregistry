class CommissionSerializer < ActiveModel::Serializer
  attributes :id, :comment, :types, :artist, :buyer, :created_at

  belongs_to :buyer
  belongs_to :artist

  def artist
    object.artist
  end

  def buyer
    object.buyer
  end
end
