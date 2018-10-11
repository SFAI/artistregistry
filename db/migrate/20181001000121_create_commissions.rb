class CreateCommissions < ActiveRecord::Migration[5.2]
  def change
    create_table :commissions do |t|
      t.integer :price
      t.text :comment

      t.timestamps
    end
  end
end
