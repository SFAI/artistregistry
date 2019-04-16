class AddDeleteToCommissions < ActiveRecord::Migration[5.2]
  def change
  	add_column :commissions, :deleted, :boolean
  end
end
