class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :type
      t.date :start_date
      t.date :end_date
      t.date :purchase_date
      t.integer :price

      t.timestamps
    end
  end
end
