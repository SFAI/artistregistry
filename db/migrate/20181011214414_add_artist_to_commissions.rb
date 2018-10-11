class AddArtistToCommissions < ActiveRecord::Migration[5.2]
  def change
    add_reference :commissions, :artist, foreign_key: true
  end
end
