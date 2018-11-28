class RemoveWorkFromReceipts < ActiveRecord::Migration[5.2]
  def change
    remove_reference :receipts, :work, foreign_key: true
  end
end
