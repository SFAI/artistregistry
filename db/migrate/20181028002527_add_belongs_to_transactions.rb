class AddBelongsToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_reference :transactions, :buyer, foreign_key: true
    add_reference :transactions, :artist, foreign_key: true
    add_reference :transactions, :work, foreign_key: true
  end
end
