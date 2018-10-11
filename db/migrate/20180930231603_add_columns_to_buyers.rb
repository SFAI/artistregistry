class AddColumnsToBuyers < ActiveRecord::Migration[5.2]
  def change
    add_column :buyers, :name, :string
    add_column :buyers, :phone_number, :string
  end
end
