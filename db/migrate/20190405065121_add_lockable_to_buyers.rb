class AddLockableToBuyers< ActiveRecord::Migration[5.2]
  def change
    add_column :buyers, :locked_at, :datetime
  end
end
