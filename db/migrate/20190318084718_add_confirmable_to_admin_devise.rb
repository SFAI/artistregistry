class AddConfirmableToAdminDevise < ActiveRecord::Migration[5.2]
  def up
    add_column :admins, :confirmation_token, :string
    add_column :admins, :confirmed_at, :datetime
    add_column :admins, :confirmation_sent_at, :datetime
    add_index :admins, :confirmation_token, unique: true
    Admin.update_all confirmed_at: DateTime.now
  end

  def down
    remove_columns :admins, :confirmation_token, :confirmed_at, :confirmation_sent_at
  end
end
