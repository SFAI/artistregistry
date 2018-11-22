class ChangePriceToDecimalInTransactions < ActiveRecord::Migration[5.2]
  def change
    change_column :transactions, :price, :decimal
  end
end
