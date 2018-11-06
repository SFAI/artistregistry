class RemovePriceFromCommissions < ActiveRecord::Migration[5.2]
  def change
    remove_column :commissions, :price, :integer
  end
end
