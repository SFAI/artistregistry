class AddColumnsToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :program, :string
    add_column :artists, :name, :string
    add_column :artists, :open_to_commissions, :boolean
  end
end
