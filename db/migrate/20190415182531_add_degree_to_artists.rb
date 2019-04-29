class AddDegreeToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :degree, :integer
  end
end
