class AddArtistReferenceToRequests < ActiveRecord::Migration[5.2]
  def change
    add_reference :requests, :artist, foreign_key: true
  end
end
