class AddDescriptionToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :description, :string
  end
end
