class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :transaction_type, :start_date, :end_date, :purchase_date,
             :price, :buyer_id, :artist_id, :work_id, :comment, :artist_name,
             :buyer_name, :work_title
  belongs_to :work
  belongs_to :buyer
  belongs_to :artist

  def artist_name
    object.artist.name
  end

  def buyer_name
    object.buyer.name
  end

  def work_title
    object.work.title
  end
end
