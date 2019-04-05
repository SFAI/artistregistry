class AddHiddenToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :hidden, :boolean
  end
end
