class AddTypeToCommissions < ActiveRecord::Migration[5.2]
  def change
    add_column :commissions, :types, :integer
  end
end
