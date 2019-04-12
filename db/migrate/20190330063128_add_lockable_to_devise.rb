class AddLockableToDevise < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :locked_at, :datetime
  end
end
