class AddRequestToReceipts < ActiveRecord::Migration[5.2]
  def change
    add_reference :receipts, :request, foreign_key: true
  end
end
