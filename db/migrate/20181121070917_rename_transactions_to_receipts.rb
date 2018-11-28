class RenameTransactionsToReceipts < ActiveRecord::Migration[5.2]
  def change
    rename_table :transactions, :receipts
  end
end
