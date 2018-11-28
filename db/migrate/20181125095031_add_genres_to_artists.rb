class AddGenresToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :genres, :string
  end
end
