class RemoveBuyerFromReceipts < ActiveRecord::Migration[5.2]
  def change
    remove_reference :receipts, :buyer, foreign_key: true
  end
end
