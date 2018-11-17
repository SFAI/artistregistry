class AddConfirmableToDevise < ActiveRecord::Migration[5.2]
  def up
    add_column :buyers, :confirmation_token, :string
    add_column :buyers, :confirmed_at, :datetime
    add_column :buyers, :confirmation_sent_at, :datetime
    add_index :buyers, :confirmation_token, unique: true
    Buyer.update_all confirmed_at: DateTime.now
    add_column :artists, :confirmation_token, :string
    add_column :artists, :confirmed_at, :datetime
    add_column :artists, :confirmation_sent_at, :datetime
    add_index :artists, :confirmation_token, unique: true
    Artist.update_all confirmed_at: DateTime.now
  end

  def down
    remove_columns :buyers, :confirmation_token, :confirmed_at, :confirmation_sent_at
	remove_columns :artists, :confirmation_token, :confirmed_at, :confirmation_sent_at

  end
end
