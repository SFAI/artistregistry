class ChangeDegreeInArtists < ActiveRecord::Migration[5.2]
  def change
    change_column :artists, :degree, :integer, :default => 0
  end
end
