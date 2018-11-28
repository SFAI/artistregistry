class RemoveArtistFromReceipts < ActiveRecord::Migration[5.2]
  def change
    remove_reference :receipts, :artist, foreign_key: true
  end
end
