class AddReceiptToRequests < ActiveRecord::Migration[5.2]
  def change
    add_reference :requests, :receipt, foreign_key: true
  end
end
