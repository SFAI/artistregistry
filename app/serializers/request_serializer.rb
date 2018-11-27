class RequestSerializer < ActiveModel::Serializer
  attributes :id, :message, :open, :created_at, :updated_at, :types, :artist, :buyer, :work, :receipt

  belongs_to :work
  belongs_to :buyer
  belongs_to :artist
  has_one :receipt

  def artist
    object.artist
  end

  def buyer
    object.buyer
  end

  def work
    object.work
  end

  def receipt
    object.receipt
  end
end
